# Vue3 项目模板

这是一个基于 Vite 构建的 Vue3 项目模板，采用现代化的技术栈和清晰的项目结构。

## 技术栈

- Vue3：渐进式 JavaScript 框架
- Vite：下一代前端构建工具
- Pinia：Vue 的状态管理库
- Axios：基于 Promise 的 HTTP 客户端
- SASS：CSS 预处理器

## 项目结构

```
src/
├── api/          # API 接口封装
├── assets/       # 静态资源文件
├── components/   # 公共组件
├── composables/  # 组合式函数
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── styles/       # 全局样式文件
├── utils/        # 工具函数
└── views/        # 页面视图组件
```

## 开发指南

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 开发规范

- 组件命名：使用 PascalCase
- 文件命名：使用 kebab-case
- CSS 类命名：使用 BEM 命名规范
- 代码格式化：使用 ESLint + Prettier
