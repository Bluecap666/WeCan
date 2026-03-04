#!/usr/bin/env mongosh

// WeCan Wiki 数据库初始化脚本

print("📦 开始初始化 WeCan Wiki 数据库...");

// 切换到 wikan 数据库
use wikan;

// 1. 创建初始管理员用户
print("👤 创建管理员账户...");
db.users.insertOne({
  username: "admin",
  email: "admin@wikan.com",
  password: "$2a$10$LgQkXhQ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z", // admin123 (需要实际加密)
  avatar: "",
  role: "super_admin",
  bio: "系统管理员",
  socialLinks: {},
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// 2. 创建基础分类体系
print("📚 创建知识分类...");

const categories = [
  // 基础理论
  {
    name: "基础理论",
    slug: "foundation",
    parentId: null,
    path: "/foundation",
    order: 1,
    icon: "📚",
    description: "计算机科学基础、软件工程、数学基础",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "编程语言",
    slug: "languages",
    parentId: null,
    path: "/languages",
    order: 2,
    icon: "💻",
    description: "JavaScript、Python、Java、Go、Rust 等",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Web 开发",
    slug: "web",
    parentId: null,
    path: "/web",
    order: 3,
    icon: "🌐",
    description: "前端、后端、全栈开发技术",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "数据库",
    slug: "database",
    parentId: null,
    path: "/database",
    order: 4,
    icon: "🗄️",
    description: "MySQL、PostgreSQL、MongoDB、Redis 等",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "云计算与 DevOps",
    slug: "devops",
    parentId: null,
    path: "/devops",
    order: 5,
    icon: "☁️",
    description: "Docker、Kubernetes、CI/CD 等",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "网络安全",
    slug: "security",
    parentId: null,
    path: "/security",
    order: 6,
    icon: "🔒",
    description: "应用安全、网络安全、合规标准",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "移动开发",
    slug: "mobile",
    parentId: null,
    path: "/mobile",
    order: 7,
    icon: "📱",
    description: "iOS、Android、跨平台开发",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "人工智能与大数据",
    slug: "ai-bigdata",
    parentId: null,
    path: "/ai-bigdata",
    order: 8,
    icon: "🤖",
    description: "机器学习、深度学习、大数据处理",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "开发工具",
    slug: "tools",
    parentId: null,
    path: "/tools",
    order: 9,
    icon: "🛠️",
    description: "Git、IDE、调试工具等",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "项目管理",
    slug: "project-management",
    parentId: null,
    path: "/project-management",
    order: 10,
    icon: "📋",
    description: "敏捷开发、需求分析、文档编写",
    depth: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

db.categories.insertMany(categories);

// 3. 创建示例标签
print("🏷️  创建示例标签...");

const tags = [
  { name: "入门教程", slug: "beginner", color: "#3b82f6", count: 0 },
  { name: "进阶技巧", slug: "advanced", color: "#8b5cf6", count: 0 },
  { name: "最佳实践", slug: "best-practices", color: "#10b981", count: 0 },
  { name: "性能优化", slug: "performance", color: "#f59e0b", count: 0 },
  { name: "故障排查", slug: "troubleshooting", color: "#ef4444", count: 0 },
  { name: "代码示例", slug: "code-example", color: "#06b6d4", count: 0 },
  { name: "架构设计", slug: "architecture", color: "#6366f1", count: 0 },
  { name: "安全", slug: "security", color: "#dc2626", count: 0 }
];

db.tags.insertMany(tags);

// 4. 创建示例文档
print("📄 创建示例文档...");

db.documents.insertOne({
  title: "欢迎使用 WeCan Wiki",
  slug: "welcome-to-wican-wiki",
  content: `# 欢迎使用 WeCan Wiki 🎉

WeCan Wiki 是一个现代化的 IT 知识库系统，旨在帮助您组织和分享技术知识。

## 功能特性

### 📝 内容管理
- 支持 Markdown 格式
- 实时预览编辑
- 版本控制
- 分类管理

### 🔍 强大的搜索
- 全文搜索
- 毫秒级响应
- 智能推荐

### 👥 权限系统
- 多角色支持
- 细粒度权限控制
- 团队协作

## 快速开始

1. **浏览分类**: 在首页选择您感兴趣的技术领域
2. **阅读文档**: 点击文档标题查看详细内容
3. **搜索内容**: 使用顶部搜索框查找特定主题

## 贡献内容

如果您想贡献内容，请联系管理员获取编辑权限。

## 技术支持

如有任何问题或建议，请通过以下方式联系我们：

- Email: support@wikan.com
- GitHub: https://github.com/your-org/wican-wiki

---

**祝您使用愉快！** ✨
`,
  excerpt: "欢迎使用 WeCan Wiki - 一个现代化的 IT 知识库系统",
  categoryId: db.categories.findOne({ slug: "foundation" })._id,
  tags: [],
  authorId: db.users.findOne({ username: "admin" })._id,
  status: "published",
  version: 1,
  viewCount: 0,
  likeCount: 0,
  commentCount: 0,
  seo: {
    metaTitle: "欢迎使用 WeCan Wiki",
    metaDescription: "WeCan Wiki 是一个现代化的 IT 知识库系统",
    keywords: ["wiki", "知识库", "IT 技术"]
  },
  attachments: [],
  createdAt: new Date(),
  updatedAt: new Date()
});

// 5. 创建索引
print("🔍 创建数据库索引...");

db.documents.createIndex({ slug: 1 }, { unique: true });
db.documents.createIndex({ categoryId: 1, status: 1 });
db.documents.createIndex({ tags: 1 });
db.documents.createIndex({ authorId: 1 });
db.documents.createIndex({ title: "text", content: "text" });

db.categories.createIndex({ slug: 1 }, { unique: true });
db.categories.createIndex({ parentId: 1 });
db.categories.createIndex({ path: 1 });

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

db.tags.createIndex({ slug: 1 }, { unique: true });

print("✅ 数据库初始化完成！");
print("");
print("📊 初始数据概览:");
print(`   - 用户数：${db.users.countDocuments()}`);
print(`   - 分类数：${db.categories.countDocuments()}`);
print(`   - 标签数：${db.tags.countDocuments()}`);
print(`   - 文档数：${db.documents.countDocuments()}`);
print("");
print("🔐 默认管理员账户:");
print("   用户名：admin");
print("   密码：admin123");
print("   ⚠️  首次登录后请立即修改密码！");
print("");
