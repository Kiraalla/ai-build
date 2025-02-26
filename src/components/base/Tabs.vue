<template>
  <div class="base-tabs">
    <div
      class="base-tabs__nav"
      :class="[
        `base-tabs__nav--${type}`,
        { 'base-tabs__nav--card': type === 'card' }
      ]"
    >
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="base-tabs__item"
        :class="{
          'base-tabs__item--active': modelValue === tab.name,
          'base-tabs__item--disabled': tab.disabled
        }"
        @click="handleClick(tab)"
      >
        <i v-if="tab.icon" :class="tab.icon" class="base-tabs__icon"></i>
        <span>{{ tab.label }}</span>
        <i
          v-if="closable && !tab.disabled"
          class="base-tabs__close"
          @click.stop="handleClose(tab)"
        >×</i>
      </div>
    </div>
    <div class="base-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  tabs: {
    type: Array,
    default: () => [],
    validator: (tabs) => tabs.every(tab => tab.name && tab.label)
  },
  type: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'card'].includes(value)
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'tab-click', 'tab-remove'])

const handleClick = (tab) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('tab-click', tab)
}

const handleClose = (tab) => {
  emit('tab-remove', tab)
}
</script>

<style lang="scss" scoped>
.base-tabs {
  &__nav {
    position: relative;
    margin-bottom: 15px;
    border-bottom: 2px solid #e4e7ed;
    
    &--card {
      border-bottom: none;
      
      .base-tabs__item {
        border: 1px solid #dcdfe6;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        margin-right: 4px;
        background: #f5f7fa;
        transition: all 0.3s;
        
        &--active {
          background: #fff;
          border-bottom-color: #fff;
          transform: translateY(1px);
        }
      }
    }
  }
  
  &__item {
    display: inline-flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    font-size: 14px;
    color: #303133;
    
    &:hover {
      color: #409eff;
    }
    
    &--active {
      color: #409eff;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #409eff;
      }
    }
    
    &--disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      
      &:hover {
        color: #c0c4cc;
      }
    }
  }
  
  &__icon {
    margin-right: 5px;
  }
  
  &__close {
    margin-left: 8px;
    font-size: 12px;
    
    &:hover {
      color: #f56c6c;
    }
  }
  
  &__content {
    position: relative;
  }
}
</style>