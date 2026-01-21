# Robot MQTT 通信协议（第一阶段）

版本：`robot_v1_stage1`

适用范围：机器人原型期 / Demo / 第一阶段交付（含闭环能力）

---

## 1. 设计目标

- 支持机器人基础控制与状态展示
- 引入**指令确认、任务反馈、异常上报**等闭环能力
- 提升系统可观测性与可运维性
- 为第二阶段任务编排与运维平台预留接口

> **原则**：在不引入复杂架构的前提下，让系统“看起来完整、用起来可控、交付上可验收”

---

## 2. 系统分层结构

```text
┌──────────────┐
│  手机 / Web  │  ← 控制 & 可视化
└──────┬───────┘
       │ MQTT
┌──────▼───────┐
│  物联网平台  │  ← EMQX
└──────┬───────┘
       │ MQTT
┌──────▼───────┐
│  机器人通信层│  ← C++ / Python / ROS
└──────┬───────┘
       │ 串口 / CAN / Modbus
┌──────▼───────┐
│  硬件执行层  │  ← 电机 / 传感器
└──────────────┘
```

---

## 3. MQTT 基础配置

- 协议版本：MQTT 3.1.1
- Broker：EMQX
- QoS 策略：
  - 状态 / 心跳 / 结果反馈：QoS 1
  - 指令 / 任务：QoS 1
- Retain 策略：
  - `status`：retain = true
  - 其他 Topic：retain = false

---

## 4. Topic 规范

```text
/cleanbot/{deviceId}/status        # 状态上报（retain）
/cleanbot/{deviceId}/heartbeat     # 心跳
/cleanbot/{deviceId}/cmd           # 控制指令
/cleanbot/{deviceId}/cmd/ack       # 指令确认反馈
/cleanbot/{deviceId}/task          # 任务下发
/cleanbot/{deviceId}/task/result   # 任务执行结果
/cleanbot/{deviceId}/error         # 异常 / 错误上报
/cleanbot/{deviceId}/event         # 状态变化事件
```

---

## 5. 统一消息结构（Meta + Body）

```json
{
  "meta": {},
  "body": {}
}
```

### 5.1 Meta 规范

```json
"meta": {
"protocol": "robot-mqtt",
"version": "1.0",
"msgId": "UUID",
"timestamp": 1736678800000,
"from": "robot",
"to": "cloud"
}
```

---

## 6. 消息定义

### 6.1 状态上报

- Topic：`/cleanbot/{deviceId}/status`
- Retain：true

```json
{
  "body": {
    "deviceId": "ABC123456",
    "online": true,
    "workStatus": "idle",
    "battery": 64,
    "water": 100
  }
}
```

---

### 6.2 控制指令 & Ack 确认（增强）

#### 指令下发

```json
{
  "body": {
    "cmd": "start",
    "mode": "steam"
  }
}
```
mode: steam	蒸汽 、blower 吹风、 suction_water 吸水、 vacuum	吸尘



#### 指令确认 Ack

- Topic：`/cleanbot/{deviceId}/cmd/ack`

```json
{
  "body": {
    "refMsgId": "uuid-cmd-001",
    "cmd": "start",
    "mode": "steam",
    "accepted": true,
    "reason": ""
  }
}
```

---

### 6.3 任务下发 & 任务结果反馈

#### 任务下发

```json
{
  "body": {
    "taskId": "task_001",
    "taskType": "clean"
  }
}
```

#### 任务结果反馈

- Topic：`/cleanbot/{deviceId}/task/result`

```json
{
  "body": {
    "taskId": "task_001",
    "taskType": "clean",
    "status": "success",
    "startTime": 1736678800000,
    "endTime": 1736679700000,
    "duration": 900, // 暂时不用
    "failReason": ""
  }
}
```

---

### 6.4 异常 / 错误上报（增强）

- Topic：`/cleanbot/{deviceId}/error`

```json
{
  "body": {
    "errorCode": "E_BATTERY_LOW",
    "errorLevel": "warning",
    "message": "Battery below 20%",
    "relatedTaskId": "task_001"
  }
}
```

---

### 6.5 状态变化事件（增强）

- Topic：`/cleanbot/{deviceId}/event`

```json
{
  "body": {
    "event": "work_status_changed",
    "fromStatus": "idle",
    "toStatus": "working"
  }
}
```

---

## 7. 第一阶段增强版通信流程

```text
1. Robot 上线并上报 status（retain）
2. Cloud/Web 下发 cmd 或 task
3. Robot 返回 cmd/ack 确认指令接收情况
4. Robot 执行任务并上报 task/result
5. 执行过程中如有异常，上报 error
6. 状态变化时上报 event
7. Robot 周期性上报 heartbeat / status
```

---

## 8. 阶段边界说明（重要）

以下内容 **仍不属于第一阶段**：

- 任务队列 / 并发调度
- 地图 / 定位 / 路径规划
- 自动重试 / 幂等控制
- 多机器人协同

> 第一阶段增强版重点在于：**控制闭环 + 结果可见 + 问题可追溯**

---

## 9. 协议演进说明

- 后续通过 `meta.version = 1.1 / 1.2` 扩展
- 第一阶段设备无需修改即可继续使用

---

## MQTT 连接信息

- Broker: 47.110.70.31
- TCP Port: 1883
- WebSocket Port: 8083
- Username: web
- Password: web12345678.

第一阶段：
1， MQTT 平台（EMQX），物联网平台搭建

2，mqtt协议编写（核心的协议）通讯协议的制定

3，Web端控制页面（实现快，出效果）可以是H5 / 中央控制平台

	机器人列表

	实时状态卡片

	控制面板（按钮）

固定几台机器人，固定的几个任务，可以实现 任务的执行，机器人基本状态的上报（例如：电量，水量）

系统分层：

┌──────────────┐
│  手机 / Web  │  ← 控制 & 可视化
└──────┬───────┘
│ MQTT
┌──────▼───────┐
│  物联网平台  │  ← EMQX
└──────┬───────┘
│ MQTT
┌──────▼───────┐
│  机器人通信层│  ← C++ / Python / ROS
└──────┬───────┘
│ 串口 / CAN / Modbus
┌──────▼───────┐
│  硬件执行层  │  ← 电机 / 传感器
└──────────────┘
