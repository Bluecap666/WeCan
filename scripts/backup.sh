#!/bin/bash
# 备份脚本

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/mongodb_$DATE"

echo "📦 开始备份 MongoDB 数据..."

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 导出数据库
docker-compose exec mongodb mongodump \
  --uri="mongodb://$MONGO_USERNAME:$MONGO_PASSWORD@localhost:27017/wikan?authSource=admin" \
  --out="$BACKUP_PATH"

if [ $? -eq 0 ]; then
  echo "✅ 备份完成：$BACKUP_PATH"
  
  # 压缩备份
  tar -czf "$BACKUP_PATH.tar.gz" -C "$(dirname $BACKUP_PATH)" "$(basename $BACKUP_PATH)"
  rm -rf "$BACKUP_PATH"
  
  echo "📦 压缩完成：$BACKUP_PATH.tar.gz"
else
  echo "❌ 备份失败"
  exit 1
fi
