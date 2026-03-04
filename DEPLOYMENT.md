# 🚀 WeCan Wiki 快速部署指南

## 方式一：Docker 一键部署（推荐）

### 前置条件

确保已安装 Docker 和 Docker Compose：

```bash
# 检查 Docker 版本
docker --version          # 应 >= 20.10
docker-compose --version  # 应 >= 2.0
```

### 部署步骤

#### 1. 克隆项目（如果还没有）

```bash
git clone <your-repo-url> WeCan
cd WeCan
```

#### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# （可选）编辑配置文件
# Windows: 用记事本打开 .env
# Linux/Mac: vim .env
```

**必须修改的配置（生产环境）：**

```bash
# 生成安全的 JWT Secret（Linux/Mac）
JWT_SECRET=$(openssl rand -base64 32)

# 或使用在线工具生成
# https://generate-secret.vercel.app/32

# 修改数据库密码
MONGO_PASSWORD=你的安全密码

# 修改搜索引擎密钥
MEILI_MASTER_KEY=你的安全密钥
```

#### 3. 启动服务

**Windows PowerShell:**
```powershell
.\deploy.sh
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

#### 4. 等待部署完成

约 30-60 秒后，看到以下提示表示成功：

```
🎉 部署完成！
📍 访问地址：http://localhost
🔐 管理后台：http://localhost/admin
```

#### 5. 登录系统

打开浏览器访问：http://localhost

**默认账户：**
- 用户名：`admin`
- 密码：`admin123`

⚠️ **首次登录后请立即修改密码！**

---

## 方式二：本地开发模式

适合开发和调试。

### 1. 准备环境

需要安装：
- Node.js 20+
- MongoDB（本地运行可选）

### 2. 启动后端

```bash
cd backend

# 安装依赖
npm install

# 启动开发服务器（热重载）
npm run dev
```

后端将运行在：http://localhost:3001

### 3. 启动前端

打开新终端：

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器（热重载）
npm run dev
```

前端将运行在：http://localhost:3000

---

## 方式三：云服务器部署

### Ubuntu/CentOS 部署

#### 1. 安装 Docker

```bash
# 一键安装 Docker
curl -fsSL https://get.docker.com | bash -s docker

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

#### 2. 安装 Docker Compose

```bash
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

#### 3. 部署项目

```bash
# 克隆项目
git clone <your-repo-url> WeCan
cd WeCan

# 配置环境变量
cp .env.example .env
vim .env  # 修改配置

# 一键部署
chmod +x deploy.sh
./deploy.sh
```

#### 4. 配置域名（可选）

1. **DNS 设置**
   - 在域名服务商添加 A 记录
   - 主机记录：`@` 或 `www`
   - 记录值：你的服务器 IP

2. **修改 Nginx 配置**
   ```bash
   vim nginx/nginx.conf
   # 修改 server_name 为你的域名
   ```

3. **重启 Nginx**
   ```bash
   docker-compose restart nginx
   ```

#### 5. 配置 HTTPS（生产环境必须）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx  # Ubuntu
sudo yum install certbot python3-certbot-nginx      # CentOS

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 3 * * * certbot renew --quiet
```

---

## 🔧 常用运维命令

### 查看服务状态

```bash
# 查看所有容器状态
docker-compose ps

# 查看详细信息
docker inspect wican-frontend
```

### 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
docker-compose logs -f meilisearch

# 查看最近 100 行
docker-compose logs --tail=100 frontend
```

### 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启单个服务
docker-compose restart frontend
docker-compose restart backend

# 重建并重启
docker-compose up -d --build
```

### 停止服务

```bash
# 停止所有服务
docker-compose down

# 停止并删除数据卷（谨慎使用！）
docker-compose down -v

# 停止并清理所有镜像
docker-compose down --rmi all
```

---

## 📊 数据备份与恢复

### 手动备份

```bash
# 导出整个数据库
docker-compose exec mongodb mongodump \
  --uri="mongodb://wikan_user:wikan_pass@localhost:27017/wikan?authSource=admin" \
  --out=./backup_$(date +%Y%m%d)
```

### 使用备份脚本

```bash
# 备份数据
chmod +x scripts/backup.sh
./scripts/backup.sh

# 恢复数据
chmod +x scripts/restore.sh
./scripts/restore.sh ./backups/mongodb_20260304_120000.tar.gz
```

### 定时备份

```bash
# 编辑 crontab
crontab -e

# 添加每天凌晨 3 点备份
0 3 * * * /path/to/WeCan/scripts/backup.sh
```

---

## ❓ 故障排查

### 问题 1：端口被占用

**错误信息：**
```
Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

**解决方案：**

```bash
# 方案 1：修改 docker-compose.yml 端口映射
ports:
  - "8080:80"  # 改为 8080
  - "4433:443" # 改为 4433

# 方案 2：停止占用端口的服务
sudo lsof -i :80
sudo kill -9 <PID>
```

### 问题 2：MongoDB 连接失败

**错误信息：**
```
MongoServerError: Authentication failed
```

**解决方案：**

```bash
# 1. 检查 .env 配置
cat .env | grep MONGO

# 2. 重置 MongoDB 密码
docker-compose exec mongodb mongosh

use admin
db.auth("wikan_user", "wikan_pass")
db.changeUserPassword("wikan_user", "新密码")

# 3. 更新 .env 并重启
vim .env
docker-compose restart backend
```

### 问题 3：前端无法访问后端 API

**解决方案：**

```bash
# 1. 检查后端是否运行
docker-compose ps backend

# 2. 检查 API 地址配置
cat frontend/.env.local
NEXT_PUBLIC_API_URL=http://backend:3001

# 3. 查看后端日志
docker-compose logs backend

# 4. 测试 API
curl http://localhost:3001/api/v1/test
```

### 问题 4：MeiliSearch 搜索失败

**解决方案：**

```bash
# 1. 检查 MeiliSearch 状态
docker-compose ps meilisearch

# 2. 查看日志
docker-compose logs meilisearch

# 3. 重新初始化索引
curl -X POST 'http://localhost:7700/indexes/documents' \
  -H 'Authorization: Bearer 你的 MEILI_MASTER_KEY' \
  -H 'Content-Type: application/json'
```

### 问题 5：容器反复重启

**解决方案：**

```bash
# 1. 查看详细日志
docker-compose logs --tail=200 <service-name>

# 2. 检查资源使用
docker stats

# 3. 检查磁盘空间
df -h

# 4. 清理无用资源
docker system prune -a

# 5. 重新构建
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔐 安全建议

### 1. 修改默认密码

```bash
# 立即修改 admin 密码
# 登录管理后台 -> 个人设置 -> 修改密码
```

### 2. 配置防火墙

```bash
# Ubuntu
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 3. 禁用 root SSH 登录

```bash
sudo vim /etc/ssh/sshd_config
# 修改：PermitRootLogin no
sudo systemctl restart sshd
```

### 4. 定期更新系统

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### 5. 监控日志

```bash
# 查看异常登录
grep "Failed password" /var/log/auth.log

# 监控系统资源
htop
```

---

## 📈 性能优化

### 1. 启用 Redis 缓存

修改 `docker-compose.yml` 添加 Redis：

```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
```

### 2. 配置 CDN

在 `nginx/nginx.conf` 中配置：

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  proxy_pass http://frontend;
  expires 1y;
  add_header Cache-Control "public, immutable";
  add_header X-Cache-Status "HIT";
}
```

### 3. 数据库索引优化

```javascript
// 在 init-mongo.js 中添加
db.documents.createIndex({ createdAt: -1 })
db.documents.createIndex({ viewCount: -1 })
```

### 4. 启用 Gzip 压缩

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml+rss 
           application/json application/javascript;
```

---

## 🆘 获取帮助

- 📖 [完整文档](README.md)
- 🚀 [快速入门](QUICKSTART.md)
- 📁 [项目结构](PROJECT_STRUCTURE.md)
- 📦 [交付清单](DELIVERY.md)

---

**部署完成后，就可以开始使用 WeCan Wiki 了！** ✨
