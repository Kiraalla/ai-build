<template>
  <transition name="base-dialog-fade">
    <div
      v-show="modelValue"
      class="base-dialog__wrapper"
      @click.self="handleWrapperClick"
    >
      <div
        class="base-dialog"
        :class="[
          `base-dialog--${size}`,
          { 'base-dialog--center': center }
        ]"
        :style="{ width: width }"
      >
        <div class="base-dialog__header">
          <slot name="title">
            <span class="base-dialog__title">{{ title }}</span>
          </slot>
          <button
            v-if="showClose"
            class="base-dialog__close"
            @click="handleClose"
          >×</button>
        </div>
        <div class="base-dialog__body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="base-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  },
  width: {
    type: String,
    default: '50%'
  },
  center: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleWrapperClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}
</script>

<style lang="scss" scoped>
.base-dialog {
  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
  }

  position: relative;
  margin: 15vh auto 50px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;

  &--large {
    max-width: 800px;
  }

  &--medium {
    max-width: 600px;
  }

  &--small {
    max-width: 400px;
  }

  &--center {
    text-align: center;

    .base-dialog__footer {
      justify-content: center;
    }
  }

  &__header {
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    color: #909399;

    &:hover {
      color: #409eff;
    }
  }

  &__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  &__footer {
    padding: 20px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}

.base-dialog-fade-enter-active,
.base-dialog-fade-leave-active {
  transition: all 0.3s;
}

.base-dialog-fade-enter-from,
.base-dialog-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>