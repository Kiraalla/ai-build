<template>
  <div
    class="base-switch"
    :class="[
      `base-switch--${size}`,
      {
        'base-switch--checked': modelValue,
        'base-switch--disabled': disabled
      }
    ]"
    @click="handleClick"
    :style="{
      '--color': activeColor,
      '--inactive-color': inactiveColor
    }"
  >
    <span class="base-switch__core">
      <span class="base-switch__button"></span>
    </span>
    <span v-if="activeText || inactiveText" class="base-switch__label">
      {{ modelValue ? activeText : inactiveText }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
  },
  activeColor: {
    type: String,
    default: '#409eff'
  },
  inactiveColor: {
    type: String,
    default: '#dcdfe6'
  },
  activeText: {
    type: String,
    default: ''
  },
  inactiveText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleClick = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="scss" scoped>
.base-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  
  &__core {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--inactive-color);
    transition: background-color 0.3s;
    vertical-align: middle;
  }

  &__button {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }

  &__label {
    margin-left: 8px;
    font-size: 14px;
    color: #606266;
  }

  &--checked {
    .base-switch__core {
      background-color: var(--color);
    }

    .base-switch__button {
      transform: translateX(20px);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--large {
    .base-switch__core {
      width: 48px;
      height: 24px;
    }

    .base-switch__button {
      width: 22px;
      height: 22px;
    }

    &.base-switch--checked .base-switch__button {
      transform: translateX(24px);
    }

    .base-switch__label {
      font-size: 16px;
    }
  }

  &--small {
    .base-switch__core {
      width: 32px;
      height: 16px;
    }

    .base-switch__button {
      width: 14px;
      height: 14px;
    }

    &.base-switch--checked .base-switch__button {
      transform: translateX(16px);
    }

    .base-switch__label {
      font-size: 13px;
    }
  }

  &--mini {
    .base-switch__core {
      width: 28px;
      height: 14px;
    }

    .base-switch__button {
      width: 12px;
      height: 12px;
    }

    &.base-switch--checked .base-switch__button {
      transform: translateX(14px);
    }

    .base-switch__label {
      font-size: 12px;
    }
  }
}
</style>