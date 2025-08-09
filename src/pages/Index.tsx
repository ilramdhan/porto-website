import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ExternalLink, ArrowRight, Code2, Cpu, Layers, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function usePointerGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);
  return pos;
}

const SocialLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<any> }) => (
  <a
    href={href}
    aria-label={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-5 w-5" />
  </a>
);

const SectionHeader = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <motion.header variants={fadeIn} className="mx-auto mb-10 max-w-3xl text-center">
    <p className="mb-2 text-sm font-medium text-muted-foreground">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {description ? (
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
    ) : null}
  </motion.header>
);

const skills = {
  Frontend: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
  Backend: ["Node.js", "Express", "PostgreSQL", "Supabase", "Prisma"],
  DevOps: ["Docker", "CI/CD", "Vercel", "Cloudflare", "NGINX"],
  Tools: ["Git", "Jest", "ESLint", "Figma", "Postman"],
};

const projects = [
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description: "Dashboard real‑time dengan agregasi data, role-based access, dan chart interaktif.",
    tags: ["React", "Supabase", "Recharts"],
    category: "fullstack",
    github: "https://github.com/yourusername/saas-dashboard",
    preview: "https://saas-dashboard.demo.com",
  },
  {
    id: "ecommerce-headless",
    title: "E‑Commerce Headless",
    description: "Headless storefront dengan cart, checkout, dan integrasi pembayaran.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    category: "frontend",
    github: "https://github.com/yourusername/ecommerce-headless",
    preview: "https://ecommerce.demo.com",
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat App",
    description: "Aplikasi chat ringan dengan delivery receipts dan presence channel.",
    tags: ["Supabase Realtime", "React", "Zod"],
    category: "fullstack",
    github: "https://github.com/yourusername/realtime-chat",
    preview: "https://chat.demo.com",
  },
  {
    id: "design-system",
    title: "Design System Kit",
    description: "Komponen UI terstandardisasi dengan token, tema, dan dokumentasi.",
    tags: ["Storybook", "Shadcn", "TypeScript"],
    category: "frontend",
    github: "https://github.com/yourusername/design-system",
    preview: "https://design-system.demo.com",
  },
  {
    id: "cms-blog",
    title: "CMS Markdown Blog",
    description: "CMS ringan untuk konten markdown dengan editor dan preview.",
    tags: ["React", "MDX", "Vite"],
    category: "frontend",
    github: "https://github.com/yourusername/cms-blog",
    preview: "https://blog.demo.com",
  },
  {
    id: "ai-content",
    title: "AI Content Helper",
    description: "Tool AI untuk ringkas teks dan generate outline artikel.",
    tags: ["OpenAI", "Edge Functions"],
    category: "backend",
    github: "https://github.com/yourusername/ai-content",
    preview: "https://ai-content.demo.com",
  },
];

const articles = [
  {
    id: "saas-architecture",
    title: "Mendesain arsitektur scalable untuk aplikasi SaaS",
    summary: "Prinsip dan trade-off dalam membangun multi-tenant SaaS yang efisien.",
    date: "2025-05-01",
    tags: ["Arsitektur", "SaaS", "PostgreSQL"],
    category: "backend",
    readTime: "8 min",
  },
  {
    id: "react-performance",
    title: "Optimasi performa React: dari profil hingga caching",
    summary: "Strategi nyata menaikkan Core Web Vitals tanpa mengorbankan DX.",
    date: "2025-04-12",
    tags: ["React", "Perf", "Caching"],
    category: "frontend",
    readTime: "12 min",
  },
  {
    id: "devops-workflow",
    title: "Workflow DevOps ringan untuk tim kecil",
    summary: "Membangun CI/CD yang andal, observability, dan praktik rilis yang aman.",
    date: "2025-03-22",
    tags: ["DevOps", "CI/CD", "Observability"],
    category: "devops",
    readTime: "10 min",
  },
  {
    id: "typescript-patterns",
    title: "TypeScript Design Patterns untuk aplikasi besar",
    summary: "Pattern dan best practices TypeScript untuk maintainability jangka panjang.",
    date: "2025-02-15",
    tags: ["TypeScript", "Patterns", "Architecture"],
    category: "frontend",
    readTime: "15 min",
  },
  {
    id: "database-optimization",
    title: "Optimasi database PostgreSQL untuk high traffic",
    summary: "Teknik indexing, query optimization, dan connection pooling untuk performa maksimal.",
    date: "2025-01-28",
    tags: ["PostgreSQL", "Performance", "Database"],
    category: "backend",
    readTime: "11 min",
  },
  {
    id: "microservices-patterns",
    title: "Microservices patterns yang benar-benar berguna",
    summary: "Pattern praktis untuk komunikasi antar service dan data consistency.",
    date: "2025-01-10",
    tags: ["Microservices", "Architecture", "Patterns"],
    category: "backend",
    readTime: "14 min",
  },
];

const experiences = [
  {
    company: "TechNova Studio",
    role: "Senior Fullstack Developer",
    period: "2023 — Sekarang",
    points: [
      "Memimpin pengembangan fitur multi-tenant untuk aplikasi B2B",
      "Optimasi performa hingga 40% melalui code‑splitting dan caching",
    ],
  },
  {
    company: "SkyLabs",
    role: "Fullstack Developer",
    period: "2021 — 2023",
    points: [
      "Membangun API GraphQL dan sistem autentikasi aman",
      "Menyusun CI/CD pipeline dan containerization dengan Docker",
    ],
  },
  {
    company: "Freelance",
    role: "Software Engineer",
    period: "2019 — 2021",
    points: [
      "Mengirim lebih dari 20+ proyek web untuk klien UMKM dan startup",
      "Kolaborasi lintas-disiplin dengan tim desain dan produk",
    ],
  },
];

const Index = () => {
  const { x, y } = usePointerGlow();
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("all");
  const [selectedArticleCategory, setSelectedArticleCategory] = useState("all");

  const filteredProjects = selectedProjectCategory === "all" 
    ? projects.slice(0, 6) 
    : projects.filter(p => p.category === selectedProjectCategory).slice(0, 6);

  const filteredArticles = selectedArticleCategory === "all" 
    ? articles.slice(0, 6) 
    : articles.filter(a => a.category === selectedArticleCategory).slice(0, 6);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ilham Ramadhan",
      jobTitle: "Fullstack Developer",
      url: typeof window !== "undefined" ? window.location.origin : "https://ilhamramadhan.dev",
      sameAs: [
        "https://github.com/yourusername",
        "https://www.linkedin.com/in/yourusername/",
        "mailto:hello@ilhamramadhan.dev",
      ],
      worksFor: {
        "@type": "Organization",
        name: "TechNova Studio",
      },
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "DevOps",
      ],
    }),
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@ilhamramadhan.dev");
      toast({ title: "Email disalin", description: "Alamat email siap ditempel." });
    } catch {
      toast({ title: "Gagal menyalin", description: "Silakan coba lagi." });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articles.map((a) => ({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: a.title,
              datePublished: a.date,
              author: { "@type": "Person", name: "Ilham Ramadhan" },
               url:
                 typeof window !== "undefined"
                   ? `${window.location.origin}/articles/${a.id}`
                   : `https://ilhamramadhan.dev/articles/${a.id}`,
            }))
          ),
        }}
      />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md" style={{ background: "var(--gradient-hero)" }}>
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </span>
            Ilham Ramadhan
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Tentang</a>
            <a href="#skills" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Keahlian</a>
            <a href="#experience" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Pengalaman</a>
            <a href="#projects" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Proyek</a>
            <a href="#contact" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Kontak</a>
          </div>
          <div className="flex items-center gap-2">
            <SocialLink href="https://github.com/yourusername" label="GitHub" icon={Github} />
            <SocialLink href="https://www.linkedin.com/in/yourusername/" label="LinkedIn" icon={Linkedin} />
            <ThemeToggle />
            <Button
              className="hidden md:inline-flex"
              onClick={copyEmail}
              variant="secondary"
            >
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* Signature pointer‑reactive glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(600px at ${x}px ${y}px, hsl(var(--primary) / 0.25), transparent 60%)`,
            transition: "var(--transition-smooth)",
          }}
        />

        <div className="container relative py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p variants={fadeIn} className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary"></span>
              Tersedia untuk proyek freelance & full-time
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Ilham Ramadhan — Fullstack Developer
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-6 text-lg text-muted-foreground">
              Membangun produk web berkualitas tinggi dari UI hingga infrastruktur. Fokus pada performa, DX, dan pengalaman pengguna.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)]"
                style={{ background: "var(--gradient-hero)" }}
              >
                Lihat Proyek <ArrowRight className="h-4 w-4" />
              </a>
              <Button variant="secondary" asChild>
                <a href="#contact" className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" /> Unduh CV
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Cpu className="h-4 w-4 text-primary" /> Backend kuat</div>
                <p className="text-sm text-muted-foreground">API berskala, aman, dan terukur.</p>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Layers className="h-4 w-4 text-primary" /> Frontend modern</div>
                <p className="text-sm text-muted-foreground">UI halus, aksesibel, dan reaktif.</p>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="rounded-lg border border-border p-4 sm:col-span-1 col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Code2 className="h-4 w-4 text-primary" /> DevOps siap produksi</div>
                <p className="text-sm text-muted-foreground">CI/CD, observability, dan kinerja optimal.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-20">
        <SectionHeader
          eyebrow="Tentang Saya"
          title="Engineer yang peduli pada detail"
          description="Saya memiliki ketertarikan pada arsitektur yang rapi, DX yang nyaman, dan antarmuka yang menyenangkan."
        />
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground"
        >
          Selama beberapa tahun terakhir, saya membangun aplikasi dari nol hingga rilis
          produksi untuk berbagai industri: edukasi, SaaS, dan e‑commerce. Saya
          menikmati bekerja lintas stack: merancang skema database, menulis API yang
          andal, hingga membuat UI yang cepat dan indah.
        </motion.article>
      </section>

      {/* Skills */}
      <section id="skills" className="container py-20">
        <SectionHeader eyebrow="Keahlian" title="Teknologi yang saya gunakan" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          {Object.entries(skills).map(([group, list]) => (
            <motion.div key={group} variants={fadeIn} className="rounded-xl border border-border p-6">
              <h3 className="mb-4 text-lg font-semibold">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <Badge key={skill} variant="secondary" className="hover-scale">{skill}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" className="container py-20">
        <SectionHeader eyebrow="Pengalaman" title="Jejak profesional" />
        <div className="mx-auto max-w-4xl">
          <ol className="relative border-s border-border">
            {experiences.map((exp, idx) => (
              <motion.li
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="mb-10 ms-6"
              >
                <span className="absolute -start-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <div className="rounded-lg border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold">{exp.role} · {exp.company}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {exp.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container py-20">
        <SectionHeader
          eyebrow="Proyek"
          title="Karya terpilih"
          description="Beberapa proyek publik yang mencerminkan cara saya berpikir dan membangun."
        />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={selectedProjectCategory} onValueChange={setSelectedProjectCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-[hsl(var(--primary-glow)/0.15)]" />
              <div className="p-5">
                <Link to={`/projects/${p.id}`}>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer">{p.title}</h3>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a href={p.github} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a href={p.preview} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors" target="_blank" rel="noreferrer">
                    <Eye className="h-4 w-4" /> Preview
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mt-10 text-center"
        >
          <Button asChild variant="secondary">
            <Link to="/projects">Lihat Semua Proyek</Link>
          </Button>
        </motion.div>
      </section>

      {/* Articles */}
      <section id="articles" className="container py-20">
        <SectionHeader
          eyebrow="Artikel"
          title="Tulisan & pemikiran"
          description="Kumpulan artikel seputar engineering, arsitektur, dan produktivitas."
        />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={selectedArticleCategory} onValueChange={setSelectedArticleCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="devops">DevOps</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredArticles.map((a) => (
            <motion.article
              key={a.id}
              variants={fadeIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl border border-border"
            >
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{a.date}</span>
                  <span>{a.readTime}</span>
                </div>
                <Link to={`/articles/${a.id}`}>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer">{a.title}</h3>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.tags.map((t: string) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to={`/articles/${a.id}`} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors">
                    Baca artikel <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mt-10 text-center"
        >
          <Button asChild variant="secondary">
            <Link to="/articles">Lihat Semua Artikel</Link>
          </Button>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-20">
        <SectionHeader eyebrow="Kontak" title="Mari berkolaborasi" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mx-auto max-w-2xl rounded-xl border border-border p-6 text-center"
        >
          <p className="text-muted-foreground">
            Punya ide atau ingin berdiskusi proyek? Kirim email ke
            <button onClick={copyEmail} className="mx-2 underline decoration-primary underline-offset-4">hello@ilhamramadhan.dev</button>
            atau hubungi saya melalui LinkedIn.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <a href="mailto:hello@ilhamramadhan.dev" className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> Kirim Email
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> Terhubung di LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ilham Ramadhan. Semua hak dilindungi.</p>
            <div className="flex items-center gap-3">
              <a href="#home" className="text-sm text-foreground/80 hover:text-primary transition-colors">Kembali ke atas</a>
              <a href="#projects" className="text-sm text-foreground/80 hover:text-primary transition-colors">Proyek</a>
              <a href="#contact" className="text-sm text-foreground/80 hover:text-primary transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
