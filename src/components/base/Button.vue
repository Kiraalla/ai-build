<template>
  <button
    class="base-button"
    :class="[
      `base-button--${type}`,
      `base-button--${size}`,
      { 'base-button--round': round },
      { 'base-button--plain': plain },
      { 'base-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <i v-if="loading" class="base-button__loading"></i>
    <i v-if="icon" class="base-button__icon" :class="icon"></i>
    <span v-if="$slots.default" class="base-button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default',
      'primary',
      'success',
      'warning',
      'danger'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => [
      'large',
      'medium',
      'small',
      'mini'
    ].includes(value)
  },
  round: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.loading || props.disabled) return
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  user-select: none;
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;

  &--large {
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 4px;
  }

  &--medium {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 4px;
  }

  &--small {
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 3px;
  }

  &--mini {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 3px;
  }

  &--default {
    color: #606266;
    background: #fff;
    border-color: #dcdfe6;

    &:hover,
    &:focus {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }

  &--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover,
    &:focus {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }

  &--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;

    &:hover,
    &:focus {
      background: #85ce61;
      border-color: #85ce61;
    }
  }

  &--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;

    &:hover,
    &:focus {
      background: #ebb563;
      border-color: #ebb563;
    }
  }

  &--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;

    &:hover,
    &:focus {
      background: #f78989;
      border-color: #f78989;
    }
  }

  &--plain {
    &.base-button--primary {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }

    &.base-button--success {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #c2e7b0;
    }

    &.base-button--warning {
      color: #e6a23c;
      background: #fdf6ec;
      border-color: #f5dab1;
    }

    &.base-button--danger {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
    }
  }

  &--round {
    border-radius: 20px;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &__loading {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-right-color: transparent;
    animation: button-loading 1s linear infinite;
    margin-right: 5px;
  }

  &__icon {
    margin-right: 5px;
  }
}

@keyframes button-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>