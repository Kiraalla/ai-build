<template>
  <transition name="base-tag-fade">
    <span
      v-if="!closed"
      class="base-tag"
      :class="[
        `base-tag--${type}`,
        `base-tag--${size}`,
        { 'base-tag--plain': plain },
        { 'base-tag--round': round },
        { 'base-tag--closable': closable }
      ]"
    >
      <slot></slot>
      <i
        v-if="closable"
        class="base-tag__close"
        @click.stop="handleClose"
      >×</i>
    </span>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default',
      'primary',
      'success',
      'warning',
      'danger',
      'info'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const closed = ref(false)

const handleClose = (event) => {
  closed.value = true
  emit('close', event)
}
</script>

<style lang="scss" scoped>
.base-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 1;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  
  &--large {
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
  }
  
  &--small {
    height: 20px;
    padding: 0 6px;
    font-size: 11px;
  }
  
  &--mini {
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
  }
  
  &--default {
    background-color: #f4f4f5;
    color: #909399;
    border-color: #e9e9eb;
  }
  
  &--primary {
    background-color: #ecf5ff;
    color: #409eff;
    border-color: #d9ecff;
  }
  
  &--success {
    background-color: #f0f9eb;
    color: #67c23a;
    border-color: #e1f3d8;
  }
  
  &--warning {
    background-color: #fdf6ec;
    color: #e6a23c;
    border-color: #faecd8;
  }
  
  &--danger {
    background-color: #fef0f0;
    color: #f56c6c;
    border-color: #fde2e2;
  }
  
  &--info {
    background-color: #f4f4f5;
    color: #909399;
    border-color: #e9e9eb;
  }
  
  &--plain {
    background-color: transparent;
    
    &.base-tag--primary {
      color: #409eff;
      border-color: #409eff;
    }
    
    &.base-tag--success {
      color: #67c23a;
      border-color: #67c23a;
    }
    
    &.base-tag--warning {
      color: #e6a23c;
      border-color: #e6a23c;
    }
    
    &.base-tag--danger {
      color: #f56c6c;
      border-color: #f56c6c;
    }
    
    &.base-tag--info {
      color: #909399;
      border-color: #909399;
    }
  }
  
  &--round {
    border-radius: 12px;
  }
  
  &--closable {
    padding-right: 4px;
  }
  
  &__close {
    margin-left: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
      color: #909399;
    }
  }
}

.base-tag-fade-enter-active,
.base-tag-fade-leave-active {
  transition: all 0.3s;
}

.base-tag-fade-enter-from,
.base-tag-fade-leave-to {
  opacity: 0;
  transform: scaleX(0);
}
</style>