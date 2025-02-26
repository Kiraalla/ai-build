<template>
  <div class="swipe-menu" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="swipe-menu__content" :style="contentStyle">
      <slot></slot>
    </div>
    <div class="swipe-menu__actions">
      <slot name="actions">
        <button class="swipe-menu__action swipe-menu__action--delete" @click="handleDelete">
          删除
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  threshold: {
    type: Number,
    default: 40
  },
  actionWidth: {
    type: Number,
    default: 80
  }
});

const emit = defineEmits(['delete']);

const startX = ref(0);
const currentX = ref(0);
const isOpen = ref(false);

const contentStyle = computed(() => ({
  transform: `translate3d(${-currentX.value}px, 0, 0)`
}));

const onTouchStart = (e) => {
  startX.value = e.touches[0].clientX;
};

const onTouchMove = (e) => {
  const deltaX = startX.value - e.touches[0].clientX;
  const newX = isOpen.value ? props.actionWidth + deltaX : deltaX;
  
  if (newX >= 0 && newX <= props.actionWidth) {
    currentX.value = newX;
  }
};

const onTouchEnd = () => {
  if (currentX.value > props.threshold) {
    currentX.value = props.actionWidth;
    isOpen.value = true;
  } else {
    currentX.value = 0;
    isOpen.value = false;
  }
};

const handleDelete = () => {
  emit('delete');
  currentX.value = 0;
  isOpen.value = false;
};
</script>

<style lang="scss" scoped>
.swipe-menu {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  
  &__content {
    position: relative;
    z-index: 1;
    background-color: #fff;
    transition: transform 0.3s;
    will-change: transform;
  }
  
  &__actions {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
  }
  
  &__action {
    height: 100%;
    border: none;
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
    
    &--delete {
      background-color: var(--danger);
      transition: background-color 0.3s, transform 0.2s;
      
      &:hover {
        background-color: var(--danger);
        transform: scale(1.05);
      }
    }
  }
}
</style>