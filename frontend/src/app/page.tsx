import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            WeCan Wiki
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            IT 全领域知识库系统
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            涵盖编程语言、Web 开发、数据库、云计算、网络安全等所有 IT 技术领域
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索技术文档..."
                className="w-full px-6 py-4 text-lg border border-border rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Link href="/category/foundation" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">基础理论</h3>
              <p className="text-muted-foreground">计算机科学基础、软件工程、数学基础</p>
            </div>
          </Link>

          <Link href="/category/languages" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">编程语言</h3>
              <p className="text-muted-foreground">JavaScript、Python、Java、Go、Rust</p>
            </div>
          </Link>

          <Link href="/category/web" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Web 开发</h3>
              <p className="text-muted-foreground">前端、后端、全栈开发技术</p>
            </div>
          </Link>

          <Link href="/category/database" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">数据库</h3>
              <p className="text-muted-foreground">MySQL、PostgreSQL、MongoDB、Redis</p>
            </div>
          </Link>

          <Link href="/category/devops" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">云计算与 DevOps</h3>
              <p className="text-muted-foreground">Docker、Kubernetes、CI/CD</p>
            </div>
          </Link>

          <Link href="/category/security" className="group">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">网络安全</h3>
              <p className="text-muted-foreground">应用安全、网络安全、合规标准</p>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-card border border-border rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">知识库统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">技术文档</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">技术分类</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10000+</div>
              <div className="text-muted-foreground">代码示例</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">持续更新</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">开始探索</h2>
          <p className="text-muted-foreground mb-8">立即访问我们的知识库，提升你的技术能力</p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/category"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-block"
            >
              浏览分类
            </Link>
            <Link 
              href="/admin"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg hover:bg-secondary/80 transition-colors inline-block"
            >
              管理后台
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
