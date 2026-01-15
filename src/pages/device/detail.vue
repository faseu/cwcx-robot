<script lang="ts" setup>
import type { DeviceInfo } from '@/mqtt'
import { useDeviceStore } from '@/store/device'

defineOptions({
  name: 'DeviceDetail',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})

const deviceStore = useDeviceStore()

// 当前设备ID
const deviceId = ref('')
// 当前设备信息
const device = computed<DeviceInfo | undefined>(() => {
  return deviceStore.devices.find(d => d.deviceId === deviceId.value)
})

// 加载状态
const commanding = ref(false)
const tasking = ref(false)
const activeCmd = ref('')

// 动画状态
const mounted = ref(false)

// 命令确认记录
const commandAcks = computed(() => deviceStore.commandAcks)
// 任务结果记录
const taskResults = computed(() => deviceStore.taskResults)
// 错误记录
const errors = computed(() => deviceStore.errors)
// 连接状态
const isConnected = computed(() => deviceStore.connectionStatus === 'connected')

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})

/** 页面加载 */
onLoad((options) => {
  if (options?.deviceId) {
    deviceId.value = options.deviceId
    deviceStore.setCurrentDevice(options.deviceId)
  }
})

/** 返回 */
function goBack() {
  uni.navigateBack()
}

/** 发送控制命令 */
async function sendCommand(cmd: 'start' | 'stop' | 'pause' | 'resume' | 'home' | 'charge') {
  if (!device.value?.online) {
    uni.showToast({ title: '设备离线', icon: 'none' })
    return
  }
  if (commanding.value)
    return

  commanding.value = true
  activeCmd.value = cmd
  try {
    await deviceStore.sendCommand(deviceId.value, cmd)
    uni.showToast({ title: '指令已发送', icon: 'success' })
  }
  catch {
    uni.showToast({ title: '发送失败', icon: 'error' })
  }
  finally {
    setTimeout(() => {
      commanding.value = false
      activeCmd.value = ''
    }, 500)
  }
}

/** 发送任务 */
async function sendTask(taskType: 'clean' | 'patrol' | 'charge') {
  if (!device.value?.online) {
    uni.showToast({ title: '设备离线', icon: 'none' })
    return
  }
  if (tasking.value)
    return

  tasking.value = true
  try {
    await deviceStore.sendTask(deviceId.value, taskType)
    uni.showToast({ title: '任务已下发', icon: 'success' })
  }
  catch {
    uni.showToast({ title: '发送失败', icon: 'error' })
  }
  finally {
    setTimeout(() => {
      tasking.value = false
    }, 500)
  }
}

/** 格式化时间戳 */
function formatTimestamp(ts: number): string {
  if (!ts)
    return '--:--'
  const date = new Date(ts)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

/** 格式化完整时间 */
function formatFullTime(ts: number): string {
  if (!ts)
    return '暂无数据'
  const date = new Date(ts)
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** 获取状态类名 */
function getStatusClass(status: string): string {
  const classMap: Record<string, string> = {
    idle: 'status-idle',
    working: 'status-working',
    charging: 'status-charging',
    error: 'status-error',
    offline: 'status-offline',
  }
  return classMap[status] || 'status-offline'
}

/** 控制按钮配置 */
const controlButtons = [
  { cmd: 'start', label: '启动', icon: 'i-carbon-play-filled', color: '#00ff88' },
  { cmd: 'stop', label: '停止', icon: 'i-carbon-stop-filled', color: '#ff3366' },
  { cmd: 'pause', label: '暂停', icon: 'i-carbon-pause-filled', color: '#ffaa00' },
  { cmd: 'resume', label: '继续', icon: 'i-carbon-play', color: '#00d4ff' },
  { cmd: 'home', label: '回充', icon: 'i-carbon-home', color: '#7b2dff' },
  { cmd: 'charge', label: '充电', icon: 'i-carbon-battery-charging', color: '#06b6d4' },
] as const

/** 任务类型配置 */
const taskTypes = [
  { type: 'clean', label: '清洁', desc: '全区域清洁任务', icon: 'i-carbon-clean', color: '#00d4ff' },
  { type: 'patrol', label: '巡逻', desc: '安全巡检任务', icon: 'i-carbon-location-current', color: '#00ff88' },
  { type: 'charge', label: '充电', desc: '返回充电任务', icon: 'i-carbon-battery-charging', color: '#ffaa00' },
] as const
</script>

<template>
  <view class="detail-page">
    <!-- 背景 -->
    <view class="page-bg">
      <view class="grid-bg" />
      <view class="glow glow-1" />
      <view class="glow glow-2" />
      <view class="scan-line" />
    </view>

    <!-- 内容 -->
    <view class="page-content" :class="{ visible: mounted }">
      <!-- 顶部导航 -->
      <view class="nav-bar">
        <view class="nav-back" @click="goBack">
          <text class="i-carbon-arrow-left" />
        </view>
        <view class="nav-title">
          设备控制
        </view>
        <view class="nav-status" :class="{ online: isConnected }">
          <view class="status-dot" />
        </view>
      </view>

      <!-- 设备不存在 -->
      <view v-if="!device" class="not-found">
        <view class="not-found-icon">
          <text class="i-carbon-warning-alt text-100rpx" />
        </view>
        <text class="not-found-text">设备不存在</text>
        <button class="cyber-btn" @click="goBack">
          <text>返回列表</text>
        </button>
      </view>

      <template v-else>
        <!-- 设备状态卡片 -->
        <view class="device-card">
          <view class="card-bg">
            <view class="card-glow" />
          </view>
          <view class="card-content">
            <!-- 设备头部 -->
            <view class="device-header">
              <view class="device-avatar" :class="getStatusClass(device.workStatus)">
                <text class="i-carbon-bot text-64rpx" />
                <view class="avatar-ring" />
                <view class="avatar-pulse" />
              </view>
              <view class="device-info">
                <view class="device-name">
                  {{ device.name }}
                </view>
                <view class="device-id">
                  <text class="i-carbon-tag" />
                  {{ device.deviceId }}
                </view>
              </view>
              <view class="device-status" :class="getStatusClass(device.workStatus)">
                <view class="status-indicator" />
                <text>{{ deviceStore.getWorkStatusText(device.workStatus) }}</text>
              </view>
            </view>

            <!-- 数据仪表盘 -->
            <view class="data-dashboard">
              <!-- 电量 -->
              <view class="gauge-item">
                <view class="gauge-ring">
                  <svg viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="42" />
                    <circle
                      class="gauge-fill battery"
                      :class="{ low: device.battery < 20 }"
                      cx="50"
                      cy="50"
                      r="42"
                      :style="{ strokeDashoffset: 264 - (264 * device.battery / 100) }"
                    />
                  </svg>
                  <view class="gauge-value">
                    <text class="value-num">{{ device.battery }}</text>
                    <text class="value-unit">%</text>
                  </view>
                </view>
                <view class="gauge-label">
                  <text class="i-carbon-battery-full" />
                  电量
                </view>
              </view>

              <!-- 水量 -->
              <view v-if="device.water !== undefined" class="gauge-item">
                <view class="gauge-ring">
                  <svg viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="42" />
                    <circle
                      class="gauge-fill water"
                      cx="50"
                      cy="50"
                      r="42"
                      :style="{ strokeDashoffset: 264 - (264 * (device.water || 0) / 100) }"
                    />
                  </svg>
                  <view class="gauge-value">
                    <text class="value-num">{{ device.water }}</text>
                    <text class="value-unit">%</text>
                  </view>
                </view>
                <view class="gauge-label">
                  <text class="i-carbon-drop" />
                  水量
                </view>
              </view>

              <!-- 更新时间 -->
              <view class="gauge-item time">
                <view class="time-display">
                  <text class="i-carbon-time text-48rpx" />
                  <text class="time-value">{{ formatFullTime(device.lastUpdate) }}</text>
                </view>
                <view class="gauge-label">
                  最后更新
                </view>
              </view>
            </view>
          </view>
          <view class="card-border" />
        </view>

        <!-- 控制面板 -->
        <view class="section-card">
          <view class="section-header">
            <view class="section-icon">
              <text class="i-carbon-settings-adjust" />
            </view>
            <view class="section-title">
              控制面板
            </view>
            <view class="section-line" />
          </view>

          <view class="control-grid">
            <view
              v-for="btn in controlButtons"
              :key="btn.cmd"
              class="control-item"
              :class="{ active: activeCmd === btn.cmd, disabled: !device.online }"
              @click="sendCommand(btn.cmd)"
            >
              <view class="control-icon" :style="{ '--btn-color': btn.color }">
                <text :class="btn.icon" />
                <view class="icon-glow" />
              </view>
              <text class="control-label">{{ btn.label }}</text>
            </view>
          </view>
        </view>

        <!-- 任务下发 -->
        <view class="section-card">
          <view class="section-header">
            <view class="section-icon">
              <text class="i-carbon-task" />
            </view>
            <view class="section-title">
              任务下发
            </view>
            <view class="section-line" />
          </view>

          <view class="task-list">
            <view
              v-for="task in taskTypes"
              :key="task.type"
              class="task-item"
              :class="{ disabled: !device.online || tasking }"
              @click="sendTask(task.type)"
            >
              <view class="task-icon" :style="{ '--task-color': task.color }">
                <text :class="task.icon" />
              </view>
              <view class="task-info">
                <text class="task-label">{{ task.label }}</text>
                <text class="task-desc">{{ task.desc }}</text>
              </view>
              <view class="task-arrow">
                <text class="i-carbon-chevron-right" />
              </view>
            </view>
          </view>
        </view>

        <!-- 记录面板 -->
        <view v-if="commandAcks.length > 0 || taskResults.length > 0 || errors.length > 0" class="section-card">
          <view class="section-header">
            <view class="section-icon">
              <text class="i-carbon-document" />
            </view>
            <view class="section-title">
              操作记录
            </view>
            <view class="section-line" />
          </view>

          <!-- 命令确认 -->
          <view v-if="commandAcks.length > 0" class="record-group">
            <view class="record-title">
              <text class="i-carbon-checkmark-outline" />
              命令确认
            </view>
            <view class="record-list">
              <view v-for="(ack, idx) in commandAcks.slice(0, 3)" :key="idx" class="record-item">
                <view class="record-cmd">
                  {{ ack.cmd }}
                </view>
                <view class="record-status" :class="ack.accepted ? 'success' : 'failed'">
                  {{ ack.accepted ? '已接受' : '被拒绝' }}
                </view>
              </view>
            </view>
          </view>

          <!-- 任务结果 -->
          <view v-if="taskResults.length > 0" class="record-group">
            <view class="record-title">
              <text class="i-carbon-result" />
              任务结果
            </view>
            <view class="record-list">
              <view v-for="(result, idx) in taskResults.slice(0, 3)" :key="idx" class="record-item">
                <view class="record-task">
                  {{ result.taskType }}
                </view>
                <view class="record-status" :class="result.status">
                  {{ result.status }}
                </view>
                <view class="record-time">
                  {{ formatTimestamp(result.endTime) }}
                </view>
              </view>
            </view>
          </view>

          <!-- 错误记录 -->
          <view v-if="errors.length > 0" class="record-group">
            <view class="record-title error">
              <text class="i-carbon-warning" />
              错误记录
            </view>
            <view class="record-list">
              <view v-for="(err, idx) in errors.slice(0, 3)" :key="idx" class="record-item error">
                <view class="error-code">
                  {{ err.errorCode }}
                </view>
                <view class="error-msg">
                  {{ err.message }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部间距 -->
        <view class="bottom-space" />
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 科技感配色
$primary: #00d4ff;
$secondary: #7b2dff;
$success: #00ff88;
$warning: #ffaa00;
$danger: #ff3366;
$bg-dark: #0a0e17;
$bg-card: rgba(16, 24, 40, 0.85);
$border-color: rgba(0, 212, 255, 0.2);
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.6);

.detail-page {
  min-height: 100vh;
  background: $bg-dark;
  position: relative;
}

// 页面背景
.page-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba($primary, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba($primary, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: glowPulse 8s ease-in-out infinite;

    &.glow-1 {
      width: 300rpx;
      height: 300rpx;
      background: $primary;
      top: 100rpx;
      right: -100rpx;
      opacity: 0.3;
    }

    &.glow-2 {
      width: 250rpx;
      height: 250rpx;
      background: $secondary;
      bottom: 200rpx;
      left: -100rpx;
      opacity: 0.2;
    }
  }

  .scan-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2rpx;
    background: linear-gradient(90deg, transparent, $primary, transparent);
    animation: scanMove 4s linear infinite;
    opacity: 0.3;
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

@keyframes scanMove {
  0% {
    top: -5%;
  }
  100% {
    top: 105%;
  }
}

// 页面内容
.page-content {
  position: relative;
  z-index: 10;
  padding: 0 30rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// 导航栏
.nav-bar {
  display: flex;
  align-items: center;
  padding: 60rpx 0 30rpx;
  gap: 20rpx;

  .nav-back {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $bg-card;
    border: 1rpx solid $border-color;
    border-radius: 16rpx;
    color: $text-primary;
    font-size: 36rpx;

    &:active {
      background: rgba($primary, 0.1);
      border-color: $primary;
    }
  }

  .nav-title {
    flex: 1;
    font-size: 36rpx;
    font-weight: bold;
    color: $text-primary;
  }

  .nav-status {
    width: 24rpx;
    height: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .status-dot {
      width: 12rpx;
      height: 12rpx;
      border-radius: 50%;
      background: $danger;
      transition: all 0.3s;
    }

    &.online .status-dot {
      background: $success;
      box-shadow: 0 0 10rpx $success;
      animation: pulse 2s infinite;
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

// 设备不存在
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;

  .not-found-icon {
    color: rgba($warning, 0.5);
    margin-bottom: 30rpx;
  }

  .not-found-text {
    font-size: 32rpx;
    color: $text-primary;
    margin-bottom: 40rpx;
  }

  .cyber-btn {
    padding: 20rpx 60rpx;
    background: rgba($primary, 0.2);
    border: 1rpx solid $primary;
    border-radius: 12rpx;
    color: $primary;
    font-size: 28rpx;

    &::after {
      display: none;
    }
  }
}

// 设备卡片
.device-card {
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;

  .card-bg {
    position: absolute;
    inset: 0;
    background: $bg-card;
    backdrop-filter: blur(10px);

    .card-glow {
      position: absolute;
      top: 0;
      left: 50%;
      width: 300rpx;
      height: 300rpx;
      background: radial-gradient(circle, rgba($primary, 0.15) 0%, transparent 70%);
      transform: translate(-50%, -50%);
    }
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 30rpx;
  }

  .card-border {
    position: absolute;
    inset: 0;
    border: 1rpx solid $border-color;
    border-radius: 24rpx;
    pointer-events: none;
  }

  // 设备头部
  .device-header {
    display: flex;
    align-items: center;
    gap: 24rpx;
    margin-bottom: 30rpx;

    .device-avatar {
      position: relative;
      width: 120rpx;
      height: 120rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba($primary, 0.2), rgba($secondary, 0.2));
      border-radius: 50%;
      color: $primary;

      .avatar-ring {
        position: absolute;
        inset: -6rpx;
        border: 2rpx solid $primary;
        border-radius: 50%;
        animation: ringRotate 10s linear infinite;
      }

      .avatar-pulse {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: rgba($primary, 0.2);
        animation: avatarPulse 2s ease-out infinite;
      }

      &.status-working {
        color: $warning;
        background: linear-gradient(135deg, rgba($warning, 0.2), rgba($warning, 0.1));
        .avatar-ring {
          border-color: $warning;
        }
        .avatar-pulse {
          background: rgba($warning, 0.2);
        }
      }

      &.status-charging {
        color: $success;
        background: linear-gradient(135deg, rgba($success, 0.2), rgba($success, 0.1));
        .avatar-ring {
          border-color: $success;
        }
        .avatar-pulse {
          background: rgba($success, 0.2);
        }
      }

      &.status-error {
        color: $danger;
        background: linear-gradient(135deg, rgba($danger, 0.2), rgba($danger, 0.1));
        .avatar-ring {
          border-color: $danger;
        }
        .avatar-pulse {
          background: rgba($danger, 0.2);
        }
      }

      &.status-offline {
        color: $text-secondary;
        background: rgba(255, 255, 255, 0.05);
        .avatar-ring {
          border-color: $text-secondary;
          opacity: 0.3;
        }
        .avatar-pulse {
          display: none;
        }
      }
    }

    .device-info {
      flex: 1;

      .device-name {
        font-size: 36rpx;
        font-weight: bold;
        color: $text-primary;
      }

      .device-id {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 24rpx;
        color: $text-secondary;
        margin-top: 8rpx;
      }
    }

    .device-status {
      display: flex;
      align-items: center;
      gap: 10rpx;
      padding: 12rpx 24rpx;
      background: rgba($primary, 0.15);
      border: 1rpx solid rgba($primary, 0.3);
      border-radius: 24rpx;
      font-size: 26rpx;
      color: $text-primary;

      .status-indicator {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        background: $primary;
      }

      &.status-working {
        background: rgba($warning, 0.15);
        border-color: rgba($warning, 0.3);
        color: $warning;
        .status-indicator {
          background: $warning;
          animation: blink 1s infinite;
        }
      }

      &.status-charging {
        background: rgba($success, 0.15);
        border-color: rgba($success, 0.3);
        color: $success;
        .status-indicator {
          background: $success;
        }
      }

      &.status-error {
        background: rgba($danger, 0.15);
        border-color: rgba($danger, 0.3);
        color: $danger;
        .status-indicator {
          background: $danger;
          animation: blink 0.5s infinite;
        }
      }

      &.status-offline {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        color: $text-secondary;
        .status-indicator {
          background: $text-secondary;
        }
      }
    }
  }

  // 数据仪表盘
  .data-dashboard {
    display: flex;
    justify-content: space-around;
    padding-top: 20rpx;
    border-top: 1rpx solid rgba($primary, 0.1);

    .gauge-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;

      .gauge-ring {
        position: relative;
        width: 140rpx;
        height: 140rpx;

        svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .gauge-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 8;
        }

        .gauge-fill {
          fill: none;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 264;
          transition: stroke-dashoffset 1s ease-out;

          &.battery {
            stroke: url(#batteryGradient);
            stroke: $success;

            &.low {
              stroke: $danger;
            }
          }

          &.water {
            stroke: $primary;
          }
        }

        .gauge-value {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .value-num {
            font-size: 36rpx;
            font-weight: bold;
            color: $text-primary;
            font-family: 'Courier New', monospace;
          }

          .value-unit {
            font-size: 20rpx;
            color: $text-secondary;
          }
        }
      }

      .gauge-label {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 24rpx;
        color: $text-secondary;
      }

      &.time {
        .time-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8rpx;
          color: $text-secondary;

          .time-value {
            font-size: 26rpx;
            color: $text-primary;
          }
        }
      }
    }
  }
}

@keyframes ringRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes avatarPulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

// 区块卡片
.section-card {
  background: $bg-card;
  border: 1rpx solid $border-color;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10px);

  .section-header {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 30rpx;

    .section-icon {
      width: 48rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($primary, 0.15);
      border-radius: 12rpx;
      color: $primary;
      font-size: 28rpx;
    }

    .section-title {
      font-size: 30rpx;
      font-weight: 600;
      color: $text-primary;
    }

    .section-line {
      flex: 1;
      height: 1rpx;
      background: linear-gradient(90deg, $border-color, transparent);
    }
  }
}

// 控制网格
.control-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24rpx;

  .control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
    padding: 24rpx 0;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 0.02);
    border: 1rpx solid transparent;
    transition: all 0.3s;

    .control-icon {
      position: relative;
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--btn-color), 0.1);
      border-radius: 50%;
      font-size: 36rpx;
      color: var(--btn-color);
      transition: all 0.3s;

      .icon-glow {
        position: absolute;
        inset: -4rpx;
        border-radius: 50%;
        border: 2rpx solid var(--btn-color);
        opacity: 0.3;
      }
    }

    .control-label {
      font-size: 24rpx;
      color: $text-secondary;
    }

    &:active:not(.disabled) {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--btn-color);
      transform: scale(0.95);

      .control-icon {
        transform: scale(1.1);
        box-shadow: 0 0 20rpx rgba(var(--btn-color), 0.5);
      }
    }

    &.active {
      .control-icon {
        animation: iconPulse 0.5s ease-out;
      }
    }

    &.disabled {
      opacity: 0.3;
    }
  }
}

@keyframes iconPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// 任务列表
.task-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;

  .task-item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 24rpx;
    background: rgba(255, 255, 255, 0.02);
    border: 1rpx solid transparent;
    border-radius: 16rpx;
    transition: all 0.3s;

    .task-icon {
      width: 72rpx;
      height: 72rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--task-color), 0.1);
      border-radius: 16rpx;
      font-size: 32rpx;
      color: var(--task-color);
    }

    .task-info {
      flex: 1;

      .task-label {
        display: block;
        font-size: 28rpx;
        font-weight: 500;
        color: $text-primary;
      }

      .task-desc {
        display: block;
        font-size: 22rpx;
        color: $text-secondary;
        margin-top: 4rpx;
      }
    }

    .task-arrow {
      color: $text-secondary;
      font-size: 28rpx;
      transition: transform 0.3s;
    }

    &:active:not(.disabled) {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba($primary, 0.3);

      .task-arrow {
        transform: translateX(8rpx);
        color: $primary;
      }
    }

    &.disabled {
      opacity: 0.3;
    }
  }
}

// 记录组
.record-group {
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid rgba($primary, 0.1);

  &:first-child {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  .record-title {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-size: 24rpx;
    color: $text-secondary;
    margin-bottom: 16rpx;

    &.error {
      color: $danger;
    }
  }

  .record-list {
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    .record-item {
      display: flex;
      align-items: center;
      gap: 16rpx;
      padding: 16rpx;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12rpx;
      font-size: 24rpx;

      .record-cmd,
      .record-task {
        color: $text-primary;
        font-weight: 500;
      }

      .record-status {
        padding: 4rpx 16rpx;
        border-radius: 8rpx;
        font-size: 22rpx;

        &.success {
          background: rgba($success, 0.15);
          color: $success;
        }
        &.failed {
          background: rgba($danger, 0.15);
          color: $danger;
        }
      }

      .record-time {
        margin-left: auto;
        color: $text-secondary;
        font-family: 'Courier New', monospace;
      }

      &.error {
        flex-direction: column;
        align-items: flex-start;
        gap: 8rpx;

        .error-code {
          color: $danger;
          font-weight: 500;
        }

        .error-msg {
          color: $text-secondary;
          font-size: 22rpx;
        }
      }
    }
  }
}

.bottom-space {
  height: 60rpx;
}
</style>
