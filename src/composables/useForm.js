import { ref, reactive } from 'vue'

/**
 * 通用表单处理组合式函数
 * @param {Object} initialValues - 表单初始值
 * @param {Function} validateFn - 自定义验证函数
 * @returns {Object} 表单处理方法和状态
 */
export function useForm(initialValues = {}, validateFn = null) {
  const values = reactive({ ...initialValues })
  const errors = reactive({})
  const isSubmitting = ref(false)

  // 更新表单值
  const setFieldValue = (field, value) => {
    values[field] = value
    // 清除对应字段的错误
    if (errors[field]) {
      delete errors[field]
    }
  }

  // 设置表单错误
  const setFieldError = (field, error) => {
    errors[field] = error
  }

  // 验证表单
  const validate = async () => {
    if (validateFn) {
      const validationErrors = await validateFn(values)
      Object.assign(errors, validationErrors || {})
      return Object.keys(errors).length === 0
    }
    return true
  }

  // 提交表单
  const handleSubmit = async (onSubmit) => {
    isSubmitting.value = true
    try {
      const isValid = await validate()
      if (isValid) {
        await onSubmit(values)
      }
    } finally {
      isSubmitting.value = false
    }
  }

  // 重置表单
  const resetForm = () => {
    Object.assign(values, initialValues)
    Object.keys(errors).forEach(key => delete errors[key])
  }

  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    setFieldError,
    handleSubmit,
    resetForm
  }
}