# WeCan Wiki 快速入门指南

## 📦 5 分钟快速部署

### 前置条件

确保你的系统已安装：
- Docker 20.10+
- Docker Compose 2.0+

检查版本：
```bash
docker --version
docker-compose --version
```

### 步骤 1：准备环境

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件（可选，使用默认值也可）
# 生产环境建议修改密码和密钥
```

### 步骤 2：启动服务

```bash
# Windows PowerShell
.\deploy.sh

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

等待约 30 秒，看到以下提示表示成功：
```
🎉 部署完成！
📍 访问地址：http://localhost
🔐 管理后台：http://localhost/admin
```

### 步骤 3：登录系统

打开浏览器访问 http://localhost

**默认账户：**
- 用户名：`admin`
- 密码：`admin123`

⚠️ **首次登录后请立即修改密码！**

---

## 🎯 快速使用

### 创建第一篇文档

1. 登录管理后台：http://localhost/admin
2. 点击左侧菜单「文档管理」
3. 点击「新建文档」按钮
4. 填写文档信息：
   - 标题：例如 "JavaScript 入门教程"
   - 分类：选择「编程语言」→「JavaScript」
   - 内容：使用 Markdown 编写
5. 点击「保存并发布」

### Markdown 编写示例

```markdown
# JavaScript 入门

## 什么是 JavaScript？

JavaScript 是一种编程语言，用于网页交互。

## 第一个程序

```javascript
console.log("Hello, World!");
```

## 变量

使用 `let` 和 `const` 声明变量：

```javascript
let name = "WeCan";
const version = "1.0.0";
```

> 提示：JavaScript 是现代 Web 开发的核心技术之一。
```

### 查看文档

保存后，在首页可以看到刚才创建的文档：
1. 点击「编程语言」分类
2. 找到 "JavaScript 入门教程"
3. 点击进入查看

---

## 🔧 常用操作

### 添加新的知识分类

1. 进入「分类管理」
2. 点击「新建分类」
3. 填写信息：
   - 名称：如 "人工智能"
   - 标识：如 "ai"
   - 图标：如 "🤖"
   - 描述：简要说明
4. 保存

### 上传图片

在编辑器中：
1. 直接拖拽图片到编辑区域
2. 或点击工具栏的图片按钮
3. 选择图片上传
4. 图片会自动插入到 Markdown 中

### 搜索文档

使用顶部搜索框：
- 输入关键词即可实时搜索
- 支持全文检索
- 搜索结果按相关度排序

---

## 🛠️ 本地开发模式

如果你想修改代码或自定义样式：

### 启动开发环境

```bash
# 终端 1：启动后端
cd backend
npm install
npm run dev

# 终端 2：启动前端
cd frontend
npm install
npm run dev
```

访问：
- 前端：http://localhost:3000
- 后端 API：http://localhost:3001

### 修改配置

**前端配置：**
- `frontend/next.config.js` - Next.js 配置
- `frontend/tailwind.config.js` - Tailwind CSS 主题
- `frontend/src/app/globals.css` - 全局样式

**后端配置：**
- `backend/src/index.ts` - 服务器配置
- `.env` - 环境变量

---

## 📊 管理后台功能

### 仪表盘
- 查看统计信息（文档数、用户数、访问量）
- 最近活动日志
- 系统状态监控

### 文档管理
- ✅ 创建/编辑/删除文档
- ✅ 批量操作
- ✅ 版本历史
- ✅ 草稿箱
- ✅ 回收站

### 分类管理
- ✅ 树形结构展示
- ✅ 拖拽排序
- ✅ 分类合并/拆分

### 用户管理
- ✅ 用户列表
- ✅ 角色分配（Super Admin / Admin / Editor / Author / Viewer）
- ✅ 权限设置

### 标签管理
- ✅ 创建/编辑标签
- ✅ 标签合并
- ✅ 查看使用次数

### 媒体库
- ✅ 图片上传
- ✅ 文件管理
- ✅ CDN 配置

### SEO 设置
- ✅ 自定义 URL
- ✅ Meta 标签配置
- ✅ Sitemap 生成

### 系统设置
- ✅ 站点配置
- ✅ 主题定制
- ✅ 第三方集成
- ✅ 备份恢复

---

## 🔄 数据备份与恢复

### 手动备份

```bash
# 导出 MongoDB 数据
docker-compose exec mongodb mongodump \
  --uri="mongodb://wikan_user:wikan_pass@localhost:27017/wikan?authSource=admin" \
  --out=./backup_$(date +%Y%m%d)
```

### 使用备份脚本

```bash
# 备份
chmod +x scripts/backup.sh
./scripts/backup.sh

# 恢复
chmod +x scripts/restore.sh
./scripts/restore.sh ./backups/mongodb_20260304_120000.tar.gz
```

---

## ❓ 常见问题

### Q: 端口被占用怎么办？

修改 `docker-compose.yml` 中的端口映射：
```yaml
ports:
  - "8080:80"  # 将 80 改为 8080
  - "4433:443" # 将 443 改为 4433
```

### Q: 如何重置密码？

```bash
docker-compose exec mongodb mongosh

use wikan
db.users.updateOne(
  { username: "admin" },
  { $set: { 
    password: "$2a$10$LgQkXhQ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z" 
  }}
)
# 新密码：admin123
```

### Q: 如何停止服务？

```bash
docker-compose down

# 完全清理（包括数据卷）
docker-compose down -v
```

### Q: 如何查看日志？

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Q: 服务启动失败？

```bash
# 检查 Docker 状态
docker ps

# 重启服务
docker-compose restart

# 重新构建
docker-compose build
docker-compose up -d
```

---

## 📚 下一步

- 📖 阅读完整文档了解所有功能
- 🎨 自定义主题和样式
- 🔌 配置第三方集成（GitHub、Notion 等）
- 📊 设置数据统计和分析
- 🔒 配置 HTTPS 和安全策略

---

## 🆘 获取帮助

- 📖 [完整文档](README.md)
- 🐛 [问题反馈](https://github.com/your-org/wican-wiki/issues)
- 📧 Email: support@wikan.com

---

**祝你使用愉快！** ✨
