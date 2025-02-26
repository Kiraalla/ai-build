<template>
  <div class="sku-selector">
    <!-- 规格选择区 -->
    <div v-for="spec in specs" :key="spec.name" class="sku-selector__group">
      <div class="sku-selector__label">{{ spec.name }}</div>
      <div class="sku-selector__options">
        <button
          v-for="option in spec.options"
          :key="option.value"
          :class="[
            'sku-selector__option',
            {
              'sku-selector__option--selected': isOptionSelected(spec.name, option.value),
              'sku-selector__option--disabled': !isOptionAvailable(spec.name, option.value)
            }
          ]"
          @click="selectOption(spec.name, option.value)"
        >
          {{ option.text }}
        </button>
      </div>
    </div>

    <!-- 数量选择器 -->
    <div class="sku-selector__quantity">
      <div class="sku-selector__label">数量</div>
      <div class="quantity-selector">
        <button 
          class="quantity-selector__btn" 
          :disabled="quantity <= 1"
          @click="updateQuantity(-1)"
        >-</button>
        <input 
          type="number" 
          v-model.number="quantity"
          class="quantity-selector__input"
          :min="1"
          :max="currentSku?.stock || 1"
        >
        <button 
          class="quantity-selector__btn"
          :disabled="quantity >= (currentSku?.stock || 1)"
          @click="updateQuantity(1)"
        >+</button>
      </div>
    </div>

    <!-- 价格和库存信息 -->
    <div class="sku-selector__info">
      <div class="sku-selector__price">
        <span class="sku-selector__currency">¥</span>
        <span class="sku-selector__amount">{{ currentPrice.toFixed(2) }}</span>
      </div>
      <div class="sku-selector__stock" v-if="currentSku">
        库存: {{ currentSku.stock }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  specs: {
    type: Array,
    required: true
  },
  skus: {
    type: Array,
    required: true
  },
  defaultPrice: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update:selected', 'quantity-change']);

// 选中的规格值
const selectedSpecs = ref({});

// 商品数量
const quantity = ref(1);

// 当前选中的SKU
const currentSku = computed(() => {
  if (!isSpecsFullSelected.value) return null;
  
  return props.skus.find(sku => {
    return Object.entries(selectedSpecs.value).every(
      ([name, value]) => sku.specs[name] === value
    );
  });
});

// 当前价格
const currentPrice = computed(() => {
  return currentSku.value?.price || props.defaultPrice;
});

// 是否已选择所有规格
const isSpecsFullSelected = computed(() => {
  return props.specs.every(spec => selectedSpecs.value[spec.name]);
});

// 检查选项是否已选中
const isOptionSelected = (specName, optionValue) => {
  return selectedSpecs.value[specName] === optionValue;
};

// 检查选项是否可选
const isOptionAvailable = (specName, optionValue) => {
  const tempSpecs = { ...selectedSpecs.value, [specName]: optionValue };
  return props.skus.some(sku => {
    return Object.entries(tempSpecs).every(
      ([name, value]) => !tempSpecs[name] || sku.specs[name] === value
    );
  });
};

// 选择规格
const selectOption = (specName, optionValue) => {
  if (!isOptionAvailable(specName, optionValue)) return;
  
  if (selectedSpecs.value[specName] === optionValue) {
    selectedSpecs.value[specName] = null;
  } else {
    selectedSpecs.value[specName] = optionValue;
  }
  
  emit('update:selected', { ...selectedSpecs.value });
};

// 更新数量
const updateQuantity = (delta) => {
  const newQuantity = quantity.value + delta;
  const maxStock = currentSku.value?.stock || 1;
  
  if (newQuantity >= 1 && newQuantity <= maxStock) {
    quantity.value = newQuantity;
    emit('quantity-change', newQuantity);
  }
};
</script>

<style lang="scss" scoped>
.sku-selector {
  padding: 16px;
  
  &__group {
    margin-bottom: 16px;
  }
  
  &__label {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }
  
  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  &__option {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s;
    
    &--selected {
      color: #ff6b6b;
      border-color: #ff6b6b;
      background: #fff5f5;
    }
    
    &--disabled {
      color: #ccc;
      border-color: #eee;
      background: #f5f5f5;
      cursor: not-allowed;
    }
  }
  
  &__quantity {
    margin-bottom: 16px;
  }
  
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__price {
    display: flex;
    align-items: baseline;
  }
  
  &__currency {
    font-size: 14px;
    color: #ff6b6b;
  }
  
  &__amount {
    font-size: 20px;
    font-weight: bold;
    color: #ff6b6b;
  }
  
  &__stock {
    font-size: 12px;
    color: #999;
  }
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  
  &__btn {
    width: 28px;
    height: 28px;
    border: none;
    background: #f5f5f5;
    color: #333;
    cursor: pointer;
    
    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
  
  &__input {
    width: 40px;
    height: 28px;
    border: none;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
    
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>