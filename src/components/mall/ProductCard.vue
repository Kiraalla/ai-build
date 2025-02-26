<template>
  <div class="product-card" @click="$emit('click')">
    <div class="product-card__image">
      <img :src="product.image" :alt="product.title">
      <div class="product-card__tags" v-if="product.tags && product.tags.length">
        <span 
          v-for="tag in product.tags" 
          :key="tag.text"
          class="product-card__tag"
          :style="{ backgroundColor: tag.color || '#ff6b6b' }"
        >{{ tag.text }}</span>
      </div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__desc" v-if="product.description">{{ product.description }}</p>
      <div class="product-card__price-row">
        <div class="product-card__price">
          <span class="product-card__currency">¥</span>
          <span class="product-card__amount">{{ product.price.toFixed(2) }}</span>
          <span class="product-card__original" v-if="product.originalPrice">¥{{ product.originalPrice.toFixed(2) }}</span>
        </div>
        <div class="product-card__sales" v-if="product.sales">
          已售 {{ product.sales }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    validator: (product) => {
      return product.image && product.title && typeof product.price === 'number';
    }
  }
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
  
  &__image {
    position: relative;
    padding-top: 100%;
    background: #f5f5f5;
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__tags {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    gap: 4px;
  }
  
  &__tag {
    padding: 2px 6px;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
  }
  
  &__content {
    padding: 12px;
  }
  
  &__title {
    font-size: 14px;
    color: #333;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__desc {
    font-size: 12px;
    color: #999;
    margin: 4px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
  
  &__price {
    display: flex;
    align-items: baseline;
  }
  
  &__currency {
    font-size: 12px;
    color: #ff6b6b;
  }
  
  &__amount {
    font-size: 16px;
    font-weight: bold;
    color: #ff6b6b;
  }
  
  &__original {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
    margin-left: 4px;
  }
  
  &__sales {
    font-size: 12px;
    color: #999;
  }
}
</style>