import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
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
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  path: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  icon: {
    type: String
  },
  description: {
    type: String,
    maxlength: 500
  },
  depth: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// 索引
categorySchema.index({ slug: 1 }, { unique: true })
categorySchema.index({ parentId: 1 })
categorySchema.index({ path: 1 })
categorySchema.index({ order: 1 })

// 中间件：自动生成路径
categorySchema.pre('save', async function(next) {
  if (this.parentId) {
    const parent = await mongoose.model('Category').findById(this.parentId)
    if (parent) {
      this.path = `${parent.path}/${this.slug}`
      this.depth = parent.depth + 1
    }
  } else {
    this.path = `/${this.slug}`
    this.depth = 0
  }
  next()
})

const Category = mongoose.model('Category', categorySchema)

export default Category
