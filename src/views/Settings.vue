<template>
  <div class="settings">
    <h1 class="settings__title">系统设置</h1>
    <div class="settings__content">
      <div class="settings__section">
        <h2 class="settings__section-title">个人设置</h2>
        <div class="settings__form-group">
          <label>语言</label>
          <select v-model="language">
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="settings__form-group">
          <label>主题</label>
          <select v-model="theme">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
      </div>
      <div class="settings__section">
        <h2 class="settings__section-title">通知设置</h2>
        <div class="settings__form-group">
          <label class="settings__checkbox">
            <input type="checkbox" v-model="emailNotifications">
            接收邮件通知
          </label>
        </div>
        <div class="settings__form-group">
          <label class="settings__checkbox">
            <input type="checkbox" v-model="pushNotifications">
            接收推送通知
          </label>
        </div>
      </div>
      <button class="settings__save-btn" @click="saveSettings">保存设置</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const language = ref('zh')
const theme = ref('light')
const emailNotifications = ref(true)
const pushNotifications = ref(true)

const saveSettings = () => {
  // 这里实现保存设置的逻辑
  alert('设置已保存')
}
</script>

<style lang="scss" scoped>
.settings {
  padding: 2rem;

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  &__content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__section {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  &__form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    select {
      width: 200px;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }
  }

  &__save-btn {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background-color: #42b883;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #3aa876;
    }
  }
}
</style>