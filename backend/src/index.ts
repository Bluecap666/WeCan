import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import Router from '@koa/router'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

const app = new Koa()
const router = new Router()

// 中间件配置
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  formLimit: '10mb',
  jsonLimit: '10mb'
}))

app.use(cors())

// 健康检查
router.get('/health', async (ctx) => {
  ctx.body = {
    success: true,
    message: 'WeCan Wiki API is running',
    timestamp: new Date().toISOString()
  }
})

// API v1 路由
router.prefix('/api/v1')

// 测试接口
router.get('/test', async (ctx) => {
  ctx.body = {
    success: true,
    message: 'API v1 is working',
    version: '1.0.0'
  }
})

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())

// 连接数据库
const connectDB = async () => {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/wikan'
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// 启动服务器
const startServer = async () => {
  // 连接数据库
  await connectDB()
  
  const PORT = parseInt(process.env.PORT || '3001', 10)
  const HOST = '0.0.0.0'  // 云服务器需要绑定到所有网络接口
  
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`)
    console.log(`📍 Health check: http://localhost:${PORT}/health`)
    console.log(`📍 API v1: http://localhost:${PORT}/api/v1/test`)
  })
}

// 错误处理
app.on('error', (err) => {
  console.error('Server error:', err)
})

// 优雅关闭
const gracefulShutdown = (): void => {
  console.log('Shutting down gracefully...')
  mongoose.connection.close(() => {
    process.exit(0)
  })
}

process.on('SIGTERM', () => gracefulShutdown())
process.on('SIGINT', () => gracefulShutdown())

// 启动服务
startServer().catch(console.error)

export default app
