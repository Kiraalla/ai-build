<template>
  <div class="dashboard">
    <h1 class="dashboard__title">仪表盘</h1>
    <div class="dashboard__grid">
      <div class="dashboard__card">
        <h3>访问统计</h3>
        <div class="dashboard__number">1,234</div>
        <p>本月访问量</p>
      </div>
      <div class="dashboard__card">
        <h3>用户数据</h3>
        <div class="dashboard__number">567</div>
        <p>活跃用户</p>
      </div>
      <div class="dashboard__card">
        <h3>系统状态</h3>
        <div class="dashboard__status dashboard__status--good">正常</div>
        <p>所有服务运行正常</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 2rem;

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  &__card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;

    h3 {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
  }

  &__number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #42b883;
    margin-bottom: 0.5rem;
  }

  &__status {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    margin: 0.5rem 0;

    &--good {
      background-color: #e1f7e3;
      color: #42b883;
    }
  }
}
</style>