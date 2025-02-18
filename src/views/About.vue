<template>
  <div class="about">
    <h1 class="about__title">关于我们</h1>
    <div class="about__content">
      <p>这是一个基于 Vue3 + Vite 的现代化前端项目模板，集成了以下特性：</p>
      <ul class="about__features">
        <li>Vue3 组合式 API</li>
        <li>Vite 构建工具</li>
        <li>Vue Router 路由管理</li>
        <li>Pinia 状态管理</li>
        <li>SCSS 样式预处理</li>
        <li>组件化开发</li>
        <li>响应式设计</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  &__title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
  }

  &__content {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 1.5rem;
    }
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 0;
      color: #42b883;
      font-size: 1.1rem;
      
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>