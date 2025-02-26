<template>
  <div class="base-pagination">
    <button
      class="base-pagination__btn"
      :disabled="currentPage <= 1"
      @click="handlePrev"
    >
      <span>上一页</span>
    </button>
    
    <ul class="base-pagination__list">
      <li
        v-for="page in displayPages"
        :key="page"
        :class="[
          'base-pagination__item',
          { 'base-pagination__item--active': page === currentPage }
        ]"
        @click="handlePageClick(page)"
      >
        {{ page }}
      </li>
    </ul>
    
    <button
      class="base-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="handleNext"
    >
      <span>下一页</span>
    </button>
    
    <div v-if="showSizer" class="base-pagination__sizer">
      <select v-model="localPageSize" @change="handleSizeChange">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}条/页
        </option>
      </select>
    </div>
    
    <div v-if="showJumper" class="base-pagination__jumper">
      <span>前往</span>
      <input
        type="number"
        v-model.number="jumpPage"
        @keyup.enter="handleJump"
        :min="1"
        :max="totalPages"
      >
      <span>页</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50]
  },
  showSizer: {
    type: Boolean,
    default: false
  },
  showJumper: {
    type: Boolean,
    default: false
  },
  pagerCount: {
    type: Number,
    default: 7
  }
})

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change'])

const localPageSize = ref(props.pageSize)
const jumpPage = ref(props.currentPage)

const totalPages = computed(() => {
  return Math.ceil(props.total / localPageSize.value)
})

const displayPages = computed(() => {
  const count = props.pagerCount
  const half = Math.floor(count / 2)
  let start = props.currentPage - half
  let end = props.currentPage + half

  if (start < 1) {
    start = 1
    end = Math.min(count, totalPages.value)
  }

  if (end > totalPages.value) {
    end = totalPages.value
    start = Math.max(1, end - count + 1)
  }

  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
})

const handlePageClick = (page) => {
  emit('update:currentPage', page)
  emit('change', { page, pageSize: localPageSize.value })
}

const handlePrev = () => {
  if (props.currentPage > 1) {
    handlePageClick(props.currentPage - 1)
  }
}

const handleNext = () => {
  if (props.currentPage < totalPages.value) {
    handlePageClick(props.currentPage + 1)
  }
}

const handleSizeChange = () => {
  emit('update:pageSize', localPageSize.value)
  emit('change', { page: 1, pageSize: localPageSize.value })
  emit('update:currentPage', 1)
}

const handleJump = () => {
  let page = jumpPage.value
  if (page < 1) page = 1
  if (page > totalPages.value) page = totalPages.value
  handlePageClick(page)
}

watch(() => props.currentPage, (val) => {
  jumpPage.value = val
})
</script>

<style lang="scss" scoped>
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
  
  &__btn {
    padding: 0 12px;
    height: 32px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    border-radius: 4px;
    margin: 0 4px;
    
    &:hover:not(:disabled) {
      color: #409eff;
      border-color: #c6e2ff;
    }
    
    &:disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
  
  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  &__item {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 4px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      color: #409eff;
    }
    
    &--active {
      background-color: #409eff;
      color: #fff;
      
      &:hover {
        color: #fff;
      }
    }
  }
  
  &__sizer {
    margin-left: 16px;
    
    select {
      padding: 0 8px;
      height: 32px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      background-color: #fff;
      color: #606266;
      cursor: pointer;
      
      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
  }
  
  &__jumper {
    margin-left: 16px;
    display: flex;
    align-items: center;
    
    span {
      color: #606266;
      margin: 0 4px;
    }
    
    input {
      width: 50px;
      height: 32px;
      padding: 0 8px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      text-align: center;
      
      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
  }
}
</style>