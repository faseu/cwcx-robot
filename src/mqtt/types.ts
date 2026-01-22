/**
 * MQTT 相关类型定义
 */

/** MQTT 连接配置 */
export interface MqttConfig {
  broker: string
  port: number
  wsPort: number
  username: string
  password: string
  clientId?: string
}

/** 消息 Meta 信息 */
export interface MessageMeta {
  protocol: string
  version: string
  msgId: string
  timestamp: number
  from: 'robot' | 'cloud' | 'web'
  to: 'robot' | 'cloud' | 'web'
}

/** 基础消息结构 */
export interface BaseMessage<T = unknown> {
  meta: MessageMeta
  body: T
}

/** 设备工作状态 */
export type WorkStatus = 'idle' | 'working' | 'charging' | 'error' | 'offline'

/** 设备状态 Body */
export interface DeviceStatusBody {
  deviceId: string
  online: boolean
  workStatus: WorkStatus
  battery: number
  water?: number
}

/** 心跳 Body */
export interface HeartbeatBody {
  deviceId: string
  timestamp: number
}

/** 清洁工作模式 */
export type CleanMode = 'steam' | 'blower' | 'suction_water' | 'vacuum'

/** 控制指令 Body */
export interface CommandBody {
  cmd: 'start' | 'stop' | 'pause' | 'resume' | 'home' | 'charge'
  mode?: CleanMode
}

/** 指令确认 Body */
export interface CommandAckBody {
  refMsgId: string
  cmd: string
  accepted: boolean
  reason?: string
}

/** 任务下发 Body */
export interface TaskBody {
  taskId: string
  taskType: 'clean' | 'patrol' | 'charge'
  params?: Record<string, unknown>
}

/** 任务结果 Body */
export interface TaskResultBody {
  taskId: string
  taskType: string
  status: 'success' | 'failed' | 'cancelled'
  startTime: number
  endTime: number
  duration?: number
  failReason?: string
}

/** 错误等级 */
export type ErrorLevel = 'info' | 'warning' | 'error' | 'critical'

/** 错误上报 Body */
export interface ErrorBody {
  errorCode: string
  errorLevel: ErrorLevel
  message: string
  relatedTaskId?: string
}

/** 事件上报 Body */
export interface EventBody {
  event: string
  fromStatus?: string
  toStatus?: string
  data?: Record<string, unknown>
}

/** 设备信息 (前端展示用) */
export interface DeviceInfo {
  deviceId: string
  name: string
  online: boolean
  workStatus: WorkStatus
  battery: number
  water?: number
  lastUpdate: number
}

/** MQTT 连接状态 */
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'
