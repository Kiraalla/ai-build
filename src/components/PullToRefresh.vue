<template>
  <div class="pull-to-refresh" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="pull-to-refresh__indicator" :style="indicatorStyle">
      <span v-if="!refreshing">{{ pullText }}</span>
      <span v-else class="pull-to-refresh__loading">刷新中...</span>
    </div>
    <div class="pull-to-refresh__content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  threshold: {
    type: Number,
    default: 60
  },
  maxDistance: {
    type: Number,
    default: 100
  }
});

const emit = defineEmits(['refresh']);

const distance = ref(0);
const refreshing = ref(false);
const startY = ref(0);

const pullText = computed(() => {
  if (distance.value >= props.threshold) {
    return '释放刷新';
  }
  return '下拉刷新';
});

const indicatorStyle = computed(() => ({
  height: `${props.threshold}px`,
  transform: `translate3d(0, ${distance.value - props.threshold}px, 0)`
}));

const contentStyle = computed(() => ({
  transform: `translate3d(0, ${distance.value}px, 0)`
}));

const onTouchStart = (e) => {
  if (refreshing.value) return;
  startY.value = e.touches[0].clientY;
};

const onTouchMove = (e) => {
  if (refreshing.value) return;
  
  const currentY = e.touches[0].clientY;
  const diff = currentY - startY.value;
  
  if (diff > 0) {
    e.preventDefault();
    distance.value = Math.min(diff * 0.5, props.maxDistance);
  }
};

const onTouchEnd = () => {
  if (refreshing.value) return;
  
  if (distance.value >= props.threshold) {
    refresh();
  } else {
    reset();
  }
};

const refresh = () => {
  refreshing.value = true;
  distance.value = props.threshold;
  emit('refresh', () => {
    refreshing.value = false;
    reset();
  });
};

const reset = () => {
  distance.value = 0;
};
</script>

<style lang="scss" scoped>
.pull-to-refresh {
  position: relative;
  overflow: hidden;
  
  &__indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
  
  &__content {
    transition: transform 0.2s;
    will-change: transform;
  }
  
  &__loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #666;
    border-top-color: transparent;
    border-radius: 50%;
    animation: pull-to-refresh-spin 0.6s linear infinite;
  }
}

@keyframes pull-to-refresh-spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>