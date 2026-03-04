#!/bin/bash
# deploy.sh - 一键部署脚本

echo "🚀 开始部署 WeCan Wiki 知识库..."

# 1. 检查环境变量
if [ ! -f .env ]; then
  echo "❌ 缺少.env 文件，请从.env.example 复制并配置"
  echo "   执行：cp .env.example .env"
  exit 1
fi

# 2. 加载环境变量
source .env

# 3. 停止现有服务（如果有）
echo "⏹️  停止现有服务..."
docker-compose down

# 4. 构建并启动服务
echo "🏗️  构建 Docker 镜像..."
docker-compose build

echo "🚀 启动服务..."
docker-compose up -d

# 5. 等待服务就绪
echo "⏳ 等待服务启动..."
sleep 15

# 6. 初始化数据库
echo "📦 初始化数据库..."
docker-compose exec -T mongodb mongosh \
  -u $MONGO_USERNAME \
  -p $MONGO_PASSWORD \
  --authenticationDatabase admin \
  wikan /docker-entrypoint-initdb.d/init-mongo.js

# 7. 初始化搜索引擎索引
echo "🔍 初始化搜索索引..."
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Authorization: Bearer '$MEILI_MASTER_KEY \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "uid": "documents",
    "primaryKey": "id",
    "sortableAttributes": ["createdAt", "updatedAt"],
    "searchableAttributes": ["title", "content", "tags"]
  }' || echo "⚠️  MeiliSearch 索引创建失败（可能已存在）"

# 8. 检查服务状态
echo ""
echo "✅ 服务状态检查:"
docker-compose ps

echo ""
echo "🎉 部署完成！"
echo "📍 访问地址：http://localhost"
echo "🔐 管理后台：http://localhost/admin"
echo ""
echo "💡 提示："
echo "   - 查看日志：docker-compose logs -f"
echo "   - 停止服务：docker-compose down"
echo "   - 重启服务：docker-compose restart"
