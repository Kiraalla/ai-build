<template>
  <div class="carousel" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="carousel__container" :style="containerStyle">
      <div v-for="(item, index) in items" :key="index" class="carousel__item">
        <img :src="item.image" :alt="item.title" class="carousel__image">
        <div class="carousel__caption" v-if="item.title">
          {{ item.title }}
        </div>
      </div>
    </div>
    
    <div class="carousel__indicators">
      <span 
        v-for="(_, index) in items" 
        :key="index"
        :class="['carousel__indicator', { 'carousel__indicator--active': currentIndex === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  }
});

const currentIndex = ref(0);
const startX = ref(0);
const currentX = ref(0);
let autoplayTimer = null;

const containerStyle = computed(() => ({
  transform: `translateX(${-currentIndex.value * 100 + currentX.value}%)`,
  width: `${props.items.length * 100}%`
}));

const onTouchStart = (e) => {
  startX.value = e.touches[0].clientX;
  stopAutoplay();
};

const onTouchMove = (e) => {
  const deltaX = e.touches[0].clientX - startX.value;
  const percentMove = (deltaX / window.innerWidth) * 100;
  currentX.value = percentMove;
};

const onTouchEnd = () => {
  const threshold = 20; // 滑动超过20%时切换
  
  if (Math.abs(currentX.value) > threshold) {
    if (currentX.value > 0 && currentIndex.value > 0) {
      currentIndex.value--;
    } else if (currentX.value < 0 && currentIndex.value < props.items.length - 1) {
      currentIndex.value++;
    }
  }
  
  currentX.value = 0;
  startAutoplay();
};

const goToSlide = (index) => {
  currentIndex.value = index;
  stopAutoplay();
  startAutoplay();
};

const startAutoplay = () => {
  if (props.autoplay && props.items.length > 1) {
    autoplayTimer = setInterval(() => {
      if (currentIndex.value < props.items.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    }, props.interval);
  }
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
  
  &__container {
    display: flex;
    transition: transform 0.3s ease-out;
  }
  
  &__item {
    flex: 0 0 100%;
    position: relative;
  }
  
  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  &__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background: var(--mask);
    color: var(--background);
    font-size: 14px;
  }
  
  &__indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }
  
  &__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--white-40);
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    
    &:hover {
      transform: scale(1.2);
    }
    
    &--active {
      background: var(--background);
    }
  }
}
</style>