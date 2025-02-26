<template>
  <div
    class="base-input"
    :class="[
      `base-input--${size}`,
      {
        'base-input--disabled': disabled,
        'base-input--error': error,
        'base-input--success': success
      }
    ]"
  >
    <div class="base-input__prefix" v-if="$slots.prefix || prefixIcon">
      <slot name="prefix"></slot>
      <i v-if="prefixIcon" :class="prefixIcon" class="base-input__icon"></i>
    </div>
    <input
      ref="input"
      :type="type"
      class="base-input__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <div class="base-input__suffix" v-if="$slots.suffix || suffixIcon || clearable">
      <i
        v-if="clearable && modelValue"
        class="base-input__clear-icon"
        @click="handleClear"
      >×</i>
      <slot name="suffix"></slot>
      <i v-if="suffixIcon" :class="suffixIcon" class="base-input__icon"></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  error: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'])
const input = ref(null)

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (event) => {
  emit('change', event.target.value)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  input.value?.focus()
}
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  display: inline-flex;
  width: 100%;
  line-height: 1;
  
  &__inner {
    flex: 1;
    width: 100%;
    padding: 0 12px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s;
    outline: none;
    
    &:focus {
      border-color: #409eff;
    }
    
    &::placeholder {
      color: #c0c4cc;
    }
  }
  
  &--large {
    font-size: 16px;
    .base-input__inner {
      height: 40px;
    }
  }
  
  &--medium {
    font-size: 14px;
    .base-input__inner {
      height: 36px;
    }
  }
  
  &--small {
    font-size: 13px;
    .base-input__inner {
      height: 32px;
    }
  }
  
  &--mini {
    font-size: 12px;
    .base-input__inner {
      height: 28px;
    }
  }
  
  &--disabled {
    .base-input__inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  
  &--error {
    .base-input__inner {
      border-color: #f56c6c;
      
      &:focus {
        border-color: #f56c6c;
      }
    }
  }
  
  &--success {
    .base-input__inner {
      border-color: #67c23a;
      
      &:focus {
        border-color: #67c23a;
      }
    }
  }
  
  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    color: #c0c4cc;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  
  &__prefix {
    left: 0;
  }
  
  &__suffix {
    right: 0;
  }
  
  &__icon {
    font-size: 14px;
  }
  
  &__clear-icon {
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      color: #909399;
    }
  }
}
</style>