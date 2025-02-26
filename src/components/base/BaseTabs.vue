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
defineProps({
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
    display: flex;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 15px;

    &--card {
      .base-tabs__item {
        border: 1px solid #e4e7ed;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        margin-right: 4px;
        background: #f5f7fa;

        &--active {
          background: #fff;
          border-bottom-color: #fff;
          color: #409eff;
        }
      }
    }
  }

  &__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    color: #303133;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }

    &--active {
      color: #409eff;

      &:not(.base-tabs__nav--card .base-tabs__item)::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #409eff;
      }
    }

    &--disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  &__icon {
    margin-right: 5px;
  }

  &__close {
    margin-left: 8px;
    font-size: 12px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;

    &:hover {
      background-color: #c0c4cc;
      color: #fff;
    }
  }

  &__content {
    position: relative;
  }
}
</style>