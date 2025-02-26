<template>
  <teleport to="body">
    <div v-if="modelValue" class="bottom-sheet">
      <div class="bottom-sheet__mask" @click="handleClose"></div>
      <div class="bottom-sheet__wrapper" :style="wrapperStyle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
        <div class="bottom-sheet__header">
          <div class="bottom-sheet__indicator"></div>
          <slot name="header">
            <h3 class="bottom-sheet__title">{{ title }}</h3>
          </slot>
        </div>
        <div class="bottom-sheet__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '50%'
  }
});

const emit = defineEmits(['update:modelValue']);

const startY = ref(0);
const currentY = ref(0);
const isDragging = ref(false);

const wrapperStyle = computed(() => ({
  height: props.height,
  transform: `translateY(${currentY.value}px)`
}));

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY;
  isDragging.value = true;
};

const onTouchMove = (e) => {
  if (!isDragging.value) return;
  
  const deltaY = e.touches[0].clientY - startY.value;
  if (deltaY > 0) {
    currentY.value = deltaY;
  }
};

const onTouchEnd = () => {
  if (!isDragging.value) return;
  
  const threshold = 100;
  if (currentY.value > threshold) {
    handleClose();
  } else {
    currentY.value = 0;
  }
  
  isDragging.value = false;
};

const handleClose = () => {
  emit('update:modelValue', false);
  currentY.value = 0;
};
</script>

<style lang="scss" scoped>
.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  
  &__mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    animation: fade-in 0.3s;
  }
  
  &__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    transition: transform 0.3s;
    will-change: transform;
    animation: slide-up 0.3s;
  }
  
  &__header {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  
  &__indicator {
    width: 40px;
    height: 4px;
    background-color: #ddd;
    border-radius: 2px;
    margin: 0 auto 12px;
  }
  
  &__title {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  &__content {
    padding: 16px;
    max-height: 70vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>