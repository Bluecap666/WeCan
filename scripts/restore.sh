#!/bin/bash
# 恢复脚本

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ 请提供备份文件路径"
  echo "用法：./restore.sh <备份文件.tar.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ 备份文件不存在：$BACKUP_FILE"
  exit 1
fi

echo "📦 开始恢复 MongoDB 数据..."

# 解压备份
TEMP_DIR=$(mktemp -d)
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# 找到解压后的目录
BACKUP_DIR=$(find "$TEMP_DIR" -type d -name "mongodb_*" | head -n 1)

if [ -z "$BACKUP_DIR" ]; then
  echo "❌ 无效的备份文件"
  exit 1
fi

# 恢复数据
docker-compose exec mongodb mongorestore \
  --uri="mongodb://$MONGO_USERNAME:$MONGO_PASSWORD@localhost:27017/wikan?authSource=admin" \
  --drop \
  "$BACKUP_DIR"

if [ $? -eq 0 ]; then
  echo "✅ 数据恢复完成！"
else
  echo "❌ 数据恢复失败"
  exit 1
fi

# 清理临时文件
rm -rf "$TEMP_DIR"
