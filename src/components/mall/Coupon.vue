<template>
  <div 
    :class="[
      'coupon',
      `coupon--${status}`,
      { 'coupon--selected': selected }
    ]"
    @click="$emit('click')"
  >
    <div class="coupon__left">
      <div class="coupon__amount">
        <span class="coupon__currency" v-if="type === 'discount'">¥</span>
        <span class="coupon__value">{{ formattedValue }}</span>
        <span class="coupon__unit" v-if="type === 'percent'">折</span>
      </div>
      <div class="coupon__condition" v-if="condition">
        满{{ condition }}元可用
      </div>
    </div>
    
    <div class="coupon__right">
      <div class="coupon__title">{{ title }}</div>
      <div class="coupon__date">{{ validTimeText }}</div>
      <div class="coupon__desc" v-if="description">{{ description }}</div>
      
      <button 
        v-if="status === 'unused'"
        class="coupon__btn"
        @click.stop="$emit('use')"
      >立即使用</button>
    </div>
    
    <div class="coupon__stamp" v-if="status !== 'unused'">
      {{ statusText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'discount',
    validator: (value) => ['discount', 'percent'].includes(value)
  },
  value: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  condition: {
    type: Number,
    default: 0
  },
  description: String,
  startTime: {
    type: [Date, String],
    default: () => new Date()
  },
  endTime: {
    type: [Date, String],
    required: true
  },
  status: {
    type: String,
    default: 'unused',
    validator: (value) => ['unused', 'used', 'expired'].includes(value)
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const formattedValue = computed(() => {
  if (props.type === 'discount') {
    return props.value.toFixed(0);
  } else {
    return (props.value * 10).toFixed(1);
  }
});

const validTimeText = computed(() => {
  const start = new Date(props.startTime);
  const end = new Date(props.endTime);
  return `${start.getMonth() + 1}.${start.getDate()}-${end.getMonth() + 1}.${end.getDate()}`;
});

const statusText = computed(() => {
  const statusMap = {
    used: '已使用',
    expired: '已过期'
  };
  return statusMap[props.status] || '';
});

defineEmits(['click', 'use']);
</script>

<style lang="scss" scoped>
.coupon {
  position: relative;
  display: flex;
  width: 100%;
  height: 88px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  
  &::before {
    content: '';
    position: absolute;
    left: 25%;
    top: -4px;
    bottom: -4px;
    width: 1px;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 4px,
      #eee 4px,
      #eee 8px
    );
  }
  
  &__left {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff5f5;
    color: #ff6b6b;
  }
  
  &__right {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
  
  &__amount {
    display: flex;
    align-items: baseline;
  }
  
  &__currency {
    font-size: 16px;
  }
  
  &__value {
    font-size: 32px;
    font-weight: bold;
    line-height: 1;
  }
  
  &__unit {
    font-size: 14px;
    margin-left: 2px;
  }
  
  &__condition {
    font-size: 12px;
    margin-top: 4px;
  }
  
  &__title {
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
  }
  
  &__date {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
  
  &__desc {
    font-size: 12px;
    color: #666;
    flex: 1;
  }
  
  &__btn {
    align-self: flex-start;
    padding: 4px 12px;
    border: 1px solid #ff6b6b;
    border-radius: 12px;
    color: #ff6b6b;
    font-size: 12px;
    background: transparent;
    cursor: pointer;
    
    &:hover {
      background: #fff5f5;
    }
  }
  
  &__stamp {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%) rotate(-30deg);
    font-size: 20px;
    color: #999;
    border: 2px solid #999;
    border-radius: 4px;
    padding: 4px 8px;
    opacity: 0.6;
  }
  
  &--used,
  &--expired {
    filter: grayscale(100%);
    
    .coupon__left {
      background: #f5f5f5;
      color: #999;
    }
  }
  
  &--selected {
    border: 2px solid #ff6b6b;
  }
}
</style>