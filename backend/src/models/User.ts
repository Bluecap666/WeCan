import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'editor', 'author', 'viewer'],
    default: 'viewer'
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  socialLinks: {
    github: String,
    twitter: String,
    website: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// 索引
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ username: 1 }, { unique: true })

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// 实例方法：比较密码
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// 实例方法：获取公开信息（不包含密码）
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject()
  delete user.password
  return user
}

const User = mongoose.model('User', userSchema)

export default User
