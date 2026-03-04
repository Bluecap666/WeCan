import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// 索引
tagSchema.index({ slug: 1 }, { unique: true })
tagSchema.index({ name: 1 })

// 中间件：更新使用次数
tagSchema.pre('save', async function(next) {
  const Document = mongoose.model('Document')
  const count = await Document.countDocuments({ tags: this._id })
  this.count = count
  next()
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
