<template>
  <label
    class="base-checkbox"
    :class="[
      `base-checkbox--${size}`,
      {
        'base-checkbox--disabled': disabled,
        'base-checkbox--checked': isChecked
      }
    ]"
  >
    <span class="base-checkbox__input">
      <input
        type="checkbox"
        :value="label"
        :name="name"
        :disabled="disabled"
        :true-value="trueValue"
        :false-value="falseValue"
        v-model="model"
        @change="handleChange"
      >
      <span class="base-checkbox__inner"></span>
    </span>
    <span class="base-checkbox__label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
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
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  color: {
    type: String,
    default: '#409eff'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.label)
  }
  return props.modelValue === props.trueValue
})

const handleChange = (event) => {
  emit('change', event.target.checked)
}
</script>

<style lang="scss" scoped>
.base-checkbox {
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
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    transition: border-color 0.25s, background-color 0.25s;

    &:after {
      content: "";
      position: absolute;
      left: 4px;
      top: 1px;
      width: 3px;
      height: 7px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) scale(0);
      transition: transform 0.15s ease-in;
    }
  }

  &__label {
    padding-left: 8px;
    font-size: 14px;
    color: #606266;
  }

  &--checked {
    .base-checkbox__inner {
      border-color: var(--color, #409eff);
      background: var(--color, #409eff);

      &:after {
        transform: rotate(45deg) scale(1);
      }
    }

    .base-checkbox__label {
      color: var(--color, #409eff);
    }
  }

  &--disabled {
    cursor: not-allowed;

    .base-checkbox__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;

      &:after {
        border-color: #c0c4cc;
      }
    }

    .base-checkbox__label {
      color: #c0c4cc;
    }

    &.base-checkbox--checked {
      .base-checkbox__inner {
        background-color: #f2f6fc;
      }
    }
  }

  &--large {
    .base-checkbox__label {
      font-size: 16px;
    }
    .base-checkbox__inner {
      width: 16px;
      height: 16px;
    }
  }

  &--small {
    .base-checkbox__label {
      font-size: 13px;
    }
    .base-checkbox__inner {
      width: 12px;
      height: 12px;
    }
  }

  &--mini {
    .base-checkbox__label {
      font-size: 12px;
    }
    .base-checkbox__inner {
      width: 10px;
      height: 10px;
    }
  }
}
</style>