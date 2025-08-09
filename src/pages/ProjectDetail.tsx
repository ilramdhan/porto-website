import { motion } from "framer-motion";
import { Github, Eye, ArrowLeft, Calendar, Users, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Mock project data - in real app this would come from API
const projectData: { [key: string]: any } = {
  "saas-dashboard": {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description: "Dashboard real‑time dengan agregasi data, role-based access, dan chart interaktif.",
    longDescription: "Sebuah dashboard analytics comprehensive yang dibangun untuk SaaS enterprise. Platform ini menangani jutaan data points dengan performa optimal, menyediakan insights real-time untuk decision making. Dibangun dengan arsitektur scalable yang dapat handle growth dari startup hingga enterprise scale.",
    tags: ["React", "Supabase", "Recharts", "TypeScript"],
    category: "fullstack",
    github: "https://github.com/yourusername/saas-dashboard",
    preview: "https://saas-dashboard.demo.com",
    duration: "3 bulan",
    team: "3 developer",
    year: "2024",
    status: "Production",
    features: [
      "Real-time data visualization dengan update otomatis",
      "Role-based access control untuk multi-tenant",
      "Custom dashboard builder dengan drag & drop",
      "Export data ke multiple format (PDF, CSV, Excel)",
      "API rate limiting dan caching layer",
      "Responsive design untuk mobile dan desktop"
    ],
    techStack: [
      { name: "React 18", description: "Frontend framework dengan hooks terbaru" },
      { name: "TypeScript", description: "Type safety dan better developer experience" },
      { name: "Supabase", description: "Backend as a service dengan real-time capabilities" },
      { name: "Recharts", description: "Library untuk data visualization" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Vite", description: "Build tool untuk development yang cepat" }
    ],
    challenges: [
      "Optimasi performa untuk handle large dataset (1M+ records)",
      "Implementasi real-time updates tanpa mengorbankan UX",
      "Design system yang konsisten across different chart types",
      "Caching strategy untuk mengurangi database load"
    ],
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500"
    ]
  },
  "ecommerce-headless": {
    id: "ecommerce-headless",
    title: "E‑Commerce Headless",
    description: "Headless storefront dengan cart, checkout, dan integrasi pembayaran.",
    longDescription: "Platform e-commerce headless yang dibangun dengan fokus pada performa dan SEO. Menggunakan Next.js dengan optimasi untuk Core Web Vitals dan conversion rate. Terintegrasi dengan multiple payment gateways dan inventory management system.",
    tags: ["Next.js", "Stripe", "Tailwind", "Prisma"],
    category: "frontend",
    github: "https://github.com/yourusername/ecommerce-headless",
    preview: "https://ecommerce.demo.com",
    duration: "4 bulan",
    team: "2 developer + 1 designer",
    year: "2024",
    status: "Production",
    features: [
      "Server-side rendering untuk SEO optimal",
      "Progressive Web App dengan offline capabilities",
      "Multi-payment gateway (Stripe, PayPal, Bank Transfer)",
      "Advanced search dengan filtering dan sorting",
      "Inventory management dengan real-time stock updates",
      "Admin dashboard untuk product management"
    ],
    techStack: [
      { name: "Next.js 14", description: "React framework dengan App Router" },
      { name: "Stripe", description: "Payment processing dan subscription" },
      { name: "Prisma", description: "Database ORM dengan type safety" },
      { name: "Tailwind CSS", description: "Styling dengan design system" },
      { name: "PostgreSQL", description: "Primary database" },
      { name: "Vercel", description: "Deployment dan hosting" }
    ],
    challenges: [
      "Optimasi Core Web Vitals untuk performa maksimal",
      "Implementasi complex cart logic dengan variants",
      "SEO optimization untuk thousands of product pages",
      "Integrasi dengan multiple third-party services"
    ],
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500"
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData[id || ""];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Proyek tidak ditemukan</h1>
          <Button asChild>
            <Link to="/projects">Kembali ke Proyek</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container flex h-16 items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Proyek
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href={project.preview} target="_blank" rel="noreferrer">
              <Button size="sm" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Preview
              </Button>
            </a>
          </div>
        </nav>
      </header>

      <div className="container py-10">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeIn} className="mb-6">
            <Badge variant="secondary" className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {project.longDescription}
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Durasi</p>
                <p className="font-medium">{project.duration}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Tim</p>
                <p className="font-medium">{project.team}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Code2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Tahun</p>
                <p className="font-medium">{project.year}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ExternalLink className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{project.status}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Images */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <div className="space-y-4">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-[hsl(var(--primary-glow)/0.15)] border border-border" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/5 to-[hsl(var(--primary-glow)/0.1)] border border-border" />
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/5 to-[hsl(var(--primary-glow)/0.1)] border border-border" />
                </div>
              </div>
            </motion.section>

            {/* Features */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-semibold mb-6">Fitur Utama</h2>
              <div className="grid gap-4">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
              <div className="grid gap-4">
                {project.techStack.map((tech: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Challenges */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-2xl font-semibold mb-6">Tantangan & Solusi</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground">{challenge}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Action Buttons */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              className="space-y-4"
            >
              <a href={project.preview} target="_blank" rel="noreferrer" className="block">
                <Button className="w-full" size="lg">
                  <Eye className="mr-2 h-4 w-4" />
                  Live Preview
                </Button>
              </a>
              <a href={project.github} target="_blank" rel="noreferrer" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </Button>
              </a>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">Proyek Terkait</h3>
              <div className="space-y-4">
                {Object.values(projectData)
                  .filter((p: any) => p.id !== project.id && p.category === project.category)
                  .slice(0, 2)
                  .map((relatedProject: any) => (
                    <Card key={relatedProject.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <Link to={`/projects/${relatedProject.id}`}>
                          <h4 className="font-medium mb-2 hover:text-primary transition-colors">
                            {relatedProject.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;