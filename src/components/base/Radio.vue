<template>
  <label
    class="base-radio"
    :class="[
      `base-radio--${size}`,
      {
        'base-radio--disabled': disabled,
        'base-radio--checked': modelValue === label
      }
    ]"
  >
    <span class="base-radio__input">
      <input
        type="radio"
        :value="label"
        :name="name"
        :disabled="disabled"
        v-model="modelValue"
        @change="handleChange"
      >
      <span class="base-radio__inner"></span>
    </span>
    <span class="base-radio__label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
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
  color: {
    type: String,
    default: '#409eff'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}
</script>

<style lang="scss" scoped>
.base-radio {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-right: 30px;
  
  &__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    position: relative;
    vertical-align: middle;

    input {
      position: absolute;
      opacity: 0;
      margin: 0;
    }
  }

  &__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    transition: border-color 0.25s;

    &:after {
      content: "";
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  &__label {
    padding-left: 8px;
    font-size: 14px;
    color: #606266;
  }

  &--checked {
    .base-radio__inner {
      border-color: var(--color, #409eff);
      background: var(--color, #409eff);

      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .base-radio__label {
      color: var(--color, #409eff);
    }
  }

  &--disabled {
    cursor: not-allowed;

    .base-radio__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;

      &:after {
        background-color: #c0c4cc;
      }
    }

    .base-radio__label {
      color: #c0c4cc;
    }

    &.base-radio--checked {
      .base-radio__inner {
        background-color: #f2f6fc;
      }
    }
  }

  &--large {
    .base-radio__label {
      font-size: 16px;
    }
    .base-radio__inner {
      width: 16px;
      height: 16px;
    }
  }

  &--small {
    .base-radio__label {
      font-size: 13px;
    }
    .base-radio__inner {
      width: 12px;
      height: 12px;
    }
  }

  &--mini {
    .base-radio__label {
      font-size: 12px;
    }
    .base-radio__inner {
      width: 10px;
      height: 10px;
    }
  }
}
</style>