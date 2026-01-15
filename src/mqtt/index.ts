import type { IClientOptions, MqttClient } from 'mqtt'
import type {
  BaseMessage,
  CommandBody,
  ConnectionStatus,
  DeviceStatusBody,
  MessageMeta,
  MqttConfig,
  TaskBody,
} from './types'
/**
 * MQTT 服务封装
 * 基于 mqtt.js，支持 H5 通过 WebSocket 连接
 */
import mqtt from 'mqtt'

/** 默认 MQTT 配置 */
const DEFAULT_CONFIG: MqttConfig = {
  broker: '47.110.70.31',
  port: 1883,
  wsPort: 8083,
  username: 'web',
  password: 'web12345678.',
}

/** 生成 UUID */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16)
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** 创建消息 Meta */
function createMeta(from: 'web' | 'cloud' = 'web', to: 'robot' | 'cloud' = 'robot'): MessageMeta {
  return {
    protocol: 'robot-mqtt',
    version: '1.0',
    msgId: generateUUID(),
    timestamp: Date.now(),
    from,
    to,
  }
}

/** MQTT 服务类 */
class MqttService {
  private client: MqttClient | null = null
  private config: MqttConfig = DEFAULT_CONFIG
  private connectionStatus: ConnectionStatus = 'disconnected'
  private messageHandlers: Map<string, ((topic: string, message: unknown) => void)[]> = new Map()
  private statusChangeCallbacks: ((status: ConnectionStatus) => void)[] = []
  private subscribedTopics: Set<string> = new Set()

  /** 获取连接状态 */
  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  /** 设置连接状态 */
  private setConnectionStatus(status: ConnectionStatus): void {
    this.connectionStatus = status
    this.statusChangeCallbacks.forEach(cb => cb(status))
  }

  /** 监听连接状态变化 */
  onConnectionStatusChange(callback: (status: ConnectionStatus) => void): () => void {
    this.statusChangeCallbacks.push(callback)
    return () => {
      const index = this.statusChangeCallbacks.indexOf(callback)
      if (index > -1) {
        this.statusChangeCallbacks.splice(index, 1)
      }
    }
  }

  /** 连接 MQTT Broker */
  connect(config?: Partial<MqttConfig>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.client && this.connectionStatus === 'connected') {
        resolve()
        return
      }

      this.config = { ...DEFAULT_CONFIG, ...config }
      this.setConnectionStatus('connecting')

      const clientId = this.config.clientId || `web_${generateUUID().slice(0, 8)}`
      // H5 使用 WebSocket 连接
      const url = `ws://${this.config.broker}:${this.config.wsPort}/mqtt`

      const options: IClientOptions = {
        clientId,
        username: this.config.username,
        password: this.config.password,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30000,
        keepalive: 60,
        protocolVersion: 4, // MQTT 3.1.1
      }

      console.log('[MQTT] Connecting to:', url)
      this.client = mqtt.connect(url, options)

      this.client.on('connect', () => {
        console.log('[MQTT] Connected successfully')
        this.setConnectionStatus('connected')
        // 重新订阅之前的主题
        this.resubscribe()
        resolve()
      })

      this.client.on('error', (err) => {
        console.error('[MQTT] Connection error:', err)
        this.setConnectionStatus('error')
        reject(err)
      })

      this.client.on('close', () => {
        console.log('[MQTT] Connection closed')
        this.setConnectionStatus('disconnected')
      })

      this.client.on('reconnect', () => {
        console.log('[MQTT] Reconnecting...')
        this.setConnectionStatus('connecting')
      })

      this.client.on('message', (topic, payload) => {
        try {
          const message = JSON.parse(payload.toString())
          console.log('[MQTT] Received message:', topic, message)
          this.handleMessage(topic, message)
        }
        catch (err) {
          console.error('[MQTT] Failed to parse message:', err)
        }
      })
    })
  }

  /** 断开连接 */
  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.client) {
        this.client.end(true, {}, () => {
          this.client = null
          this.setConnectionStatus('disconnected')
          this.subscribedTopics.clear()
          resolve()
        })
      }
      else {
        resolve()
      }
    })
  }

  /** 重新订阅主题 */
  private resubscribe(): void {
    if (!this.client)
      return
    this.subscribedTopics.forEach((topic) => {
      this.client?.subscribe(topic, { qos: 1 })
    })
  }

  /** 订阅主题 */
  subscribe(topic: string, handler?: (topic: string, message: unknown) => void): void {
    if (!this.client) {
      console.error('[MQTT] Client not connected')
      return
    }

    this.subscribedTopics.add(topic)
    this.client.subscribe(topic, { qos: 1 }, (err) => {
      if (err) {
        console.error('[MQTT] Subscribe error:', err)
      }
      else {
        console.log('[MQTT] Subscribed to:', topic)
      }
    })

    if (handler) {
      this.addMessageHandler(topic, handler)
    }
  }

  /** 取消订阅 */
  unsubscribe(topic: string): void {
    if (!this.client)
      return
    this.subscribedTopics.delete(topic)
    this.client.unsubscribe(topic)
    this.messageHandlers.delete(topic)
  }

  /** 添加消息处理器 */
  addMessageHandler(topic: string, handler: (topic: string, message: unknown) => void): void {
    const handlers = this.messageHandlers.get(topic) || []
    handlers.push(handler)
    this.messageHandlers.set(topic, handlers)
  }

  /** 移除消息处理器 */
  removeMessageHandler(topic: string, handler: (topic: string, message: unknown) => void): void {
    const handlers = this.messageHandlers.get(topic)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  /** 处理消息 */
  private handleMessage(topic: string, message: unknown): void {
    // 精确匹配
    const exactHandlers = this.messageHandlers.get(topic)
    if (exactHandlers) {
      exactHandlers.forEach(handler => handler(topic, message))
    }

    // 通配符匹配
    this.messageHandlers.forEach((handlers, pattern) => {
      if (pattern !== topic && this.matchTopic(pattern, topic)) {
        handlers.forEach(handler => handler(topic, message))
      }
    })
  }

  /** 匹配主题 (支持 + 和 # 通配符) */
  private matchTopic(pattern: string, topic: string): boolean {
    const patternParts = pattern.split('/')
    const topicParts = topic.split('/')

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i] === '#') {
        return true
      }
      if (patternParts[i] !== '+' && patternParts[i] !== topicParts[i]) {
        return false
      }
    }

    return patternParts.length === topicParts.length
  }

  /** 发布消息 */
  publish<T>(topic: string, body: T, retain = false): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('MQTT client not connected'))
        return
      }

      const meta = createMeta()
      const message: BaseMessage<T> = { meta, body }
      const payload = JSON.stringify(message)

      this.client.publish(topic, payload, { qos: 1, retain }, (err) => {
        if (err) {
          console.error('[MQTT] Publish error:', err)
          reject(err)
        }
        else {
          console.log('[MQTT] Published to:', topic, message)
          resolve(meta.msgId)
        }
      })
    })
  }

  // ============ 业务方法 ============

  /** 订阅设备状态 */
  subscribeDeviceStatus(deviceId: string, handler: (status: DeviceStatusBody) => void): void {
    const topic = `/cleanbot/${deviceId}/status`
    this.subscribe(topic, (_, msg) => {
      const message = msg as BaseMessage<DeviceStatusBody>
      handler(message.body)
    })
  }

  /** 订阅设备心跳 */
  subscribeDeviceHeartbeat(deviceId: string, handler: (data: unknown) => void): void {
    const topic = `/cleanbot/${deviceId}/heartbeat`
    this.subscribe(topic, (_, msg) => handler(msg))
  }

  /** 订阅指令确认 */
  subscribeCommandAck(deviceId: string, handler: (data: unknown) => void): void {
    const topic = `/cleanbot/${deviceId}/cmd/ack`
    this.subscribe(topic, (_, msg) => handler(msg))
  }

  /** 订阅任务结果 */
  subscribeTaskResult(deviceId: string, handler: (data: unknown) => void): void {
    const topic = `/cleanbot/${deviceId}/task/result`
    this.subscribe(topic, (_, msg) => handler(msg))
  }

  /** 订阅错误上报 */
  subscribeError(deviceId: string, handler: (data: unknown) => void): void {
    const topic = `/cleanbot/${deviceId}/error`
    this.subscribe(topic, (_, msg) => handler(msg))
  }

  /** 订阅事件 */
  subscribeEvent(deviceId: string, handler: (data: unknown) => void): void {
    const topic = `/cleanbot/${deviceId}/event`
    this.subscribe(topic, (_, msg) => handler(msg))
  }

  /** 订阅所有设备状态 (使用通配符) */
  subscribeAllDeviceStatus(handler: (deviceId: string, status: DeviceStatusBody) => void): void {
    const topic = '/cleanbot/+/status'
    this.subscribe(topic, (t, msg) => {
      const deviceId = t.split('/')[2]
      const message = msg as BaseMessage<DeviceStatusBody>
      handler(deviceId, message.body)
    })
  }

  /** 发送控制指令 */
  sendCommand(deviceId: string, cmd: CommandBody['cmd']): Promise<string> {
    const topic = `/cleanbot/${deviceId}/cmd`
    const body: CommandBody = { cmd }
    return this.publish(topic, body)
  }

  /** 发送任务 */
  sendTask(deviceId: string, task: TaskBody): Promise<string> {
    const topic = `/cleanbot/${deviceId}/task`
    return this.publish(topic, task)
  }
}

/** 导出单例 */
export const mqttService = new MqttService()

/** 导出类型 */
export * from './types'
