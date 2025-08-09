import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const articles = [
  {
    id: "saas-architecture",
    title: "Mendesain arsitektur scalable untuk aplikasi SaaS",
    summary: "Prinsip dan trade-off dalam membangun multi-tenant SaaS yang efisien.",
    date: "2025-05-01",
    tags: ["Arsitektur", "SaaS", "PostgreSQL"],
    category: "backend",
    readTime: "8 min",
    featured: true,
  },
  {
    id: "react-performance",
    title: "Optimasi performa React: dari profil hingga caching",
    summary: "Strategi nyata menaikkan Core Web Vitals tanpa mengorbankan DX.",
    date: "2025-04-12",
    tags: ["React", "Perf", "Caching"],
    category: "frontend",
    readTime: "12 min",
    featured: true,
  },
  {
    id: "devops-workflow",
    title: "Workflow DevOps ringan untuk tim kecil",
    summary: "Membangun CI/CD yang andal, observability, dan praktik rilis yang aman.",
    date: "2025-03-22",
    tags: ["DevOps", "CI/CD", "Observability"],
    category: "devops",
    readTime: "10 min",
    featured: false,
  },
  {
    id: "typescript-patterns",
    title: "TypeScript Design Patterns untuk aplikasi besar",
    summary: "Pattern dan best practices TypeScript untuk maintainability jangka panjang.",
    date: "2025-02-15",
    tags: ["TypeScript", "Patterns", "Architecture"],
    category: "frontend",
    readTime: "15 min",
    featured: false,
  },
  {
    id: "database-optimization",
    title: "Optimasi database PostgreSQL untuk high traffic",
    summary: "Teknik indexing, query optimization, dan connection pooling untuk performa maksimal.",
    date: "2025-01-28",
    tags: ["PostgreSQL", "Performance", "Database"],
    category: "backend",
    readTime: "11 min",
    featured: false,
  },
  {
    id: "microservices-patterns",
    title: "Microservices patterns yang benar-benar berguna",
    summary: "Pattern praktis untuk komunikasi antar service dan data consistency.",
    date: "2025-01-10",
    tags: ["Microservices", "Architecture", "Patterns"],
    category: "backend",
    readTime: "14 min",
    featured: false,
  },
  {
    id: "frontend-testing",
    title: "Testing strategy untuk aplikasi React modern",
    summary: "Pendekatan testing yang pragmatis dengan Jest, Testing Library, dan Cypress.",
    date: "2024-12-20",
    tags: ["Testing", "React", "Jest", "Cypress"],
    category: "frontend",
    readTime: "13 min",
    featured: false,
  },
  {
    id: "api-design",
    title: "REST API design yang developer-friendly",
    summary: "Prinsip design API yang mudah dipahami dan digunakan oleh developer lain.",
    date: "2024-12-05",
    tags: ["API", "REST", "Design"],
    category: "backend",
    readTime: "9 min",
    featured: false,
  },
  {
    id: "docker-optimization",
    title: "Optimasi Docker images untuk production",
    summary: "Teknik untuk mengurangi size dan meningkatkan security Docker images.",
    date: "2024-11-18",
    tags: ["Docker", "DevOps", "Security"],
    category: "devops",
    readTime: "11 min",
    featured: false,
  },
];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const featuredArticles = articles.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container flex h-16 items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Semua Artikel</h1>
          <div /> {/* Spacer */}
        </nav>
      </header>

      <div className="container py-10">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">
            Artikel & Tulisan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kumpulan artikel tentang engineering, arsitektur software, dan best practices 
            dalam development. Berbagi pengalaman dan insights dari proyek nyata.
          </p>
        </motion.div>

        {/* Featured Articles */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Artikel Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <motion.article
                key={article.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <Link to={`/articles/${article.id}`}>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors cursor-pointer mb-2">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="devops">DevOps</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* All Articles Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={fadeIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Link to={`/articles/${article.id}`}>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge variant="outline">+{article.tags.length - 3}</Badge>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">Tidak ada artikel dalam kategori ini.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;