import { ref, computed } from 'vue'

/**
 * 计数器组合式函数
 * @param {number} initialValue - 初始值
 * @param {Object} options - 配置选项
 * @returns {Object} 计数器方法和状态
 */
export function useCounter(initialValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity, step = 1 } = options
  const count = ref(initialValue)

  // 是否可以增加
  const canIncrement = computed(() => count.value + step <= max)
  
  // 是否可以减少
  const canDecrement = computed(() => count.value - step >= min)

  // 增加计数
  const increment = () => {
    if (canIncrement.value) {
      count.value += step
    }
  }

  // 减少计数
  const decrement = () => {
    if (canDecrement.value) {
      count.value -= step
    }
  }

  // 重置计数
  const reset = () => {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset,
    canIncrement,
    canDecrement
  }
}