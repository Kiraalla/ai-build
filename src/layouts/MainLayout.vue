<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <header class="layout__header">
      <div class="layout__logo">
        <img src="../assets/vue.svg" alt="Logo" />
        <span>Vue3 Template</span>
      </div>
      <nav class="layout__nav">
        <router-link to="/" class="layout__nav-item">首页</router-link>
        <router-link to="/about" class="layout__nav-item">关于</router-link>
      </nav>
      <div class="layout__user">
        <span class="layout__username">{{ username }}</span>
        <button class="layout__logout" @click="handleLogout">退出</button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <div class="layout__main">
      <!-- 侧边栏 -->
      <aside class="layout__sidebar">
        <nav class="layout__menu">
          <router-link to="/dashboard" class="layout__menu-item">
            <span class="layout__menu-icon">📊</span>
            <span class="layout__menu-text">仪表盘</span>
          </router-link>
          <router-link to="/profile" class="layout__menu-item">
            <span class="layout__menu-icon">👤</span>
            <span class="layout__menu-text">个人信息</span>
          </router-link>
          <router-link to="/settings" class="layout__menu-item">
            <span class="layout__menu-icon">⚙️</span>
            <span class="layout__menu-text">设置</span>
          </router-link>
        </nav>
      </aside>

      <!-- 内容区域 -->
      <main class="layout__content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '../api/user'

const router = useRouter()
const username = ref('用户名')

// 退出登录
const handleLogout = async () => {
  try {
    await userApi.logout()
    router.push('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: bold;

    img {
      height: 30px;
    }
  }

  &__nav {
    margin-left: 40px;
    display: flex;
    gap: 20px;
  }

  &__nav-item {
    color: #666;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;

    &:hover,
    &.router-link-active {
      color: #42b883;
      background-color: #f0f9f4;
    }
  }

  &__user {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__username {
    color: #333;
  }

  &__logout {
    padding: 5px 15px;
    border: none;
    border-radius: 4px;
    background-color: #f56c6c;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #e74c3c;
    }
  }

  &__main {
    display: flex;
    flex: 1;
    margin-top: 60px;
  }

  &__sidebar {
    width: 200px;
    background-color: #f8f9fa;
    padding: 20px 0;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 60px;
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__menu-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #666;
    text-decoration: none;

    &:hover,
    &.router-link-active {
      background-color: #ecf5ff;
      color: #409eff;
    }
  }

  &__menu-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  &__content {
    flex: 1;
    padding: 20px;
    margin-left: 200px;
  }
}
</style>