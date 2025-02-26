<template>
  <div
    class="base-progress"
    :class="[
      `base-progress--${type}`,
      `base-progress--${size}`,
      { 'base-progress--striped': striped },
      { 'base-progress--active': active }
    ]"
  >
    <div class="base-progress__outer">
      <div
        class="base-progress__inner"
        :style="{
          width: `${percentage}%`,
          backgroundColor: color
        }"
      >
        <div
          v-if="striped"
          class="base-progress__stripe"
        ></div>
      </div>
    </div>
    <div
      v-if="showText"
      class="base-progress__text"
      :style="{ color: textColor }"
    >
      <slot>
        <span>{{ percentage }}%</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  type: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'circle'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value)
  },
  color: {
    type: String,
    default: '#409eff'
  },
  textColor: {
    type: String,
    default: '#606266'
  },
  striped: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.base-progress {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  
  &__outer {
    flex: 1;
    background-color: #ebeef5;
    border-radius: 100px;
    overflow: hidden;
  }
  
  &__inner {
    position: relative;
    height: 100%;
    text-align: right;
    background-color: #409eff;
    border-radius: 100px;
    transition: width 0.6s ease;
  }
  
  &__text {
    margin-left: 8px;
    min-width: 50px;
    font-size: 14px;
    color: #606266;
  }
  
  &__stripe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
  }
  
  &--active {
    .base-progress__stripe {
      animation: progress-stripe 2s linear infinite;
    }
  }
  
  &--large {
    .base-progress__outer {
      height: 16px;
    }
    .base-progress__text {
      font-size: 16px;
    }
  }
  
  &--medium {
    .base-progress__outer {
      height: 12px;
    }
    .base-progress__text {
      font-size: 14px;
    }
  }
  
  &--small {
    .base-progress__outer {
      height: 8px;
    }
    .base-progress__text {
      font-size: 12px;
    }
  }
  
  &--mini {
    .base-progress__outer {
      height: 4px;
    }
    .base-progress__text {
      font-size: 12px;
    }
  }
}

@keyframes progress-stripe {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
}
</style>