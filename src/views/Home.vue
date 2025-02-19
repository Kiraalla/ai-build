<template>
  <div class="home">
    <h1 class="home__title">欢迎使用 Vue3 项目模板</h1>
    <p class="home__description">这是一个基于 Vue3 + Vite 的现代化前端项目模板</p>
    
    <!-- 功能演示区域 -->
    <div class="home__demos">
      <!-- Pinia 状态管理演示 -->
      <div class="home__demo-section">
        <h2 class="text-primary">Pinia 状态管理演示</h2>
        <div class="home__demo-content">
          <div class="user-info" v-if="userStore.userInfo">
            <p>当前用户：{{ userStore.userInfo.name }}</p>
            <button @click="userStore.logout">退出登录</button>
          </div>
          <div class="login-form" v-else>
            <input v-model="loginForm.username" placeholder="用户名" class="py-1"/>
            <input v-model="loginForm.password" type="password" placeholder="密码"  class="py-1"/>
            <button @click="handleLogin">登录</button>
          </div>
        </div>
      </div>

      <!-- 表单处理演示 -->
      <div class="home__demo-section">
        <h2>表单处理演示 (Composables)</h2>
        <div class="home__demo-content">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                v-model="form.email"
                type="email"
                placeholder="邮箱"
                @blur="validateEmail"
              />
              <span class="error" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <input
                v-model="form.message"
                placeholder="留言"
                @blur="validateMessage"
              />
              <span class="error" v-if="errors.message">{{ errors.message }}</span>
            </div>
            <button type="submit" :disabled="!isValid">提交</button>
          </form>
        </div>
      </div>

      <!-- 计数器演示 -->
      <div class="home__demo-section">
        <h2>组合式 API 演示</h2>
        <div class="home__demo-content counter-demo">
          <button @click="decrement">-</button>
          <span>{{ count }}</span>
          <button @click="increment">+</button>
          <p>双倍值：{{ doubleCount }}</p>
        </div>
      </div>

      <!-- API 调用演示 -->
      <div class="home__demo-section">
        <h2>API 调用演示</h2>
        <div class="home__demo-content">
          <button @click="fetchUserData" :disabled="loading">
            {{ loading ? '加载中...' : '获取用户信息' }}
          </button>
          <div v-if="userData" class="user-data">
            <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { userApi } from '../api/user'
import { useCounter } from '../composables/useCounter'
import { useForm } from '../composables/useForm'
import { useUserStore } from '../stores/user'

// Pinia 状态管理演示
const userStore = useUserStore()
const loginForm = ref({ username: '', password: '' })
const handleLogin = async () => {
  await userStore.login(loginForm.value)
  loginForm.value = { username: '', password: '' }
}

// 表单处理演示
const initialValues = {
  email: '',
  message: ''
}
const { values: form, errors, setFieldValue, setFieldError } = useForm(initialValues)

const validateEmail = () => {
  if (!form.email) {
    setFieldError('email', '邮箱不能为空')
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setFieldError('email', '请输入有效的邮箱地址')
    return false
  }
  return true
}

const validateMessage = () => {
  if (!form.message) {
    setFieldError('message', '留言不能为空')
    return false
  }
  return true
}

const isValid = computed(() => {
  return !errors.email && !errors.message && form.email && form.message
})

const handleSubmit = () => {
  if (isValid.value) {
    alert('表单提交成功！')
    form.email = ''
    form.message = ''
  }
}

// 计数器演示
const { count, increment, decrement } = useCounter()
const doubleCount = computed(() => count.value * 2)

// API 调用演示
const userData = ref(null)
const loading = ref(false)
const fetchUserData = async () => {
  loading.value = true
  try {
    userData.value = await userApi.getUserInfo()
  } catch (error) {
    console.error('获取用户信息失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  &__title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 3rem;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  &__feature {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: #42b883;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
    }
  }
}
</style>