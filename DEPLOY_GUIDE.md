# 🚀 快速部署命令

## ✅ 问题已修复

已修复的问题：
- ✅ TypeScript 编译错误（cors 配置、优雅关闭逻辑）
- ✅ Dockerfile 锁文件依赖问题
- ✅ npm 安装网络超时问题
- ✅ 部署脚本错误处理增强

---

## 📋 部署步骤（复制粘贴执行）

### 1️⃣ 拉取最新代码

```bash
cd ~/WeCan
git pull origin main
```

### 2️⃣ 停止旧服务

```bash
docker-compose down
```

### 3️⃣ 重新构建并部署

```bash
# 设置环境变量
export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com

# 重新构建（不使用缓存）
docker-compose build --no-cache

# 启动服务
docker-compose up -d
```

### 4️⃣ 查看日志

```bash
# 实时查看所有日志
docker-compose logs -f

# 只看后端日志（确认是否编译成功）
docker-compose logs backend
```

### 5️⃣ 验证部署

```bash
# 检查服务状态
docker-compose ps

# 测试 API
curl http://localhost/api/v1/test

# 测试健康检查
curl http://localhost/health
```

---

## 🎯 一键部署脚本

如果已经更新了代码，直接运行：

```bash
./deploy.sh
```

这个脚本会自动：
1. 停止现有服务
2. 使用国内 npm 镜像源
3. 重新构建所有服务
4. 启动并初始化数据库
5. 创建搜索索引

---

## ⏱️ 预计时间

- **首次构建**: 5-10 分钟
- **后续构建**: 2-3 分钟
- **服务启动**: 30 秒

---

## ✅ 成功标志

看到以下输出表示成功：

```
✅ 服务状态检查:
NAME                STATUS
wican-nginx         Up
wican-frontend      Up
wican-backend       Up    ← 关键：后端必须启动
wican-mongodb       Up
wican-meilisearch   Up
wican-minio         Up

🎉 部署完成！
📍 访问地址：http://localhost
🔐 管理后台：http://localhost/admin
```

---

## 🔍 常用检查命令

```bash
# 查看所有容器状态
docker-compose ps

# 查看后端日志
docker-compose logs backend

# 查看前端日志
docker-compose logs frontend

# 查看 MongoDB 日志
docker-compose logs mongodb

# 实时查看所有日志
docker-compose logs -f

# 重启单个服务
docker-compose restart backend

# 进入容器调试
docker-compose exec backend sh
```

---

## 🆘 如果失败

### 后端仍然编译失败

```bash
# 1. 清理并重新构建
docker-compose down
docker-compose build --no-cache backend
docker-compose up -d backend

# 2. 查看详细错误
docker-compose logs backend
```

### MeiliSearch 未启动

```bash
# 1. 检查状态
docker-compose ps meilisearch

# 2. 重启服务
docker-compose restart meilisearch

# 3. 等待 30 秒后测试
sleep 30
curl http://localhost:7700/healths
```

### MongoDB 认证失败

```bash
# 1. 完全清理
docker-compose down -v

# 2. 重新启动
docker-compose up -d mongodb

# 3. 等待初始化
sleep 10

# 4. 重启其他服务
docker-compose restart
```

---

## 📊 GitHub 提交记录

最新修复已提交：

- `6b80b02` - feat: 增强部署脚本错误处理
- `d85d7eb` - fix: 修复 TypeScript 编译错误
- `f009b18` - docs: 添加故障排查指南
- `87e3d74` - fix: 修复 Docker 构建失败问题

仓库：https://github.com/Bluecap666/WeCan

---

## 💡 提示

1. **确保端口未被占用**
   ```bash
   # 检查 80 端口
   sudo lsof -i :80
   
   # 如果有冲突，修改 docker-compose.yml 的端口映射
   ```

2. **确保有足够内存**
   ```bash
   # 至少需要 2GB 可用内存
   free -h
   ```

3. **国内用户建议使用镜像源**
   ```bash
   export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
   ```

4. **查看磁盘空间**
   ```bash
   df -h
   ```

---

**现在可以开始部署了！** 🎉

遇到问题请查看 `TROUBLESHOOTING.md` 获取详细帮助。
