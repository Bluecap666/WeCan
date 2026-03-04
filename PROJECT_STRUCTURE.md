# WeCan Wiki 项目结构

本文档详细说明项目的目录结构和文件组织。

## 📁 完整目录结构

```
WeCan/
├── 📄 README.md                      # 项目主文档
├── 📄 QUICKSTART.md                  # 快速入门指南
├── 📄 LICENSE                        # 开源协议
├── 📄 package.json                   # 工作区配置
├── 📄 .gitignore                     # Git 忽略配置
├── 📄 .env.example                   # 环境变量示例
├── 📄 docker-compose.yml             # Docker Compose 配置
├── 📄 deploy.sh                      # 一键部署脚本
│
├── 📂 frontend/                      # 前端 Next.js应用
│   ├── 📄 package.json              # 前端依赖
│   ├── 📄 next.config.js            # Next.js 配置
│   ├── 📄 tsconfig.json             # TypeScript 配置
│   ├── 📄 tailwind.config.js        # Tailwind CSS 配置
│   ├── 📄 postcss.config.js         # PostCSS 配置
│   ├── 📄 .eslintrc.js              # ESLint 配置
│   ├── 📄 .gitignore                # Git 忽略配置
│   ├── 📄 Dockerfile                # Docker 镜像构建
│   └── 📂 src/
│       ├── 📂 app/                  # App Router (页面)
│       │   ├── layout.tsx           # 根布局
│       │   ├── page.tsx             # 首页
│       │   ├── globals.css          # 全局样式
│       │   ├── category/            # 分类页面
│       │   │   └── [...slug]/
│       │   │       └── page.tsx
│       │   ├── docs/                # 文档详情
│       │   │   └── [...slug]/
│       │   │       └── page.tsx
│       │   ├── search/              # 搜索页面
│       │   │   └── page.tsx
│       │   ├── tag/                 # 标签页面
│       │   │   └── [tag]/
│       │   │       └── page.tsx
│       │   └── admin/               # 管理后台
│       │       ├── layout.tsx
│       │       ├── dashboard/
│       │       ├── docs/
│       │       ├── categories/
│       │       └── settings/
│       │
│       ├── 📂 components/           # React 组件
│       │   ├── 📂 ui/               # Shadcn 基础组件
│       │   │   ├── button.tsx
│       │   │   ├── input.tsx
│       │   │   ├── dialog.tsx
│       │   │   └── ...
│       │   ├── 📂 common/           # 通用组件
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── SearchBar.tsx
│       │   │   └── ThemeToggle.tsx
│       │   ├── 📂 docs/             # 文档相关组件
│       │   │   ├── DocumentList.tsx
│       │   │   ├── DocumentCard.tsx
│       │   │   ├── TableOfContents.tsx
│       │   │   └── MarkdownRenderer.tsx
│       │   ├── 📂 editor/           # 编辑器组件
│       │   │   ├── MarkdownEditor.tsx
│       │   │   ├── Toolbar.tsx
│       │   │   └── Preview.tsx
│       │   └── 📂 admin/            # 后台组件
│       │       ├── Sidebar.tsx
│       │       ├── Dashboard.tsx
│       │       └── ...
│       │
│       ├── 📂 lib/                  # 工具库
│       │   ├── api.ts               # API 客户端
│       │   ├── utils.ts             # 工具函数
│       │   ├── constants.ts         # 常量定义
│       │   └── auth.ts              # 认证工具
│       │
│       ├── 📂 hooks/                # 自定义 Hooks
│       │   ├── useAuth.ts
│       │   ├── useDocuments.ts
│       │   └── useSearch.ts
│       │
│       ├── 📂 stores/               # Zustand 状态管理
│       │   ├── authStore.ts
│       │   └── documentStore.ts
│       │
│       └── 📂 types/                # TypeScript 类型
│           ├── document.ts
│           ├── category.ts
│           ├── user.ts
│           └── index.ts
│
├── 📂 backend/                      # 后端 Node.js 服务
│   ├── 📄 package.json              # 后端依赖
│   ├── 📄 tsconfig.json             # TypeScript 配置
│   ├── 📄 .eslintrc.js              # ESLint 配置
│   ├── 📄 .gitignore                # Git 忽略配置
│   ├── 📄 Dockerfile                # Docker 镜像构建
│   └── 📂 src/
│       ├── 📄 index.ts              # 入口文件
│       │
│       ├── 📂 models/               # MongoDB 模型
│       │   ├── Document.ts          # 文档模型
│       │   ├── Category.ts          # 分类模型
│       │   ├── User.ts              # 用户模型
│       │   ├── Tag.ts               # 标签模型
│       │   └── Comment.ts           # 评论模型
│       │
│       ├── 📂 routes/               # 路由定义
│       │   ├── documents.ts         # 文档路由
│       │   ├── categories.ts        # 分类路由
│       │   ├── auth.ts              # 认证路由
│       │   ├── search.ts            # 搜索路由
│       │   ├── users.ts             # 用户路由
│       │   └── admin/               # 管理路由
│       │       ├── stats.ts
│       │       ├── backup.ts
│       │       └── settings.ts
│       │
│       ├── 📂 controllers/          # 控制器（业务逻辑）
│       │   ├── document.controller.ts
│       │   ├── category.controller.ts
│       │   ├── auth.controller.ts
│       │   └── search.controller.ts
│       │
│       ├── 📂 middlewares/          # 中间件
│       │   ├── auth.ts              # 认证中间件
│       │   ├── validation.ts        # 验证中间件
│       │   ├── errorHandler.ts      # 错误处理
│       │   └── rateLimiter.ts       # 限流中间件
│       │
│       ├── 📂 services/             # 服务层
│       │   ├── document.service.ts
│       │   ├── search.service.ts    # 搜索服务
│       │   ├── backup.service.ts    # 备份服务
│       │   └── email.service.ts     # 邮件服务
│       │
│       ├── 📂 config/               # 配置文件
│       │   ├── database.ts          # 数据库配置
│       │   ├── meilisearch.ts       # 搜索引擎配置
│       │   ├── minio.ts             # 对象存储配置
│       │   └── jwt.ts               # JWT 配置
│       │
│       ├── 📂 utils/                # 工具函数
│       │   ├── logger.ts            # 日志工具
│       │   ├── validator.ts         # 数据验证
│       │   └── helpers.ts           # 辅助函数
│       │
│       └── 📂 types/                # TypeScript 类型
│           ├── express.d.ts
│           └── custom.d.ts
│
├── 📂 nginx/                        # Nginx 配置
│   ├── 📄 nginx.conf                # Nginx 主配置
│   └── 📂 ssl/                      # SSL 证书目录
│       ├── fullchain.pem
│       └── privkey.pem
│
├── 📂 mongodb/                      # MongoDB 配置
│   └── 📄 init-mongo.js             # 数据库初始化脚本
│
├── 📂 scripts/                      # 工具脚本
│   ├── 📄 backup.sh                 # 备份脚本
│   ├── 📄 restore.sh                # 恢复脚本
│   ├── 📄 seed-data.js              # 种子数据脚本
│   └── 📄 generate-key.sh           # 密钥生成脚本
│
└── 📂 backups/                      # 备份文件目录（自动生成）
    └── mongodb_YYYYMMDD_HHMMSS.tar.gz
```

---

## 📋 核心文件说明

### 根目录文件

#### `docker-compose.yml`
Docker Compose 配置文件，定义所有服务：
- nginx: 反向代理
- frontend: Next.js 前端
- backend: Node.js 后端
- mongodb: MongoDB 数据库
- meilisearch: 搜索引擎
- minio: 对象存储

#### `.env.example`
环境变量模板文件，包含：
- 数据库连接配置
- JWT 密钥配置
- 搜索引擎配置
- MinIO 配置
- 邮件服务配置

#### `deploy.sh`
一键部署脚本，执行：
1. 检查环境变量
2. 构建 Docker 镜像
3. 启动所有服务
4. 初始化数据库
5. 创建搜索索引

### 前端核心文件

#### `frontend/src/app/layout.tsx`
根布局组件，包含：
- HTML 结构
- 全局 Provider
- 字体加载
- SEO 元数据

#### `frontend/src/app/page.tsx`
首页组件，包含：
- Hero 区域
- 分类导航
- 统计信息
- CTA 区域

#### `frontend/src/components/editor/MarkdownEditor.tsx`
Markdown 编辑器组件，支持：
- 实时预览
- 语法高亮
- 图片上传
- 表格编辑
- Mermaid 图表

### 后端核心文件

#### `backend/src/index.ts`
后端服务入口，包含：
- Koa 应用初始化
- 中间件配置
- 路由注册
- 数据库连接
- 错误处理

#### `backend/src/models/Document.ts`
文档数据模型，定义：
- 字段结构
- 索引
- 虚拟字段
- 实例方法
- 静态方法
- 中间件钩子

#### `backend/src/middlewares/auth.ts`
认证中间件，处理：
- JWT Token 验证
- 用户权限检查
- Token 刷新

---

## 🔍 关键目录详解

### 前端 `src/app/` 目录

采用 Next.js 14 App Router 结构：

```
app/
├── layout.tsx          # 根布局
├── page.tsx            # 首页
├── category/           # 分类路由
│   └── [...slug]/      # 动态路由（支持多级）
│       └── page.tsx
├── docs/               # 文档路由
│   └── [...slug]/      # 动态路由
│       └── page.tsx
├── search/             # 搜索路由
│   └── page.tsx
├── tag/                # 标签路由
│   └── [tag]/
│       └── page.tsx
└── admin/              # 管理后台
    ├── layout.tsx
    ├── dashboard/
    ├── docs/
    ├── categories/
    └── settings/
```

### 后端 `src/models/` 目录

MongoDB 数据模型：

```
models/
├── Document.ts         # 文档集合
├── Category.ts         # 分类集合
├── User.ts             # 用户集合
├── Tag.ts              # 标签集合
└── Comment.ts          # 评论集合
```

每个模型包含：
- Schema 定义
- 索引配置
- 虚拟字段
- 实例方法
- 静态方法
- 中间件钩子

### 组件库 `components/ui/`

Shadcn UI 基础组件：

```
ui/
├── button.tsx          # 按钮
├── input.tsx           # 输入框
├── dialog.tsx          # 对话框
├── dropdown-menu.tsx   # 下拉菜单
├── card.tsx            # 卡片
├── table.tsx           # 表格
├── form.tsx            # 表单
├── toast.tsx           # 提示框
└── ...
```

---

## 🎯 数据流向

```
用户操作
  ↓
[Frontend Components]
  ↓
[API Client (axios)]
  ↓
[Backend Routes]
  ↓
[Controllers]
  ↓
[Services]
  ↓
[Models/Mongoose]
  ↓
[MongoDB Database]
```

响应流程相反。

---

## 🔄 开发工作流

### 前端开发

```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

文件修改后自动热重载。

### 后端开发

```bash
cd backend
npm install
npm run dev  # http://localhost:3001
```

使用 ts-node-dev 实现 TypeScript 热重载。

### 数据库操作

```bash
# 进入 MongoDB 容器
docker-compose exec mongodb mongosh

# 使用本地 MongoDB
# 连接字符串：mongodb://localhost:27017/wikan
```

---

## 📦 部署流程

### 开发环境
```bash
# 分别启动前后端
cd frontend && npm run dev
cd backend && npm run dev
```

### 生产环境
```bash
# 使用 Docker Compose 一键部署
./deploy.sh
```

### 云服务器
```bash
# 安装 Docker
curl -fsSL https://get.docker.com | bash

# 克隆项目
git clone <repo>
cd wican-wiki

# 配置环境变量
cp .env.example .env
vim .env

# 部署
./deploy.sh
```

---

## 🔐 安全配置

### 必须修改的配置

1. **JWT_SECRET**: 生成随机字符串
   ```bash
   openssl rand -base64 32
   ```

2. **MONGO_PASSWORD**: 数据库密码
   ```bash
   openssl rand -base64 16
   ```

3. **MEILI_MASTER_KEY**: 搜索引擎密钥
   ```bash
   openssl rand -base64 16
   ```

### 可选安全加固

1. 启用 HTTPS（生产环境必须）
2. 配置防火墙规则
3. 设置 IP 白名单
4. 启用日志审计
5. 定期备份数据

---

## 📊 性能优化点

### 前端优化
- SSG (Static Site Generation)
- ISR (Incremental Static Regeneration)
- 图片懒加载
- 代码分割
- Service Worker 缓存

### 后端优化
- MongoDB 索引优化
- Redis 缓存（热点数据）
- 查询优化（避免 N+1）
- 分页处理
- 异步任务队列

### 搜索引擎优化
- MeiliSearch 索引分片
- 同义词库配置
- 权重调整

---

## 🧪 测试策略

### 单元测试
- Jest + React Testing Library (前端)
- Mocha + Chai (后端)

### 集成测试
- Cypress (E2E 测试)
- Supertest (API 测试)

### 性能测试
- Lighthouse (前端性能)
- k6 (负载测试)

---

## 📝 命名规范

### 文件命名
- 组件：PascalCase (e.g., `MarkdownEditor.tsx`)
- 工具：camelCase (e.g., `utils.ts`)
- 测试：`.test.ts` 或 `.spec.ts`

### 变量命名
- 类/组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE
- 私有属性：下划线前缀 `_private`

### 目录命名
- 全部小写
- 使用连字符或驼峰（保持一致性）

---

## 🎨 样式规范

### Tailwind CSS
- 优先使用 utility classes
- 复杂样式提取为组件
- 响应式使用断点前缀

### CSS Modules
- 局部样式隔离
- 支持动态类名

### 全局样式
- 定义在 `globals.css`
- 使用 CSS 变量实现主题

---

这个结构说明帮助你快速了解项目的组织方式和各部分的职责。
