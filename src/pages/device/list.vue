<script lang="ts" setup>
import type { DeviceInfo } from '@/mqtt'
import { useDeviceStore } from '@/store/device'

defineOptions({
  name: 'DeviceList',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})

const deviceStore = useDeviceStore()

// 设备列表
const devices = computed(() => deviceStore.devices)
// 连接状态
const connectionStatus = computed(() => deviceStore.connectionStatus)
const isConnected = computed(() => connectionStatus.value === 'connected')
// 统计数据
const onlineCount = computed(() => deviceStore.onlineCount)
const workingCount = computed(() => deviceStore.workingCount)
const totalCount = computed(() => devices.value.length)

// 动画状态
const mounted = ref(false)
const currentTime = ref(new Date())

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)

  // 更新时间
  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

/** 检查连接状态，未连接则跳转登录 */
onLoad(() => {
  if (!isConnected.value) {
    deviceStore.connect().catch(() => {
      uni.redirectTo({
        url: '/pages/login/index',
      })
    })
  }
})

/** 进入设备详情 */
function goToDetail(device: DeviceInfo) {
  deviceStore.setCurrentDevice(device.deviceId)
  uni.navigateTo({
    url: `/pages/device/detail?deviceId=${device.deviceId}`,
  })
}

/** 快捷控制 - 启动 */
async function quickStart(device: DeviceInfo, e: Event) {
  e.stopPropagation()
  if (!device.online) {
    uni.showToast({ title: '设备离线', icon: 'none' })
    return
  }
  try {
    await deviceStore.sendCommand(device.deviceId, 'start')
    uni.showToast({ title: '指令已发送', icon: 'success' })
  }
  catch {
    uni.showToast({ title: '发送失败', icon: 'error' })
  }
}

/** 快捷控制 - 停止 */
async function quickStop(device: DeviceInfo, e: Event) {
  e.stopPropagation()
  if (!device.online) {
    uni.showToast({ title: '设备离线', icon: 'none' })
    return
  }
  try {
    await deviceStore.sendCommand(device.deviceId, 'stop')
    uni.showToast({ title: '指令已发送', icon: 'success' })
  }
  catch {
    uni.showToast({ title: '发送失败', icon: 'error' })
  }
}

/** 退出登录 */
async function handleLogout() {
  await deviceStore.disconnect()
  uni.redirectTo({
    url: '/pages/login/index',
  })
}

/** 格式化时间 */
function formatTime(timestamp: number): string {
  if (!timestamp)
    return '--:--'
  const date = new Date(timestamp)
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 60000)
    return '刚刚'
  if (diff < 3600000)
    return `${Math.floor(diff / 60000)}分钟前`
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** 格式化当前时间 */
function formatCurrentTime(): string {
  const date = currentTime.value
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

/** 格式化当前日期 */
function formatCurrentDate(): string {
  const date = currentTime.value
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`
}

/** 获取状态颜色类名 */
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
</script>

<template>
  <view class="device-list-page">
    <!-- 背景 -->
    <view class="page-bg">
      <view class="grid-bg" />
      <view class="glow glow-1" />
      <view class="glow glow-2" />
    </view>

    <!-- 内容区域 -->
    <view class="page-content" :class="{ visible: mounted }">
      <!-- 顶部导航栏 -->
      <view class="nav-header">
        <view class="nav-title">
          <text class="i-carbon-dashboard text-36rpx" />
          <text>控制中心</text>
        </view>
        <view class="nav-time">
          <text class="time-value">{{ formatCurrentTime() }}</text>
          <text class="time-date">{{ formatCurrentDate() }}</text>
        </view>
      </view>

      <!-- 连接状态 -->
      <view class="connection-bar" :class="{ connected: isConnected }">
        <view class="conn-indicator">
          <view class="conn-dot" :class="{ active: isConnected }" />
          <text>{{ isConnected ? 'MQTT 已连接' : 'MQTT 未连接' }}</text>
        </view>
        <view v-if="!isConnected" class="conn-action" @click="deviceStore.connect()">
          <text class="i-carbon-restart" />
          <text>重连</text>
        </view>
      </view>

      <!-- 统计面板 -->
      <view class="stats-panel">
        <view class="stat-card total">
          <view class="stat-icon">
            <text class="i-carbon-cube" />
          </view>
          <view class="stat-info">
            <view class="stat-value">
              <text class="value-num">{{ totalCount }}</text>
            </view>
            <view class="stat-label">
              设备总数
            </view>
          </view>
          <view class="stat-decoration" />
        </view>

        <view class="stat-card online">
          <view class="stat-icon">
            <text class="i-carbon-wireless-checkout" />
          </view>
          <view class="stat-info">
            <view class="stat-value">
              <text class="value-num">{{ onlineCount }}</text>
            </view>
            <view class="stat-label">
              在线设备
            </view>
          </view>
          <view class="stat-decoration" />
        </view>

        <view class="stat-card working">
          <view class="stat-icon">
            <text class="i-carbon-activity" />
          </view>
          <view class="stat-info">
            <view class="stat-value">
              <text class="value-num">{{ workingCount }}</text>
            </view>
            <view class="stat-label">
              工作中
            </view>
          </view>
          <view class="stat-decoration" />
        </view>
      </view>

      <!-- 设备列表标题 -->
      <view class="section-header">
        <view class="section-title">
          <view class="title-line" />
          <text>设备列表</text>
        </view>
        <view class="section-badge">
          <text class="i-carbon-view" />
          <text>实时监控</text>
        </view>
      </view>

      <!-- 设备列表 -->
      <view class="device-list">
        <view
          v-for="(device, index) in devices"
          :key="device.deviceId"
          class="device-card"
          :class="{ offline: !device.online }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="goToDetail(device)"
        >
          <!-- 卡片背景装饰 -->
          <view class="card-bg">
            <view class="card-glow" />
            <view class="card-grid" />
          </view>

          <!-- 卡片内容 -->
          <view class="card-content">
            <!-- 头部信息 -->
            <view class="card-header">
              <view class="device-avatar" :class="getStatusClass(device.workStatus)">
                <text class="i-carbon-bot text-48rpx" />
                <view class="avatar-ring" />
              </view>
              <view class="device-info">
                <view class="device-name">
                  {{ device.name }}
                </view>
                <view class="device-id">
                  <text class="i-carbon-tag text-20rpx" />
                  {{ device.deviceId }}
                </view>
              </view>
              <view class="device-status" :class="getStatusClass(device.workStatus)">
                <view class="status-dot" />
                <text>{{ deviceStore.getWorkStatusText(device.workStatus) }}</text>
              </view>
            </view>

            <!-- 数据展示 -->
            <view class="card-data">
              <!-- 电量 -->
              <view class="data-item">
                <view class="data-header">
                  <text class="i-carbon-battery-full" />
                  <text>电量</text>
                </view>
                <view class="data-bar">
                  <view
                    class="bar-fill battery"
                    :class="{ low: device.battery < 20, medium: device.battery >= 20 && device.battery < 50 }"
                    :style="{ width: `${device.battery}%` }"
                  />
                </view>
                <view class="data-value">
                  {{ device.battery }}%
                </view>
              </view>

              <!-- 水量 -->
              <view v-if="device.water !== undefined" class="data-item">
                <view class="data-header">
                  <text class="i-carbon-drop" />
                  <text>水量</text>
                </view>
                <view class="data-bar">
                  <view
                    class="bar-fill water"
                    :style="{ width: `${device.water}%` }"
                  />
                </view>
                <view class="data-value">
                  {{ device.water }}%
                </view>
              </view>
            </view>

            <!-- 底部操作 -->
            <view class="card-footer">
              <view class="update-time">
                <text class="i-carbon-time" />
                <text>{{ formatTime(device.lastUpdate) }}</text>
              </view>
              <view class="card-actions">
                <button
                  class="action-btn start"
                  :disabled="!device.online || device.workStatus === 'working'"
                  @click="quickStart(device, $event)"
                >
                  <text class="i-carbon-play-filled" />
                </button>
                <button
                  class="action-btn stop"
                  :disabled="!device.online || device.workStatus !== 'working'"
                  @click="quickStop(device, $event)"
                >
                  <text class="i-carbon-stop-filled" />
                </button>
              </view>
            </view>
          </view>

          <!-- 悬浮边框 -->
          <view class="card-border" />
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="devices.length === 0" class="empty-state">
        <view class="empty-icon">
          <text class="i-carbon-no-image text-100rpx" />
        </view>
        <text class="empty-text">暂无设备数据</text>
        <text class="empty-hint">请检查 MQTT 连接或添加设备</text>
      </view>

      <!-- 底部操作栏 -->
      <view class="footer-bar">
        <button class="footer-btn logout" @click="handleLogout">
          <text class="i-carbon-logout" />
          <text>退出系统</text>
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 科技感配色
$primary: #00d4ff;
$primary-dark: #0099cc;
$secondary: #7b2dff;
$success: #00ff88;
$warning: #ffaa00;
$danger: #ff3366;
$bg-dark: #0a0e17;
$bg-card: rgba(16, 24, 40, 0.85);
$border-color: rgba(0, 212, 255, 0.2);
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.6);

.device-list-page {
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

    &.glow-1 {
      width: 300rpx;
      height: 300rpx;
      background: $primary;
      top: -50rpx;
      left: -50rpx;
      opacity: 0.3;
    }

    &.glow-2 {
      width: 200rpx;
      height: 200rpx;
      background: $secondary;
      bottom: 100rpx;
      right: -50rpx;
      opacity: 0.2;
    }
  }
}

// 页面内容
.page-content {
  position: relative;
  z-index: 10;
  padding: 0 30rpx 140rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// 顶部导航
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60rpx 0 30rpx;

  .nav-title {
    display: flex;
    align-items: center;
    gap: 16rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: $text-primary;
  }

  .nav-time {
    text-align: right;

    .time-value {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: $primary;
      font-family: 'Courier New', monospace;
      letter-spacing: 4rpx;
    }

    .time-date {
      display: block;
      font-size: 22rpx;
      color: $text-secondary;
      margin-top: 4rpx;
    }
  }
}

// 连接状态栏
.connection-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 24rpx;
  background: rgba($danger, 0.1);
  border: 1rpx solid rgba($danger, 0.3);
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  transition: all 0.3s;

  &.connected {
    background: rgba($success, 0.1);
    border-color: rgba($success, 0.3);

    .conn-dot {
      background: $success;
      box-shadow: 0 0 10rpx $success;
    }
  }

  .conn-indicator {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 24rpx;
    color: $text-secondary;

    .conn-dot {
      width: 12rpx;
      height: 12rpx;
      border-radius: 50%;
      background: $danger;
      transition: all 0.3s;

      &.active {
        animation: dotPulse 2s ease-in-out infinite;
      }
    }
  }

  .conn-action {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-size: 24rpx;
    color: $primary;
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

// 统计面板
.stats-panel {
  display: flex;
  gap: 20rpx;
  margin-bottom: 40rpx;

  .stat-card {
    flex: 1;
    position: relative;
    background: $bg-card;
    border: 1rpx solid $border-color;
    border-radius: 16rpx;
    padding: 24rpx;
    overflow: hidden;
    backdrop-filter: blur(10px);

    .stat-icon {
      font-size: 36rpx;
      color: $primary;
      margin-bottom: 12rpx;
    }

    .stat-info {
      position: relative;
      z-index: 2;
    }

    .stat-value {
      .value-num {
        font-size: 48rpx;
        font-weight: bold;
        color: $text-primary;
        font-family: 'Courier New', monospace;
      }
    }

    .stat-label {
      font-size: 22rpx;
      color: $text-secondary;
      margin-top: 4rpx;
    }

    .stat-decoration {
      position: absolute;
      right: -20rpx;
      bottom: -20rpx;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      opacity: 0.1;
    }

    &.total {
      .stat-icon {
        color: $primary;
      }
      .stat-decoration {
        background: $primary;
      }
    }

    &.online {
      .stat-icon {
        color: $success;
      }
      .stat-decoration {
        background: $success;
      }
    }

    &.working {
      .stat-icon {
        color: $warning;
      }
      .stat-decoration {
        background: $warning;
      }
    }
  }
}

// 区域标题
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;

  .section-title {
    display: flex;
    align-items: center;
    gap: 16rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: $text-primary;

    .title-line {
      width: 6rpx;
      height: 32rpx;
      background: linear-gradient(180deg, $primary, $secondary);
      border-radius: 3rpx;
    }
  }

  .section-badge {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 8rpx 16rpx;
    background: rgba($primary, 0.1);
    border: 1rpx solid rgba($primary, 0.2);
    border-radius: 8rpx;
    font-size: 22rpx;
    color: $primary;
  }
}

// 设备列表
.device-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

// 设备卡片
.device-card {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
  animation: cardSlideIn 0.5s ease-out backwards;

  &.offline {
    .card-content {
      opacity: 0.6;
    }
    .device-avatar {
      filter: grayscale(1);
    }
  }

  // 背景装饰
  .card-bg {
    position: absolute;
    inset: 0;
    background: $bg-card;
    backdrop-filter: blur(10px);

    .card-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 200rpx;
      height: 200rpx;
      background: radial-gradient(circle, rgba($primary, 0.1) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: all 0.5s;
    }

    .card-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba($primary, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba($primary, 0.03) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

  // 内容区
  .card-content {
    position: relative;
    z-index: 2;
    padding: 28rpx;
    transition: all 0.3s;
  }

  // 头部
  .card-header {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 24rpx;

    .device-avatar {
      position: relative;
      width: 88rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba($primary, 0.2), rgba($secondary, 0.2));
      border-radius: 50%;
      color: $primary;
      transition: all 0.3s;

      .avatar-ring {
        position: absolute;
        inset: -4rpx;
        border: 2rpx solid $primary;
        border-radius: 50%;
        opacity: 0.5;
        animation: ringPulse 2s ease-in-out infinite;
      }

      &.status-working {
        color: $warning;
        background: linear-gradient(135deg, rgba($warning, 0.2), rgba($warning, 0.1));
        .avatar-ring {
          border-color: $warning;
        }
      }

      &.status-charging {
        color: $success;
        background: linear-gradient(135deg, rgba($success, 0.2), rgba($success, 0.1));
        .avatar-ring {
          border-color: $success;
        }
      }

      &.status-error {
        color: $danger;
        background: linear-gradient(135deg, rgba($danger, 0.2), rgba($danger, 0.1));
        .avatar-ring {
          border-color: $danger;
        }
      }

      &.status-offline {
        color: $text-secondary;
        background: rgba(255, 255, 255, 0.05);
        .avatar-ring {
          border-color: $text-secondary;
          opacity: 0.2;
        }
      }
    }

    .device-info {
      flex: 1;

      .device-name {
        font-size: 32rpx;
        font-weight: 600;
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
      gap: 8rpx;
      padding: 10rpx 20rpx;
      border-radius: 20rpx;
      font-size: 24rpx;
      color: $text-primary;
      background: rgba($primary, 0.15);
      border: 1rpx solid rgba($primary, 0.3);

      .status-dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: $primary;
      }

      &.status-idle {
        background: rgba($primary, 0.15);
        border-color: rgba($primary, 0.3);
        .status-dot {
          background: $primary;
        }
      }

      &.status-working {
        background: rgba($warning, 0.15);
        border-color: rgba($warning, 0.3);
        color: $warning;
        .status-dot {
          background: $warning;
          animation: blink 1s infinite;
        }
      }

      &.status-charging {
        background: rgba($success, 0.15);
        border-color: rgba($success, 0.3);
        color: $success;
        .status-dot {
          background: $success;
          animation: blink 2s infinite;
        }
      }

      &.status-error {
        background: rgba($danger, 0.15);
        border-color: rgba($danger, 0.3);
        color: $danger;
        .status-dot {
          background: $danger;
          animation: blink 0.5s infinite;
        }
      }

      &.status-offline {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        color: $text-secondary;
        .status-dot {
          background: $text-secondary;
        }
      }
    }
  }

  // 数据展示
  .card-data {
    display: flex;
    gap: 30rpx;
    padding: 20rpx 0;
    border-top: 1rpx solid rgba($primary, 0.1);
    border-bottom: 1rpx solid rgba($primary, 0.1);

    .data-item {
      flex: 1;

      .data-header {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 22rpx;
        color: $text-secondary;
        margin-bottom: 12rpx;
      }

      .data-bar {
        height: 8rpx;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4rpx;
        overflow: hidden;

        .bar-fill {
          height: 100%;
          border-radius: 4rpx;
          transition: width 0.5s ease-out;

          &.battery {
            background: linear-gradient(90deg, $success, $primary);

            &.low {
              background: linear-gradient(90deg, $danger, $warning);
            }
            &.medium {
              background: linear-gradient(90deg, $warning, $success);
            }
          }

          &.water {
            background: linear-gradient(90deg, #0ea5e9, #06b6d4);
          }
        }
      }

      .data-value {
        font-size: 28rpx;
        font-weight: 600;
        color: $text-primary;
        margin-top: 8rpx;
        font-family: 'Courier New', monospace;
      }
    }
  }

  // 底部
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .update-time {
      display: flex;
      align-items: center;
      gap: 8rpx;
      font-size: 22rpx;
      color: $text-secondary;
    }

    .card-actions {
      display: flex;
      gap: 16rpx;

      .action-btn {
        width: 72rpx;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: none;
        font-size: 28rpx;
        transition: all 0.3s;
        padding: 0;

        &::after {
          display: none;
        }

        &.start {
          background: rgba($success, 0.15);
          color: $success;
          border: 2rpx solid rgba($success, 0.3);

          &:active:not([disabled]) {
            background: rgba($success, 0.3);
            transform: scale(0.9);
          }
        }

        &.stop {
          background: rgba($danger, 0.15);
          color: $danger;
          border: 2rpx solid rgba($danger, 0.3);

          &:active:not([disabled]) {
            background: rgba($danger, 0.3);
            transform: scale(0.9);
          }
        }

        &[disabled] {
          opacity: 0.3;
        }
      }
    }
  }

  // 边框
  .card-border {
    position: absolute;
    inset: 0;
    border: 1rpx solid $border-color;
    border-radius: 20rpx;
    pointer-events: none;
    transition: all 0.3s;
  }

  // 交互效果
  &:active {
    .card-bg .card-grid {
      opacity: 1;
    }
    .card-border {
      border-color: rgba($primary, 0.5);
    }
    .card-content {
      transform: scale(0.98);
    }
  }
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ringPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
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

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;

  .empty-icon {
    color: rgba($primary, 0.3);
    margin-bottom: 30rpx;
  }

  .empty-text {
    font-size: 32rpx;
    color: $text-primary;
    margin-bottom: 12rpx;
  }

  .empty-hint {
    font-size: 26rpx;
    color: $text-secondary;
  }
}

// 底部操作栏
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx 40rpx;
  background: linear-gradient(180deg, transparent, $bg-dark 30%);
  z-index: 100;

  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    height: 88rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
    border: none;

    &::after {
      display: none;
    }

    &.logout {
      background: rgba(255, 255, 255, 0.05);
      border: 1rpx solid rgba(255, 255, 255, 0.1);
      color: $text-secondary;

      &:active {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
