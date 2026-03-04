import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  version: {
    type: Number,
    default: 1
  },
  parentDocId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  attachments: [{
    url: String,
    name: String,
    size: Number,
    uploadedAt: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// 索引
documentSchema.index({ slug: 1 }, { unique: true })
documentSchema.index({ categoryId: 1, status: 1, publishedAt: -1 })
documentSchema.index({ tags: 1 })
documentSchema.index({ authorId: 1 })
documentSchema.index({ title: 'text', content: 'text' })

// 虚拟字段：发布时间
documentSchema.virtual('publishedAt').get(function() {
  return this.status === 'published' ? this.createdAt : null
})

// 实例方法：增加浏览次数
documentSchema.methods.incrementViewCount = function() {
  this.viewCount += 1
  return this.save()
}

// 静态方法：查找已发布文档
documentSchema.statics.findPublished = function(query = {}) {
  return this.find({ ...query, status: 'published' })
}

// 中间件：保存前更新版本号
documentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.version += 1
  }
  next()
})

const Document = mongoose.model('Document', documentSchema)

export default Document
