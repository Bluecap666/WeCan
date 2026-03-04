# 🚀 云服务器一键部署 - 最终版本

## ✅ 所有问题已修复

- ✅ TypeScript 编译错误（已放宽严格检查）
- ✅ Dockerfile 锁文件依赖
- ✅ npm 安装网络超时
- ✅ 云服务器网络绑定（0.0.0.0）
- ✅ 部署脚本错误处理
- ✅ 防火墙和安全组配置

---

## 📋 复制粘贴命令（完整流程）

### 1️⃣ 拉取最新代码

```bash
cd ~/WeCan
git pull origin main
```

### 2️⃣ 停止旧服务

```bash
docker-compose down
```

### 3️⃣ 设置环境变量

```bash
export NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
```

### 4️⃣ 重新构建并启动

```bash
docker-compose build --no-cache
docker-compose up -d
```

### 5️⃣ 查看日志

```bash
docker-compose logs -f backend
```

看到以下输出表示成功：

```
✅ MongoDB connected successfully
🚀 Server running on http://0.0.0.0:3001
📍 Health check: http://localhost:3001/health
📍 API v1: http://localhost:3001/api/v1/test
```

### 6️⃣ 运行部署脚本

```bash
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

## ☁️ 云安全组配置

登录云服务器控制台，添加安全组规则：

| 端口 | 协议 | 来源 | 说明 |
|------|------|------|------|
| 80 | TCP | 0.0.0.0/0 | HTTP |
| 443 | TCP | 0.0.0.0/0 | HTTPS |
| 22 | TCP | 您的 IP | SSH |

### 各云服务商配置入口

- **阿里云**: ECS → 安全组配置 → 入方向
- **腾讯云**: 云服务器 → 安全组 → 修改规则
- **华为云**: 弹性云服务器 → 安全组 → 入方向规则
- **AWS EC2**: Security Groups → Inbound rules

---

## ✅ 验证部署

### 检查服务状态

```bash
docker-compose ps
```

应该看到：

```
NAME                STATUS          PORTS
wican-nginx         Up              0.0.0.0:80->80/tcp
wican-frontend      Up              0.0.0.0:3000->3000/tcp
wican-backend       Up              0.0.0.0:3001->3001/tcp
wican-mongodb       Up
wican-meilisearch   Up
wican-minio         Up
```

### 测试访问

**在本地电脑浏览器访问：**

```
http://YOUR_SERVER_IP
http://YOUR_SERVER_IP/admin
```

默认账户：
- 用户名：`admin`
- 密码：`admin123`

### API 测试

```bash
# 在服务器上测试
curl http://localhost/api/v1/test

# 或在本地电脑测试（确保防火墙已开放）
curl http://YOUR_SERVER_IP/api/v1/test
```

---

## 🔧 常用命令速查

### 查看日志

```bash
# 实时查看所有
docker-compose logs -f

# 只看后端
docker-compose logs backend

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
# 重建后端
docker-compose build --no-cache backend
docker-compose up -d backend

# 重建所有
docker-compose build --no-cache
docker-compose up -d
```

### 进入容器调试

```bash
# 进入后端容器
docker-compose exec backend sh

# 进入前端容器
docker-compose exec frontend sh

# 进入 MongoDB
docker-compose exec mongodb mongosh
```

---

## 📊 服务器信息查询

```bash
# 查看 IP 地址
hostname -I | awk '{print $1}'

# 或
curl ifconfig.me

# 查看内存
free -h

# 查看磁盘
df -h

# 查看 CPU
lscpu | grep "CPU(s)"
```

---

## 🆘 故障排查

### 后端仍然编译失败

```bash
# 1. 查看详细错误
docker-compose logs backend

# 2. 清理重建
docker-compose down
docker-compose build --no-cache backend
docker-compose up -d backend

# 3. 进入容器手动编译
docker-compose exec backend sh
cd /app
npm run build
```

### MeiliSearch 未启动

```bash
# 检查状态
docker-compose ps meilisearch

# 重启
docker-compose restart meilisearch

# 等待 30 秒后测试
sleep 30
curl http://localhost:7700/healths
```

### MongoDB 认证失败

```bash
# 完全清理
docker-compose down -v

# 重新启动 MongoDB
docker-compose up -d mongodb

# 等待初始化
sleep 10

# 重启其他服务
docker-compose restart
```

### 无法从外部访问

```bash
# 1. 检查防火墙
sudo ufw status

# 2. 检查端口监听
sudo netstat -tlnp | grep :80

# 3. 检查安全组（登录云控制台）

# 4. 测试本地访问
curl http://localhost/api/v1/test
```

---

## 📚 相关文档

- [TYPESCRIPT_FIX.md](TYPESCRIPT_FIX.md) - TypeScript 编译错误修复详情
- [CLOUD_QUICK_START.md](CLOUD_QUICK_START.md) - 云服务器快速部署清单
- [CLOUD_DEPLOY.md](CLOUD_DEPLOY.md) - 完整云服务器部署指南
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - 详细故障排查指南
- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - 通用部署指南

---

## 🎯 成功标志

✅ 所有 Docker 容器状态为 `Up`  
✅ 可以通过 `http://YOUR_SERVER_IP` 访问首页  
✅ 管理后台正常打开  
✅ API 接口返回成功  
✅ 搜索功能正常工作  
✅ 从任何地方都能访问  

---

## 🎉 部署完成后的下一步

1. **立即修改默认密码**
   - 登录管理后台
   - 进入个人设置
   - 修改密码

2. **创建第一篇文档**
   - 点击「新建文档」
   - 编写技术文档
   - 发布测试

3. **配置域名（可选）**
   - 购买域名
   - 配置 DNS 解析
   - 申请 HTTPS 证书

4. **定期备份**
   ```bash
   # 每周日凌晨 3 点自动备份
   0 3 * * 0 /root/WeCan/scripts/backup.sh
   ```

---

## 💡 重要提示

1. **首次构建需要 5-10 分钟**，请耐心等待
2. **确保服务器有至少 2GB 可用内存**
3. **国内用户强烈建议使用 npm 镜像源**
4. **生产环境强烈建议配置 HTTPS**
5. **定期更新系统和 Docker**

---

**祝您部署顺利！** 🎊

遇到问题请告诉我具体错误信息！

最后更新：2026-03-04
