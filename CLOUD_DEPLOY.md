# ☁️ 云服务器部署完整指南

## ✅ 已配置云服务器优化

### 🎯 网络绑定配置

所有服务已配置为监听 `0.0.0.0`，可以从外部访问：

- ✅ **后端服务**: 绑定到 `0.0.0.0:3001`
- ✅ **前端服务**: 绑定到 `0.0.0.0:3000`
- ✅ **Nginx**: 监听 `0.0.0.0:80` 和 `0.0.0.0:443`

---

## 🚀 一键部署到云服务器

### 方式一：自动获取 IP（推荐）

```bash
# 1. 拉取最新代码
cd ~/WeCan
git pull origin main

# 2. 停止旧服务
docker-compose down

# 3. 设置环境变量
export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com

# 4. 重新构建并启动
docker-compose build --no-cache
docker-compose up -d

# 5. 查看部署信息（会显示服务器 IP）
./deploy.sh
```

部署成功后会显示：

```
🎉 部署完成！
📍 本地访问地址：http://localhost
📍 云服务器访问地址：http://YOUR_SERVER_IP
🔐 管理后台：http://YOUR_SERVER_IP/admin
```

### 方式二：手动指定 HOST

如果需要指定特定网络接口：

```bash
# 编辑 docker-compose.yml
vim docker-compose.yml

# 在需要的服务中添加 environment
environment:
  - HOST=0.0.0.0
  - PORT=3000
```

---

## 🔐 防火墙和安全组配置

### 阿里云 ECS

#### 1. 配置安全组规则

1. 登录阿里云控制台
2. 进入 **云服务器 ECS** → **实例**
3. 找到您的实例，点击 **更多** → **网络和安全组** → **安全组配置**
4. 点击 **配置规则** → **入方向** → **添加规则**

添加以下规则：

| 优先级 | 协议 | 端口范围 | 授权对象 | 描述 |
|--------|------|----------|----------|------|
| 1 | TCP | 80/80 | 0.0.0.0/0 | HTTP 访问 |
| 1 | TCP | 443/443 | 0.0.0.0/0 | HTTPS 访问 |
| 1 | TCP | 22/22 | 您的 IP | SSH 连接 |

#### 2. 检查系统防火墙

```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

### 腾讯云 CVM

#### 1. 配置安全组

1. 登录腾讯云控制台
2. 进入 **云服务器** → **安全组**
3. 选择您的安全组，点击 **修改规则**
4. 添加入站规则：
   - 类型：自定义
   - 协议端口：TCP:80, TCP:443, TCP:22
   - 来源：0.0.0.0/0

### 华为云 ECS

#### 1. 配置安全组

1. 登录华为云控制台
2. 进入 **弹性云服务器** → **安全组**
3. 点击 **配置规则** → **入方向规则**
4. 添加规则开放 80、443 端口

### AWS EC2

#### 1. 配置安全组

1. 登录 AWS 控制台
2. 进入 **EC2** → **Security Groups**
3. 选择您的安全组，编辑 **Inbound rules**
4. 添加规则：
   - Type: HTTP (Port 80)
   - Source: 0.0.0.0/0
   - Type: HTTPS (Port 443)
   - Source: 0.0.0.0/0

### DigitalOcean Droplet

#### 1. 配置防火墙

```bash
# 使用 ufw
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

---

## 🌐 域名配置（可选）

### 1. 购买域名

在域名服务商处购买域名（如阿里云、腾讯云、GoDaddy 等）

### 2. 添加 DNS 解析

登录域名管理控制台，添加 A 记录：

| 主机记录 | 记录类型 | 记录值 | TTL |
|----------|----------|--------|-----|
| @ | A | 您的服务器公网 IP | 600 |
| www | A | 您的服务器公网 IP | 600 |

### 3. 验证 DNS

```bash
# 等待几分钟后测试
ping your-domain.com
nslookup your-domain.com
```

### 4. 配置 Nginx

修改 `nginx/nginx.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # ... 其他配置
}
```

重启 Nginx：

```bash
docker-compose restart nginx
```

---

## 🔒 HTTPS 配置（强烈推荐）

### 使用 Let's Encrypt 免费证书

#### 1. 安装 Certbot

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

#### 2. 获取证书

```bash
# 停止 Nginx（避免端口冲突）
docker-compose stop nginx

# 获取证书（standalone 模式）
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# 按照提示输入邮箱和同意条款
```

#### 3. 配置 Nginx SSL

修改 `nginx/nginx.conf`，取消注释 HTTPS 配置块：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://frontend;
        # ... 其他配置
    }

    location /api/ {
        proxy_pass http://backend;
        # ... 其他配置
    }
}

# HTTP 自动跳转 HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

#### 4. 复制证书到 Nginx 目录

```bash
# 创建 SSL 目录
mkdir -p nginx/ssl

# 复制证书
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/

# 设置权限
chmod 644 nginx/ssl/*
```

#### 5. 重启 Nginx

```bash
docker-compose restart nginx
```

#### 6. 自动续期

Let's Encrypt 证书有效期 90 天，需要自动续期：

```bash
# 编辑 crontab
sudo crontab -e

# 添加以下内容（每月 1 号凌晨 3 点检查续期）
0 3 1 * * certbot renew --quiet --deploy-hook "docker-compose restart nginx"
```

---

## 📊 验证部署

### 1. 检查服务状态

```bash
docker-compose ps
```

应该看到所有服务都是 `Up` 状态。

### 2. 从外部访问测试

```bash
# 在本地电脑执行（不是在服务器上）
curl http://YOUR_SERVER_IP/api/v1/test
curl http://YOUR_SERVER_IP/health

# 或使用浏览器访问
# http://YOUR_SERVER_IP
```

### 3. 检查端口监听

```bash
# 查看 80 端口
sudo netstat -tlnp | grep :80

# 或使用 ss 命令
sudo ss -tlnp | grep :80
```

应该看到 Nginx 监听在 `0.0.0.0:80`

### 4. 测试防火墙

```bash
# 从本地电脑测试
telnet YOUR_SERVER_IP 80

# 或使用 curl
curl -I http://YOUR_SERVER_IP
```

---

## 🔧 常见问题排查

### Q1: 无法从外部访问

**解决方案：**

1. **检查安全组规则**
   ```bash
   # 确保 80 端口已开放
   sudo ufw status
   ```

2. **检查服务是否监听 0.0.0.0**
   ```bash
   sudo netstat -tlnp | grep :3000
   # 应该看到 0.0.0.0:3000 而不是 127.0.0.1:3000
   ```

3. **检查 Docker 容器**
   ```bash
   docker-compose ps
   docker-compose logs frontend
   ```

### Q2: 证书申请失败

**解决方案：**

```bash
# 确保 80 端口未被占用
sudo systemctl stop nginx  # 如果安装了系统 nginx
docker-compose stop nginx

# 重试证书申请
sudo certbot certonly --standalone -d your-domain.com
```

### Q3: 域名解析不生效

**解决方案：**

1. 等待 DNS 传播（通常几分钟到几小时）
2. 检查 DNS 记录是否正确
   ```bash
   nslookup your-domain.com
   dig your-domain.com
   ```
3. 清除本地 DNS 缓存
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

### Q4: HTTPS 重定向循环

**解决方案：**

检查 Nginx 配置，确保 HTTP 到 HTTPS 的重定向逻辑正确：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    # ... 其他配置
}
```

---

## 📈 性能优化建议

### 1. 启用 Gzip 压缩

在 `nginx/nginx.conf` 的 `http` 块中添加：

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied expired no-cache no-store private auth;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml 
           application/javascript application/json;
```

### 2. 配置 CDN（可选）

对于静态资源，可以使用 CDN 加速：

1. 在云服务商开通 CDN 服务
2. 配置 CDN 源站为您的服务器 IP
3. 修改 Nginx 配置，将静态资源指向 CDN 域名

### 3. 数据库优化

```javascript
// 在 init-mongo.js 中添加索引
db.documents.createIndex({ createdAt: -1 })
db.documents.createIndex({ viewCount: -1 })
db.documents.createIndex({ 'seo.keywords': 1 })
```

---

## 🆘 获取帮助

- 📖 [故障排查指南](TROUBLESHOOTING.md)
- 🚀 [快速部署指南](DEPLOY_GUIDE.md)
- 📧 Email: support@wikan.com

---

## ✅ 成功标志

部署成功后，您应该能够：

1. ✅ 通过 `http://YOUR_SERVER_IP` 访问首页
2. ✅ 通过 `http://YOUR_SERVER_IP/admin` 访问管理后台
3. ✅ API 接口正常响应
4. ✅ 搜索功能正常工作
5. ✅ 从任何地方都能访问（不受服务器地理位置限制）

---

**祝您部署顺利！** 🎉

最后更新：2026-03-04
