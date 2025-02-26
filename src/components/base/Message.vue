<template>
  <transition name="base-message-fade">
    <div
      v-show="visible"
      class="base-message"
      :class="[
        `base-message--${type}`,
        { 'base-message--center': center }
      ]"
      role="alert"
    >
      <i v-if="icon" class="base-message__icon" :class="icon"></i>
      <div class="base-message__content">
        <slot>{{ message }}</slot>
      </div>
      <i
        v-if="showClose"
        class="base-message__close"
        @click="close"
      >×</i>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => [
      'success',
      'warning',
      'info',
      'error'
    ].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  showClose: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['destroy'])
const visible = ref(true)

let timer = null

const close = () => {
  visible.value = false
  if (timer) clearTimeout(timer)
  props.onClose()
  emit('destroy')
}

onMounted(() => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style lang="scss" scoped>
.base-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: all;
  z-index: 2000;
  
  &--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
  
  &--warning {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }
  
  &--info {
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #909399;
  }
  
  &--error {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
  }
  
  &--center {
    justify-content: center;
  }
  
  &__icon {
    margin-right: 8px;
    font-size: 16px;
  }
  
  &__content {
    font-size: 14px;
    line-height: 1;
  }
  
  &__close {
    margin-left: 8px;
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;
    
    &:hover {
      color: #909399;
    }
  }
}

.base-message-fade-enter-active,
.base-message-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.base-message-fade-enter-from,
.base-message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>