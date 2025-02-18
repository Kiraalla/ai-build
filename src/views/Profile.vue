<template>
  <div class="profile">
    <h1 class="profile__title">个人信息</h1>
    <div class="profile__card">
      <div class="profile__avatar">
        <span class="profile__avatar-placeholder">👤</span>
      </div>
      <div class="profile__info">
        <div class="profile__info-item">
          <label>用户名</label>
          <span>{{ username }}</span>
        </div>
        <div class="profile__info-item">
          <label>邮箱</label>
          <span>{{ email }}</span>
        </div>
        <div class="profile__info-item">
          <label>注册时间</label>
          <span>{{ joinDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('测试用户')
const email = ref('test@example.com')
const joinDate = ref('2024-01-01')
</script>

<style lang="scss" scoped>
.profile {
  padding: 2rem;

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  &__card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 2rem;
  }

  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;

    &-placeholder {
      font-size: 3rem;
    }
  }

  &__info {
    flex: 1;

    &-item {
      margin-bottom: 1rem;

      label {
        display: block;
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }

      span {
        font-size: 1.1rem;
        color: #2c3e50;
      }
    }
  }
}
</style>