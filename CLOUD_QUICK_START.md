# 📋 云服务器部署 - 快速命令清单

## ✅ 配置已优化

所有服务现已绑定到 `0.0.0.0`，支持外部访问！

---

## 🚀 一键部署（复制粘贴）

### 完整流程

```bash
# 1. 进入项目目录
cd ~/WeCan

# 2. 拉取最新代码
git pull origin main

# 3. 停止旧服务
docker-compose down

# 4. 设置 npm 镜像源（加速）
export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com

# 5. 重新构建并启动
docker-compose build --no-cache
docker-compose up -d

# 6. 运行部署脚本（会显示服务器 IP）
./deploy.sh
```

---

## 🔐 防火墙配置（必须执行）

### Ubuntu/Debian

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
sudo ufw status
```

### CentOS/RHEL

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

---

## ☁️ 云服务商安全组配置

### 阿里云

控制台 → 云服务器 ECS → 安全组配置 → 入方向规则

添加：
- TCP:80 (HTTP)
- TCP:443 (HTTPS)
- TCP:22 (SSH，限制您的 IP)

### 腾讯云

控制台 → 云服务器 → 安全组 → 修改规则

添加入站规则：
- 协议端口：TCP:80, TCP:443, TCP:22
- 来源：0.0.0.0/0

### 华为云

弹性云服务器 → 安全组 → 配置规则 → 入方向

开放端口：80, 443, 22

### AWS EC2

Security Groups → Inbound rules → Edit

添加：
- HTTP (Port 80) from 0.0.0.0/0
- HTTPS (Port 443) from 0.0.0.0/0

---

## 🌐 域名配置（可选）

### DNS 解析

在域名控制台添加 A 记录：

```
主机记录：@
记录类型：A
记录值：YOUR_SERVER_IP
TTL: 600

主机记录：www
记录类型：A
记录值：YOUR_SERVER_IP
TTL: 600
```

### 验证 DNS

```bash
ping your-domain.com
nslookup your-domain.com
```

---

## 🔒 HTTPS 配置（推荐）

### 获取 Let's Encrypt 证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx  # Ubuntu
sudo yum install certbot python3-certbot-nginx  # CentOS

# 停止 Nginx
docker-compose stop nginx

# 获取证书
sudo certbot certonly --standalone \
  -d your-domain.com \
  -d www.your-domain.com

# 复制证书
mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/

# 重启 Nginx
docker-compose restart nginx
```

---

## ✅ 验证部署

### 检查服务状态

```bash
docker-compose ps
```

应该看到：
```
NAME                STATUS
wican-nginx         Up
wican-frontend      Up
wican-backend       Up
wican-mongodb       Up
wican-meilisearch   Up
```

### 测试访问

```bash
# 本地测试
curl http://localhost/api/v1/test
curl http://localhost/health

# 外部访问测试（在本地电脑执行）
curl http://YOUR_SERVER_IP/api/v1/test
curl http://YOUR_SERVER_IP/health

# 浏览器访问
# http://YOUR_SERVER_IP
# http://YOUR_SERVER_IP/admin
```

### 检查端口监听

```bash
sudo netstat -tlnp | grep :80
# 应该看到 0.0.0.0:80
```

---

## 🔧 常用命令

### 查看日志

```bash
# 实时查看所有日志
docker-compose logs -f

# 只看后端
docker-compose logs backend

# 只看前端
docker-compose logs frontend

# 查看最近 100 行
docker-compose logs --tail=100 backend
```

### 重启服务

```bash
# 重启所有
docker-compose restart

# 重启单个
docker-compose restart backend
docker-compose restart frontend
docker-compose restart nginx
```

### 停止服务

```bash
# 停止所有
docker-compose down

# 完全清理（删除数据卷）
docker-compose down -v
```

### 重建服务

```bash
# 重建单个服务
docker-compose build --no-cache backend
docker-compose up -d backend

# 重建所有
docker-compose build --no-cache
docker-compose up -d
```

---

## 📊 服务器 IP 查询

```bash
# 方法 1
hostname -I | awk '{print $1}'

# 方法 2
curl ifconfig.me

# 方法 3
curl ipinfo.io/ip
```

---

## 🆘 故障排查

### 无法访问

```bash
# 1. 检查防火墙
sudo ufw status

# 2. 检查端口监听
sudo netstat -tlnp | grep :80

# 3. 检查 Docker 容器
docker-compose ps
docker-compose logs backend

# 4. 测试本地访问
curl http://localhost/api/v1/test
```

### 后端编译失败

```bash
# 查看详细错误
docker-compose logs backend

# 清理重建
docker-compose down
docker-compose build --no-cache backend
docker-compose up -d backend
```

### MeiliSearch 未启动

```bash
# 检查状态
docker-compose ps meilisearch

# 重启
docker-compose restart meilisearch

# 等待 30 秒
sleep 30

# 测试
curl http://localhost:7700/healths
```

---

## 📈 性能监控

### 资源使用

```bash
# 查看容器资源
docker stats

# 查看服务器资源
free -h
df -h
top
```

### 磁盘清理

```bash
# 清理悬空镜像
docker image prune -f

# 清理所有未使用资源
docker system prune -a
```

---

## 🎯 成功标志

✅ 所有服务 `Up` 状态  
✅ 可以通过 `http://YOUR_SERVER_IP` 访问  
✅ 管理后台正常打开  
✅ API 接口返回成功  
✅ 搜索功能正常工作  

---

## 📖 详细文档

- [完整云服务器部署指南](CLOUD_DEPLOY.md)
- [故障排查指南](TROUBLESHOOTING.md)
- [快速部署指南](DEPLOY_GUIDE.md)

---

**祝您部署顺利！** 🎉

最后更新：2026-03-04
