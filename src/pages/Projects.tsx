import { motion } from "framer-motion";
import { Github, Eye, ArrowLeft, Filter } from "lucide-react";
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

const projects = [
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description: "Dashboard real‑time dengan agregasi data, role-based access, dan chart interaktif. Dibangun dengan React dan Supabase untuk handle jutaan data points dengan performa optimal.",
    tags: ["React", "Supabase", "Recharts", "TypeScript"],
    category: "fullstack",
    github: "https://github.com/yourusername/saas-dashboard",
    preview: "https://saas-dashboard.demo.com",
    featured: true,
  },
  {
    id: "ecommerce-headless",
    title: "E‑Commerce Headless",
    description: "Headless storefront dengan cart, checkout, dan integrasi pembayaran. Menggunakan Next.js dengan optimasi SEO dan Core Web Vitals yang excellent.",
    tags: ["Next.js", "Stripe", "Tailwind", "Prisma"],
    category: "frontend",
    github: "https://github.com/yourusername/ecommerce-headless",
    preview: "https://ecommerce.demo.com",
    featured: true,
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat App",
    description: "Aplikasi chat ringan dengan delivery receipts dan presence channel. Menangani thousands concurrent users dengan Supabase Realtime.",
    tags: ["Supabase Realtime", "React", "Zod", "WebSocket"],
    category: "fullstack",
    github: "https://github.com/yourusername/realtime-chat",
    preview: "https://chat.demo.com",
    featured: false,
  },
  {
    id: "design-system",
    title: "Design System Kit",
    description: "Komponen UI terstandardisasi dengan token, tema, dan dokumentasi. Digunakan oleh 10+ tim development untuk konsistensi design.",
    tags: ["Storybook", "Shadcn", "TypeScript", "Figma"],
    category: "frontend",
    github: "https://github.com/yourusername/design-system",
    preview: "https://design-system.demo.com",
    featured: false,
  },
  {
    id: "cms-blog",
    title: "CMS Markdown Blog",
    description: "CMS ringan untuk konten markdown dengan editor dan preview. Fokus pada DX yang excellent dan performa loading yang cepat.",
    tags: ["React", "MDX", "Vite", "TailwindCSS"],
    category: "frontend",
    github: "https://github.com/yourusername/cms-blog",
    preview: "https://blog.demo.com",
    featured: false,
  },
  {
    id: "ai-content",
    title: "AI Content Helper",
    description: "Tool AI untuk ringkas teks dan generate outline artikel. Menggunakan OpenAI API dengan Edge Functions untuk latency rendah.",
    tags: ["OpenAI", "Edge Functions", "Vercel", "API"],
    category: "backend",
    github: "https://github.com/yourusername/ai-content",
    preview: "https://ai-content.demo.com",
    featured: false,
  },
  {
    id: "task-automation",
    title: "Task Automation Platform",
    description: "Platform otomasi task dengan workflow builder visual. Menangani complex business logic dengan drag-and-drop interface.",
    tags: ["Node.js", "React Flow", "PostgreSQL", "Docker"],
    category: "fullstack",
    github: "https://github.com/yourusername/task-automation",
    preview: "https://automation.demo.com",
    featured: false,
  },
  {
    id: "api-gateway",
    title: "Microservices API Gateway",
    description: "API Gateway untuk microservices dengan rate limiting, authentication, dan monitoring. Handle 10k+ requests per second.",
    tags: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    category: "backend",
    github: "https://github.com/yourusername/api-gateway",
    preview: "https://gateway.demo.com",
    featured: false,
  },
  {
    id: "data-visualization",
    title: "Data Visualization Dashboard",
    description: "Dashboard interaktif untuk visualisasi data complex dengan real-time updates. Optimized untuk handle big datasets.",
    tags: ["D3.js", "React", "WebSocket", "Canvas"],
    category: "frontend",
    github: "https://github.com/yourusername/data-viz",
    preview: "https://dataviz.demo.com",
    featured: false,
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

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
          <h1 className="text-lg font-semibold">Semua Proyek</h1>
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
            Portofolio Proyek
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kumpulan lengkap proyek yang telah saya kerjakan, dari frontend hingga backend, 
            serta solusi fullstack yang kompleks.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Proyek Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <motion.article
                key={project.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-[hsl(var(--primary-glow)/0.15)]" />
                <div className="p-6">
                  <Link to={`/projects/${project.id}`}>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors cursor-pointer mb-2">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a 
                      href={project.github} 
                      className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors" 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                    <a 
                      href={project.preview} 
                      className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors" 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <Eye className="h-4 w-4" /> Preview
                    </a>
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
              <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-[hsl(var(--primary-glow)/0.15)]" />
              <div className="p-5">
                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline">+{project.tags.length - 3}</Badge>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a href={project.github} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a href={project.preview} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                    <Eye className="h-4 w-4" /> Preview
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">Tidak ada proyek dalam kategori ini.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;