<script setup>
import BaseTabs from '@/components/base/BaseTabs.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import Carousel from '@/components/Carousel.vue';
import Coupon from '@/components/mall/Coupon.vue';
import ProductList from '@/components/mall/ProductList.vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
import SwipeMenu from '@/components/SwipeMenu.vue';
import { ref } from 'vue';

// 组件分类
const activeTab = ref('base');
const tabs = [
  { name: 'base', label: '基础组件' },
  { name: 'mall', label: '商城组件' }
];

// 下拉刷新示例数据
const items = ref([
  { id: 1, text: '下拉刷新示例项目 1' },
  { id: 2, text: '下拉刷新示例项目 2' },
  { id: 3, text: '下拉刷新示例项目 3' }
]);

const handleRefresh = (done) => {
  setTimeout(() => {
    items.value.push({
      id: items.value.length + 1,
      text: `下拉刷新示例项目 ${items.value.length + 1}`
    });
    done();
  }, 1000);
};

// 轮播图示例数据
const carouselItems = ref([
  { image: 'https://picsum.photos/800/400?random=1', title: '示例图片 1' },
  { image: 'https://picsum.photos/800/400?random=2', title: '示例图片 2' },
  { image: 'https://picsum.photos/800/400?random=3', title: '示例图片 3' }
]);

// 底部弹出框控制
const showBottomSheet = ref(false);

// 侧滑菜单选项
const menuActions = [
  { text: '编辑', onClick: () => console.log('编辑') },
  { text: '删除', onClick: () => console.log('删除') }
];

// 商品示例数据
const products = ref([
  {
    id: 1,
    image: 'https://picsum.photos/400?random=1',
    title: '示例商品1',
    description: '这是一个商品示例描述',
    price: 99.99,
    originalPrice: 199.99,
    sales: 100,
    tags: [{ text: '热销', color: '#ff6b6b' }]
  },
  {
    id: 2,
    image: 'https://picsum.photos/400?random=2',
    title: '示例商品2',
    description: '这是一个商品示例描述',
    price: 199.99,
    sales: 50
  }
]);

// 优惠券示例数据
const coupon = {
  type: 'discount',
  value: 50,
  title: '新人专享优惠券',
  condition: 100,
  description: '仅限新用户使用',
  startTime: new Date(),
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
};
</script>

<template>
  <div class="components-showcase">
    <div class="components-showcase__header">
      <h1 class="components-showcase__title">组件库</h1>
      <div class="components-showcase__description">
        <p>这是一个基于 Vue 3 的移动端组件库，采用 Composition API 和 TypeScript 开发。组件库包含基础 UI 组件和商城业务组件两大类，提供了丰富的移动端交互组件和常用的电商场景组件。</p>
        <p>版本：1.0.0</p>
      </div>
    </div>

    <BaseTabs v-model="activeTab" :tabs="tabs" type="card" class="components-showcase__tabs" />

    <div v-if="activeTab === 'base'">
      <!-- 基础组件 -->
      <section class="component-section">
        <h2 class="component-section__title">下拉刷新组件</h2>
        <div class="component-section__description">
          <p>一个支持下拉刷新的列表组件，用于实现下拉刷新功能。在移动端下拉时会触发刷新事件。</p>
        </div>
        <div class="component-section__demo">
          <PullToRefresh @refresh="handleRefresh">
            <ul class="demo-list">
              <li v-for="item in items" :key="item.id" class="demo-list__item">
                {{ item.text }}
              </li>
            </ul>
          </PullToRefresh>
        </div>
      </section>

      <section class="component-section">
        <h2 class="component-section__title">轮播图组件</h2>
        <div class="component-section__description">
          <p>支持自动播放、手势滑动的轮播图组件，可用于展示图片、广告等轮播内容。</p>
        </div>
        <div class="component-section__demo">
          <Carousel :items="carouselItems" />
        </div>
      </section>

      <section class="component-section">
        <h2 class="component-section__title">侧滑菜单组件</h2>
        <div class="component-section__description">
          <p>移动端常用的侧滑菜单组件，支持自定义菜单项和滑动触发。</p>
        </div>
        <div class="component-section__demo">
          <SwipeMenu :actions="menuActions">
            <div class="demo-swipe-item">← 向左滑动查看菜单</div>
          </SwipeMenu>
        </div>
      </section>

      <section class="component-section">
        <h2 class="component-section__title">底部弹出框组件</h2>
        <div class="component-section__description">
          <p>从底部弹出的模态框组件，适用于移动端的操作菜单、选择器等场景。</p>
        </div>
        <div class="component-section__demo">
          <button class="demo-button" @click="showBottomSheet = true">打开底部弹出框</button>
          <BottomSheet v-model="showBottomSheet">
            <div class="demo-bottom-sheet">
              <h3>底部弹出框示例</h3>
              <p>这是一个底部弹出框的示例内容</p>
              <button class="demo-button" @click="showBottomSheet = false">关闭</button>
            </div>
          </BottomSheet>
        </div>
      </section>
    </div>

    <div v-else>
      <!-- 商城组件 -->
      <section class="component-section">
        <h2 class="component-section__title">商品卡片组件</h2>
        <div class="component-section__description">
          <p>展示商品信息的卡片组件，支持商品图片、标题、价格、销量等信息的展示。</p>
        </div>
        <div class="component-section__demo">
          <ProductList :products="products" :columns="2" :gap="12" />
        </div>
      </section>

      <section class="component-section">
        <h2 class="component-section__title">优惠券组件</h2>
        <div class="component-section__description">
          <p>展示优惠券信息的组件，支持折扣券和满减券，包含使用条件和有效期等信息。</p>
        </div>
        <div class="component-section__demo">
          <Coupon v-bind="coupon" />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
.components-showcase {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  &__header {
    margin-bottom: 24px;
  }

  &__title {
    font-size: 28px;
    font-weight: bold;
    margin: 0 0 16px;
    color: #333;
  }

  &__description {
    color: #666;
    line-height: 1.6;

    p {
      margin: 8px 0;
    }
  }

  &__tabs {
    margin-bottom: 24px;
  }
}

.component-section {
  margin-bottom: 40px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 12px;
    color: #333;
  }

  &__description {
    color: #666;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.6;
  }

  &__demo {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 16px;
  }
}

.demo-list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    padding: 12px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
}

.demo-swipe-item {
  padding: 20px;
  background: #f5f5f5;
  text-align: center;
}

.demo-button {
  padding: 8px 16px;
  background: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: color.scale(#ff6b6b, $lightness: -7%);
  }
}

.demo-bottom-sheet {
  padding: 20px;
  text-align: center;

  h3 {
    margin: 0 0 12px;
  }

  p {
    margin: 0 0 16px;
    color: #666;
  }
}
</style>