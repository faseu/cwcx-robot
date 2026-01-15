<script lang="ts" setup>
import { useDeviceStore } from '@/store/device'

defineOptions({
  name: 'Login',
})

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
})

const deviceStore = useDeviceStore()

// MQTT 配置
const mqttConfig = ref({
  broker: '47.110.70.31',
  wsPort: 8083,
  username: 'web',
  password: 'web12345678.',
})

// 加载状态
const loading = ref(false)
const showAdvanced = ref(false)

// 连接状态
const connectionStatus = computed(() => deviceStore.connectionStatus)
const isConnected = computed(() => connectionStatus.value === 'connected')

// 动画状态
const mounted = ref(false)
onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})

/** 连接 MQTT */
async function handleConnect() {
  if (loading.value)
    return

  loading.value = true
  try {
    await deviceStore.connect()
    uni.showToast({
      title: '连接成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/device/list',
      })
    }, 500)
  }
  catch (err) {
    console.error('连接失败:', err)
    uni.showToast({
      title: '连接失败',
      icon: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

/** 断开连接 */
async function handleDisconnect() {
  await deviceStore.disconnect()
  uni.showToast({
    title: '已断开连接',
    icon: 'none',
  })
}

/** 跳转到设备列表 */
function goToDeviceList() {
  uni.redirectTo({
    url: '/pages/device/list',
  })
}

/** 获取状态文本 */
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    disconnected: '未连接',
    connecting: '连接中...',
    connected: '已连接',
    error: '连接错误',
  }
  return statusMap[status] || '未知'
}
</script>

<template>
  <view class="login-page">
    <!-- 动态背景 -->
    <view class="bg-container">
      <!-- 网格背景 -->
      <view class="grid-bg" />
      <!-- 渐变光晕 -->
      <view class="glow glow-1" />
      <view class="glow glow-2" />
      <view class="glow glow-3" />
      <!-- 浮动粒子 -->
      <view class="particles">
        <view v-for="i in 20" :key="i" class="particle" :class="`particle-${i}`" />
      </view>
      <!-- 扫描线 -->
      <view class="scan-line" />
    </view>

    <!-- 主内容 -->
    <view class="content" :class="{ 'content-visible': mounted }">
      <!-- Logo 区域 -->
      <view class="logo-section">
        <view class="logo-container">
          <view class="logo-ring ring-1" />
          <view class="logo-ring ring-2" />
          <view class="logo-ring ring-3" />
          <view class="logo-icon">
            <text class="i-carbon-bot text-80rpx" />
          </view>
        </view>
        <view class="logo-title">
          <text class="title-text">ROBOT</text>
          <text class="title-sub">CONTROL CENTER</text>
        </view>
        <view class="logo-desc">
          智能机器人远程控制系统
        </view>
      </view>

      <!-- 状态指示器 -->
      <view class="status-indicator">
        <view class="status-dot" :class="connectionStatus" />
        <view class="status-text">
          {{ getStatusText(connectionStatus) }}
        </view>
        <view v-if="connectionStatus === 'connected'" class="status-pulse" />
      </view>

      <!-- 配置面板 -->
      <view class="config-panel" :class="{ expanded: showAdvanced }">
        <view class="panel-header" @click="showAdvanced = !showAdvanced">
          <view class="panel-title">
            <text class="i-carbon-settings-adjust" />
            <text>连接配置</text>
          </view>
          <view class="panel-arrow" :class="{ rotated: showAdvanced }">
            <text class="i-carbon-chevron-down" />
          </view>
        </view>

        <view v-show="showAdvanced" class="panel-body">
          <view class="form-group">
            <view class="form-label">
              <text class="i-carbon-server" />
              服务器地址
            </view>
            <view class="form-input-wrapper">
              <input
                v-model="mqttConfig.broker"
                class="form-input"
                placeholder="MQTT Broker"
              >
              <view class="input-glow" />
            </view>
          </view>

          <view class="form-group">
            <view class="form-label">
              <text class="i-carbon-port-input" />
              WebSocket 端口
            </view>
            <view class="form-input-wrapper">
              <input
                v-model.number="mqttConfig.wsPort"
                class="form-input"
                type="number"
                placeholder="端口"
              >
              <view class="input-glow" />
            </view>
          </view>

          <view class="form-row">
            <view class="form-group half">
              <view class="form-label">
                <text class="i-carbon-user" />
                用户名
              </view>
              <view class="form-input-wrapper">
                <input
                  v-model="mqttConfig.username"
                  class="form-input"
                  placeholder="用户名"
                >
                <view class="input-glow" />
              </view>
            </view>

            <view class="form-group half">
              <view class="form-label">
                <text class="i-carbon-password" />
                密码
              </view>
              <view class="form-input-wrapper">
                <input
                  v-model="mqttConfig.password"
                  class="form-input"
                  password
                  placeholder="密码"
                >
                <view class="input-glow" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-section">
        <template v-if="!isConnected">
          <button
            class="cyber-btn primary"
            :class="{ loading }"
            :disabled="loading"
            @click="handleConnect"
          >
            <view class="btn-bg" />
            <view class="btn-glow" />
            <view class="btn-content">
              <text v-if="!loading" class="i-carbon-connection-signal" />
              <view v-else class="btn-loader" />
              <text>{{ loading ? '连接中' : '连接系统' }}</text>
            </view>
            <view class="btn-border" />
          </button>
        </template>

        <template v-else>
          <button class="cyber-btn success" @click="goToDeviceList">
            <view class="btn-bg" />
            <view class="btn-glow" />
            <view class="btn-content">
              <text class="i-carbon-dashboard" />
              <text>进入控制台</text>
            </view>
            <view class="btn-border" />
          </button>

          <button class="cyber-btn outline" @click="handleDisconnect">
            <view class="btn-content">
              <text class="i-carbon-logout" />
              <text>断开连接</text>
            </view>
            <view class="btn-border" />
          </button>
        </template>
      </view>

      <!-- 底部信息 -->
      <view class="footer-info">
        <view class="tech-badge">
          <text class="i-carbon-chip" />
          <text>MQTT 3.1.1</text>
        </view>
        <view class="tech-badge">
          <text class="i-carbon-wireless-checkout" />
          <text>WebSocket</text>
        </view>
        <view class="tech-badge">
          <text class="i-carbon-security" />
          <text>Secure</text>
        </view>
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
$bg-card: rgba(16, 24, 40, 0.8);
$border-color: rgba(0, 212, 255, 0.2);
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.6);

.login-page {
  min-height: 100vh;
  background: $bg-dark;
  position: relative;
  overflow: hidden;
}

// 背景容器
.bg-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

// 网格背景
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

// 光晕效果
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: glowPulse 8s ease-in-out infinite;

  &.glow-1 {
    width: 400rpx;
    height: 400rpx;
    background: $primary;
    top: -100rpx;
    right: -100rpx;
    animation-delay: 0s;
  }

  &.glow-2 {
    width: 300rpx;
    height: 300rpx;
    background: $secondary;
    bottom: 200rpx;
    left: -150rpx;
    animation-delay: 2s;
  }

  &.glow-3 {
    width: 250rpx;
    height: 250rpx;
    background: $success;
    bottom: -100rpx;
    right: 100rpx;
    animation-delay: 4s;
    opacity: 0.3;
  }
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

// 粒子效果
.particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  width: 4rpx;
  height: 4rpx;
  background: $primary;
  border-radius: 50%;
  opacity: 0.6;
  animation: particleFloat 15s linear infinite;

  @for $i from 1 through 20 {
    &.particle-#{$i} {
      left: random(100) * 1%;
      top: random(100) * 1%;
      animation-delay: random(15) * -1s;
      animation-duration: 10s + random(10) * 1s;
      width: (2 + random(4)) * 1rpx;
      height: (2 + random(4)) * 1rpx;
    }
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

// 扫描线
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, $primary, transparent);
  animation: scanMove 4s linear infinite;
  opacity: 0.5;
}

@keyframes scanMove {
  0% {
    top: -10%;
  }
  100% {
    top: 110%;
  }
}

// 主内容
.content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: 80rpx 40rpx 60rpx;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(40rpx);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  &.content-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Logo 区域
.logo-section {
  text-align: center;
  margin-bottom: 60rpx;

  .logo-container {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto 40rpx;
  }

  .logo-ring {
    position: absolute;
    border-radius: 50%;
    border: 2rpx solid transparent;

    &.ring-1 {
      inset: 0;
      border-color: rgba($primary, 0.3);
      animation: ringRotate 10s linear infinite;
    }

    &.ring-2 {
      inset: 15rpx;
      border-color: rgba($primary, 0.5);
      border-style: dashed;
      animation: ringRotate 8s linear infinite reverse;
    }

    &.ring-3 {
      inset: 30rpx;
      border-color: $primary;
      animation: ringPulse 2s ease-in-out infinite;
    }
  }

  .logo-icon {
    position: absolute;
    inset: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($primary, 0.2), rgba($secondary, 0.2));
    border-radius: 50%;
    color: $primary;
    text-shadow: 0 0 20rpx $primary;
    animation: iconGlow 2s ease-in-out infinite;
  }

  .logo-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .title-text {
      font-size: 56rpx;
      font-weight: 900;
      letter-spacing: 12rpx;
      background: linear-gradient(135deg, $primary, $secondary);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      text-shadow: 0 0 40rpx rgba($primary, 0.5);
    }

    .title-sub {
      font-size: 24rpx;
      letter-spacing: 8rpx;
      color: $text-secondary;
    }
  }

  .logo-desc {
    margin-top: 20rpx;
    font-size: 26rpx;
    color: $text-secondary;
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

@keyframes ringPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes iconGlow {
  0%,
  100% {
    filter: drop-shadow(0 0 10rpx $primary);
  }
  50% {
    filter: drop-shadow(0 0 20rpx $primary);
  }
}

// 状态指示器
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 40rpx;
  padding: 20rpx 40rpx;
  background: $bg-card;
  border: 1rpx solid $border-color;
  border-radius: 50rpx;
  backdrop-filter: blur(10px);
  align-self: center;
  position: relative;
  overflow: hidden;

  .status-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background: $text-secondary;
    transition: all 0.3s;

    &.disconnected {
      background: $text-secondary;
    }
    &.connecting {
      background: $warning;
      animation: statusBlink 1s infinite;
    }
    &.connected {
      background: $success;
      box-shadow: 0 0 10rpx $success;
    }
    &.error {
      background: $danger;
    }
  }

  .status-text {
    font-size: 26rpx;
    color: $text-primary;
    letter-spacing: 2rpx;
  }

  .status-pulse {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba($success, 0.1), transparent);
    animation: statusPulse 2s linear infinite;
  }
}

@keyframes statusBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes statusPulse {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

// 配置面板
.config-panel {
  background: $bg-card;
  border: 1rpx solid $border-color;
  border-radius: 24rpx;
  margin-bottom: 40rpx;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s;

  &.expanded {
    border-color: rgba($primary, 0.4);
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx;
    cursor: pointer;

    .panel-title {
      display: flex;
      align-items: center;
      gap: 16rpx;
      font-size: 28rpx;
      color: $text-primary;
    }

    .panel-arrow {
      color: $text-secondary;
      transition: transform 0.3s;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  .panel-body {
    padding: 0 30rpx 30rpx;
    border-top: 1rpx solid $border-color;
    animation: slideDown 0.3s ease-out;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-top: 30rpx;

  &.half {
    flex: 1;
  }

  .form-label {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 24rpx;
    color: $text-secondary;
    margin-bottom: 16rpx;
  }
}

.form-row {
  display: flex;
  gap: 20rpx;
}

.form-input-wrapper {
  position: relative;

  .form-input {
    width: 100%;
    height: 88rpx;
    padding: 0 30rpx;
    background: rgba(0, 0, 0, 0.3);
    border: 1rpx solid $border-color;
    border-radius: 16rpx;
    font-size: 28rpx;
    color: $text-primary;
    transition: all 0.3s;
    box-sizing: border-box;

    &:focus {
      border-color: $primary;
      background: rgba($primary, 0.05);

      & + .input-glow {
        opacity: 1;
      }
    }
  }

  .input-glow {
    position: absolute;
    inset: -2rpx;
    border-radius: 18rpx;
    background: linear-gradient(135deg, $primary, $secondary);
    opacity: 0;
    z-index: -1;
    filter: blur(8rpx);
    transition: opacity 0.3s;
  }
}

// 操作按钮
.action-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: auto;
  padding-top: 40rpx;
}

.cyber-btn {
  position: relative;
  height: 100rpx;
  border: none;
  border-radius: 16rpx;
  overflow: hidden;
  background: transparent;
  padding: 0;

  &::after {
    display: none;
  }

  .btn-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba($primary, 0.2), rgba($secondary, 0.2));
    transition: all 0.3s;
  }

  .btn-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba($primary, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    height: 100%;
    font-size: 30rpx;
    font-weight: 600;
    color: $text-primary;
    letter-spacing: 4rpx;
  }

  .btn-border {
    position: absolute;
    inset: 0;
    border: 2rpx solid $primary;
    border-radius: 16rpx;
    opacity: 0.5;
    transition: all 0.3s;
  }

  .btn-loader {
    width: 36rpx;
    height: 36rpx;
    border: 3rpx solid rgba($primary, 0.3);
    border-top-color: $primary;
    border-radius: 50%;
    animation: btnSpin 1s linear infinite;
  }

  &:active:not([disabled]) {
    transform: scale(0.98);

    .btn-glow {
      transform: translateX(100%);
    }

    .btn-border {
      opacity: 1;
    }
  }

  &[disabled] {
    opacity: 0.5;
  }

  &.primary {
    .btn-bg {
      background: linear-gradient(135deg, rgba($primary, 0.3), rgba($primary-dark, 0.3));
    }
    .btn-border {
      border-color: $primary;
    }
  }

  &.success {
    .btn-bg {
      background: linear-gradient(135deg, rgba($success, 0.3), rgba($success, 0.1));
    }
    .btn-border {
      border-color: $success;
    }
    .btn-content {
      color: $success;
    }
    .btn-glow {
      background: linear-gradient(90deg, transparent, rgba($success, 0.3), transparent);
    }
  }

  &.outline {
    .btn-bg {
      background: transparent;
    }
    .btn-border {
      border-color: $text-secondary;
      opacity: 0.3;
    }
    .btn-content {
      color: $text-secondary;
    }
  }

  &.loading {
    .btn-glow {
      animation: btnGlowMove 1.5s linear infinite;
    }
  }
}

@keyframes btnSpin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes btnGlowMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// 底部信息
.footer-info {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-top: 60rpx;
  flex-wrap: wrap;

  .tech-badge {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 12rpx 24rpx;
    background: rgba($primary, 0.1);
    border: 1rpx solid rgba($primary, 0.2);
    border-radius: 8rpx;
    font-size: 22rpx;
    color: $text-secondary;
  }
}
</style>
