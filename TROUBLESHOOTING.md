# 🔧 故障排查指南

## 问题：Docker 构建失败 - Lockfile not found

### ❌ 错误信息
```
The command '/bin/sh -c if [ -f yarn.lock ]; then yarn --frozen-lockfile;  
elif [ -f package-lock.json ]; then npm ci;  
elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile;  
else echo "Lockfile not found." && exit 1; fi' returned a non-zero code: 1
```

### ✅ 解决方案（已修复）

**问题原因：**
- Dockerfile 依赖锁文件（yarn.lock、package-lock.json 等）
- 项目中没有生成这些锁文件
- 导致构建失败

**修复内容：**
1. ✅ 简化了 Dockerfile，不再依赖锁文件
2. ✅ 使用 `npm install` 替代 `npm ci`（更稳定）
3. ✅ 添加 `--legacy-peer-deps` 参数解决依赖冲突
4. ✅ deploy.sh 设置 npm 国内镜像源加速安装
5. ✅ 使用 `--no-cache` 重新构建确保配置生效

---

## 🚀 重新部署步骤

### 方式一：使用修复后的脚本（推荐）

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 停止现有服务
docker-compose down

# 3. 重新构建并启动（会自动使用新配置）
./deploy.sh
```

### 方式二：手动重新构建

```bash
# 1. 停止所有服务
docker-compose down

# 2. 清理旧镜像
docker-compose build --no-cache

# 3. 启动服务
docker-compose up -d

# 4. 查看日志
docker-compose logs -f
```

### 方式三：完全清理后重新部署

```bash
# 1. 停止并删除所有容器、网络、卷
docker-compose down -v

# 2. 清理悬空镜像
docker image prune -a

# 3. 重新构建和启动
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 验证部署

### 检查服务状态

```bash
# 查看所有容器状态
docker-compose ps

# 应该看到所有服务都是 Up 状态
```

### 查看构建日志

```bash
# 查看前端构建日志
docker-compose logs frontend

# 查看后端构建日志
docker-compose logs backend

# 实时查看所有日志
docker-compose logs -f
```

### 测试访问

```bash
# 测试首页
curl http://localhost

# 测试 API
curl http://localhost/api/v1/test

# 测试健康检查
curl http://localhost/health
```

---

## 🐛 其他可能的问题

### 问题 1：网络连接超时

**错误信息：**
```
npm ERR! network Socket timeout
```

**解决方案：**

1. **使用国内镜像源**（已配置）
   ```bash
   export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
   ```

2. **手动配置 Docker 镜像加速**
   ```bash
   # 编辑 /etc/docker/daemon.json（Linux）
   {
     "registry-mirrors": [
       "https://docker.mirrors.ustc.edu.cn",
       "https://registry.docker-cn.com"
     ]
   }
   
   # 重启 Docker
   sudo systemctl restart docker
   ```

### 问题 2：端口被占用

**错误信息：**
```
Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

**解决方案：**

```bash
# 方案 1：修改端口映射
vim docker-compose.yml
# 将 ports 改为 "8080:80" 和 "4433:443"

# 方案 2：停止占用端口的服务
sudo lsof -i :80
sudo kill -9 <PID>
```

### 问题 3：MeiliSearch 连接失败

**错误信息：**
```
curl: (7) Failed to connect to localhost port 7700
```

**解决方案：**

```bash
# 1. 检查 MeiliSearch 容器状态
docker-compose ps meilisearch

# 2. 查看 MeiliSearch 日志
docker-compose logs meilisearch

# 3. 如果容器未启动，重新构建
docker-compose up -d meilisearch

# 4. 等待 30 秒后重试初始化
sleep 30
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Authorization: Bearer your_master_key' \
  -H 'Content-Type: application/json'
```

### 问题 4：MongoDB 认证失败

**错误信息：**
```
MongoServerError: Authentication failed
```

**解决方案：**

```bash
# 1. 检查 .env 配置
cat .env | grep MONGO

# 2. 确保密码一致
# .env 中的 MONGO_PASSWORD 应该与 init-mongo.js 中的一致

# 3. 重置 MongoDB
docker-compose down -v
docker-compose up -d mongodb

# 等待 MongoDB 启动后重新初始化
sleep 10
docker-compose exec mongodb mongosh \
  -u wikan_user -p wikan_pass \
  --authenticationDatabase admin \
  wikan /docker-entrypoint-initdb.d/init-mongo.js
```

---

## 📝 调试技巧

### 进入容器调试

```bash
# 进入前端容器
docker-compose exec frontend sh

# 进入后端容器
docker-compose exec backend sh

# 进入 MongoDB 容器
docker-compose exec mongodb mongosh
```

### 查看资源使用

```bash
# 查看容器资源占用
docker stats

# 查看磁盘使用
df -h

# 查看 Docker 日志
journalctl -u docker
```

### 重建单个服务

```bash
# 只重建前端
docker-compose build frontend
docker-compose up -d frontend

# 只重建后端
docker-compose build backend
docker-compose up -d backend
```

---

## 🆘 获取帮助

如果以上方法都无法解决问题：

1. **查看详细日志**
   ```bash
   docker-compose logs > error.log
   ```

2. **检查系统要求**
   ```bash
   docker --version
   docker-compose --version
   free -h
   df -h
   ```

3. **提交 Issue**
   - GitHub: https://github.com/Bluecap666/WeCan/issues
   - 包含：错误日志、系统信息、复现步骤

---

## ✅ 成功标志

部署成功后，您应该看到：

```
✅ 服务状态检查:
NAME                STATUS
wican-nginx         Up
wican-frontend      Up
wican-backend       Up
wican-mongodb       Up
wican-meilisearch   Up
wican-minio         Up

🎉 部署完成！
📍 访问地址：http://localhost
🔐 管理后台：http://localhost/admin
```

访问 http://localhost 应该能看到 WeCan Wiki 首页。

---

**最后更新**: 2026-03-04  
**修复版本**: v1.0.1
