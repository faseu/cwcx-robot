import type {
  BaseMessage,
  CleanMode,
  CommandAckBody,
  ConnectionStatus,
  DeviceInfo,
  DeviceStatusBody,
  ErrorBody,
  EventBody,
  TaskResultBody,
  WorkStatus,
} from '@/mqtt'
/**
 * 设备状态管理 Store
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { mqttService } from '@/mqtt'

/** 模拟设备列表 (实际项目中应从后端获取) */
const MOCK_DEVICES: DeviceInfo[] = [
  {
    deviceId: 'ROBOT001',
    name: '清洁机器人 1号',
    online: false,
    workStatus: 'offline',
    battery: 0,
    water: 0,
    lastUpdate: 0,
  },
  {
    deviceId: 'ROBOT002',
    name: '清洁机器人 2号',
    online: false,
    workStatus: 'offline',
    battery: 0,
    water: 0,
    lastUpdate: 0,
  },
  {
    deviceId: 'ROBOT003',
    name: '清洁机器人 3号',
    online: false,
    workStatus: 'offline',
    battery: 0,
    water: 0,
    lastUpdate: 0,
  },
]

export const useDeviceStore = defineStore(
  'device',
  () => {
    // MQTT 连接状态
    const connectionStatus = ref<ConnectionStatus>('disconnected')
    // 设备列表
    const devices = ref<DeviceInfo[]>([...MOCK_DEVICES])
    // 当前选中的设备ID
    const currentDeviceId = ref<string>('')
    // 命令确认记录
    const commandAcks = ref<CommandAckBody[]>([])
    // 任务结果记录
    const taskResults = ref<TaskResultBody[]>([])
    // 错误记录
    const errors = ref<ErrorBody[]>([])
    // 事件记录
    const events = ref<EventBody[]>([])
    // 是否已初始化订阅
    const isSubscribed = ref(false)

    /** 获取当前设备 */
    const currentDevice = computed(() => {
      return devices.value.find(d => d.deviceId === currentDeviceId.value)
    })

    /** 获取在线设备数量 */
    const onlineCount = computed(() => {
      return devices.value.filter(d => d.online).length
    })

    /** 获取工作中设备数量 */
    const workingCount = computed(() => {
      return devices.value.filter(d => d.workStatus === 'working').length
    })

    /** 更新设备状态 */
    function updateDeviceStatus(deviceId: string, status: Partial<DeviceStatusBody>): void {
      const device = devices.value.find(d => d.deviceId === deviceId)
      if (device) {
        Object.assign(device, {
          ...status,
          lastUpdate: Date.now(),
        })
      }
      else {
        // 如果设备不存在，添加新设备
        devices.value.push({
          deviceId,
          name: `机器人 ${deviceId}`,
          online: status.online ?? false,
          workStatus: status.workStatus ?? 'offline',
          battery: status.battery ?? 0,
          water: status.water ?? 0,
          lastUpdate: Date.now(),
        })
      }
    }

    /** 处理设备状态消息 */
    function handleDeviceStatus(deviceId: string, body: DeviceStatusBody): void {
      console.log('[Store] Device status received:', deviceId, body)
      updateDeviceStatus(deviceId, body)
    }

    /** 处理命令确认 */
    function handleCommandAck(deviceId: string, message: BaseMessage<CommandAckBody>): void {
      console.log('[Store] Command ack received:', deviceId, message)
      commandAcks.value.unshift(message.body)
      // 只保留最近20条
      if (commandAcks.value.length > 20) {
        commandAcks.value.pop()
      }
    }

    /** 处理任务结果 */
    function handleTaskResult(deviceId: string, message: BaseMessage<TaskResultBody>): void {
      console.log('[Store] Task result received:', deviceId, message)
      taskResults.value.unshift(message.body)
      if (taskResults.value.length > 20) {
        taskResults.value.pop()
      }
    }

    /** 处理错误 */
    function handleError(deviceId: string, message: BaseMessage<ErrorBody>): void {
      console.log('[Store] Error received:', deviceId, message)
      errors.value.unshift(message.body)
      if (errors.value.length > 50) {
        errors.value.pop()
      }
      // 显示错误提示
      uni.showToast({
        title: message.body.message,
        icon: 'none',
        duration: 3000,
      })
    }

    /** 处理事件 */
    function handleEvent(deviceId: string, message: BaseMessage<EventBody>): void {
      console.log('[Store] Event received:', deviceId, message)
      events.value.unshift(message.body)
      if (events.value.length > 50) {
        events.value.pop()
      }
    }

    /** 连接 MQTT 并订阅 */
    async function connect(): Promise<void> {
      if (connectionStatus.value === 'connected') {
        return
      }

      try {
        // 监听连接状态变化
        mqttService.onConnectionStatusChange((status) => {
          connectionStatus.value = status
        })

        await mqttService.connect()
        connectionStatus.value = 'connected'

        // 订阅所有设备
        subscribeAllDevices()
      }
      catch (err) {
        console.error('[Store] MQTT connect error:', err)
        connectionStatus.value = 'error'
        throw err
      }
    }

    /** 断开连接 */
    async function disconnect(): Promise<void> {
      await mqttService.disconnect()
      connectionStatus.value = 'disconnected'
      isSubscribed.value = false
    }

    /** 订阅所有设备 */
    function subscribeAllDevices(): void {
      if (isSubscribed.value)
        return

      // 订阅所有设备状态 (使用通配符)
      mqttService.subscribeAllDeviceStatus((deviceId, status) => {
        handleDeviceStatus(deviceId, status)
      })

      // 为每个已知设备订阅详细消息
      devices.value.forEach((device) => {
        subscribeDevice(device.deviceId)
      })

      isSubscribed.value = true
    }

    /** 订阅单个设备的所有消息 */
    function subscribeDevice(deviceId: string): void {
      // 订阅命令确认
      mqttService.subscribeCommandAck(deviceId, (msg) => {
        handleCommandAck(deviceId, msg as BaseMessage<CommandAckBody>)
      })

      // 订阅任务结果
      mqttService.subscribeTaskResult(deviceId, (msg) => {
        handleTaskResult(deviceId, msg as BaseMessage<TaskResultBody>)
      })

      // 订阅错误
      mqttService.subscribeError(deviceId, (msg) => {
        handleError(deviceId, msg as BaseMessage<ErrorBody>)
      })

      // 订阅事件
      mqttService.subscribeEvent(deviceId, (msg) => {
        handleEvent(deviceId, msg as BaseMessage<EventBody>)
      })
    }

    /** 发送控制命令 */
    async function sendCommand(
      deviceId: string,
      cmd: 'start' | 'stop' | 'pause' | 'resume' | 'home' | 'charge',
      mode?: CleanMode,
    ): Promise<string> {
      if (connectionStatus.value !== 'connected') {
        throw new Error('MQTT未连接')
      }
      return mqttService.sendCommand(deviceId, cmd, mode)
    }

    /** 发送任务 */
    async function sendTask(
      deviceId: string,
      taskType: 'clean' | 'patrol' | 'charge',
      params?: Record<string, unknown>,
    ): Promise<string> {
      if (connectionStatus.value !== 'connected') {
        throw new Error('MQTT未连接')
      }
      const taskId = `task_${Date.now()}`
      return mqttService.sendTask(deviceId, {
        taskId,
        taskType,
        params,
      })
    }

    /** 设置当前设备 */
    function setCurrentDevice(deviceId: string): void {
      currentDeviceId.value = deviceId
    }

    /** 获取工作状态显示文本 */
    function getWorkStatusText(status: WorkStatus): string {
      const statusMap: Record<WorkStatus, string> = {
        idle: '空闲',
        working: '工作中',
        charging: '充电中',
        error: '故障',
        offline: '离线',
      }
      return statusMap[status] || '未知'
    }

    /** 获取工作状态颜色 */
    function getWorkStatusColor(status: WorkStatus): string {
      const colorMap: Record<WorkStatus, string> = {
        idle: '#52c41a',
        working: '#1890ff',
        charging: '#faad14',
        error: '#f5222d',
        offline: '#999999',
      }
      return colorMap[status] || '#999999'
    }

    return {
      // 状态
      connectionStatus,
      devices,
      currentDeviceId,
      currentDevice,
      commandAcks,
      taskResults,
      errors,
      events,
      onlineCount,
      workingCount,

      // 方法
      connect,
      disconnect,
      sendCommand,
      sendTask,
      setCurrentDevice,
      getWorkStatusText,
      getWorkStatusColor,
      updateDeviceStatus,
    }
  },
  {
    persist: {
      // 只持久化设备列表
      paths: ['devices', 'currentDeviceId'],
    },
  },
)
