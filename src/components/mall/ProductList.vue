<template>
  <div class="product-list" :style="gridStyle">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="product-list__item"
      @click="$emit('product-click', product)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Number,
    default: 2
  },
  gap: {
    type: Number,
    default: 8
  }
});

const gridStyle = computed(() => ({
  '--columns': props.columns,
  '--gap': `${props.gap}px`
}));

defineEmits(['product-click']);
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
  padding: var(--gap);
  
  &__item {
    width: 100%;
  }
}
</style>