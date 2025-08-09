import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
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

// Mock article data - in real app this would come from API/CMS
const articleData: { [key: string]: any } = {
  "saas-architecture": {
    id: "saas-architecture",
    title: "Mendesain arsitektur scalable untuk aplikasi SaaS",
    summary: "Prinsip dan trade-off dalam membangun multi-tenant SaaS yang efisien.",
    content: `
      <h2>Memahami Multi-Tenancy</h2>
      <p>Ketika membangun aplikasi SaaS, salah satu keputusan arsitektur paling penting adalah bagaimana menangani multi-tenancy. Ada beberapa pendekatan yang bisa dipilih, masing-masing dengan trade-off tersendiri.</p>
      
      <h3>1. Single Database, Shared Schema</h3>
      <p>Pendekatan ini menggunakan satu database dengan schema yang sama untuk semua tenant. Setiap row data memiliki tenant_id untuk identifikasi.</p>
      
      <h4>Keuntungan:</h4>
      <ul>
        <li>Simple database management</li>
        <li>Cost-effective untuk banyak tenant kecil</li>
        <li>Easy backup dan maintenance</li>
      </ul>
      
      <h4>Kekurangan:</h4>
      <ul>
        <li>Potential security risks jika ada bug di query</li>
        <li>Scalability terbatas per tenant</li>
        <li>Noisy neighbor problems</li>
      </ul>
      
      <h3>2. Single Database, Separate Schema</h3>
      <p>Setiap tenant memiliki schema terpisah dalam database yang sama. Ini memberikan isolasi yang lebih baik sambil tetap cost-effective.</p>
      
      <h3>3. Separate Database per Tenant</h3>
      <p>Setiap tenant memiliki database terpisah. Memberikan isolasi maksimal tetapi kompleksitas operasional yang tinggi.</p>
      
      <h2>Caching Strategy</h2>
      <p>Untuk aplikasi SaaS yang scalable, caching adalah komponen kritis. Ada beberapa layer caching yang perlu dipertimbangkan:</p>
      
      <h3>Application Level Caching</h3>
      <p>Redis atau Memcached untuk cache data yang frequently accessed. Key strategy adalah menggunakan tenant_id sebagai prefix untuk cache keys.</p>
      
      <h3>Database Query Caching</h3>
      <p>PostgreSQL memiliki built-in query cache, tetapi untuk SaaS multi-tenant, kita perlu custom caching strategy yang aware terhadap tenant isolation.</p>
      
      <h2>API Design Considerations</h2>
      <p>API design untuk SaaS multi-tenant memerlukan pertimbangan khusus:</p>
      
      <h3>Tenant Identification</h3>
      <p>Ada beberapa cara untuk identify tenant:</p>
      <ul>
        <li>Subdomain: tenant1.myapp.com</li>
        <li>Domain path: myapp.com/tenant1</li>
        <li>Header-based: X-Tenant-ID</li>
      </ul>
      
      <h3>Rate Limiting</h3>
      <p>Rate limiting harus dilakukan per-tenant untuk mencegah satu tenant mengkonsumsi resource berlebihan.</p>
      
      <h2>Monitoring dan Observability</h2>
      <p>Monitoring untuk SaaS multi-tenant harus dapat breakdown metrics per tenant. Ini penting untuk:</p>
      <ul>
        <li>Usage tracking untuk billing</li>
        <li>Performance monitoring per tenant</li>
        <li>Security monitoring dan audit trail</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Membangun SaaS yang scalable memerlukan planning yang matang dari awal. Pilihan arsitektur multi-tenancy akan mempengaruhi development, operations, dan business model ke depannya.</p>
      
      <p>Yang terpenting adalah memahami trade-off dari setiap pilihan dan memilih yang paling sesuai dengan business requirements dan technical constraints yang ada.</p>
    `,
    date: "2025-05-01",
    tags: ["Arsitektur", "SaaS", "PostgreSQL"],
    category: "backend",
    readTime: "8 min",
    author: "Ilham Ramadhan",
    publishedAt: "2025-05-01T10:00:00Z"
  },
  "react-performance": {
    id: "react-performance",
    title: "Optimasi performa React: dari profil hingga caching",
    summary: "Strategi nyata menaikkan Core Web Vitals tanpa mengorbankan DX.",
    content: `
      <h2>Mengukur Performa React</h2>
      <p>Sebelum mengoptimasi, kita perlu tahu apa yang harus diukur. React DevTools Profiler adalah tools pertama yang harus dikuasai.</p>
      
      <h3>Core Web Vitals</h3>
      <p>Google Core Web Vitals terdiri dari tiga metrics utama:</p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP)</strong>: Waktu loading konten terbesar</li>
        <li><strong>First Input Delay (FID)</strong>: Responsivitas interaksi pertama</li>
        <li><strong>Cumulative Layout Shift (CLS)</strong>: Stabilitas visual</li>
      </ul>
      
      <h2>Bundle Optimization</h2>
      <p>Bundle size adalah faktor utama yang mempengaruhi loading performance. Beberapa teknik yang efektif:</p>
      
      <h3>Code Splitting</h3>
      <pre><code>
// Route-based code splitting
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
      </code></pre>
      
      <h3>Tree Shaking</h3>
      <p>Pastikan import hanya yang dibutuhkan:</p>
      <pre><code>
// ❌ Imports entire lodash
import _ from 'lodash';

// ✅ Imports only what's needed
import { debounce } from 'lodash';
      </code></pre>
      
      <h2>React Rendering Optimization</h2>
      <p>React re-rendering adalah source utama performance issues. Beberapa teknik untuk optimasi:</p>
      
      <h3>Memoization</h3>
      <pre><code>
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoize callback functions
const handleClick = useCallback((id) => {
  onItemClick(id);
}, [onItemClick]);

// Memoize components
const ListItem = memo(({ item, onClick }) => {
  return (
    <div onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  );
});
      </code></pre>
      
      <h3>Virtual Scrolling</h3>
      <p>Untuk list yang panjang, virtual scrolling dapat dramatically improve performance:</p>
      <pre><code>
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
);

const VirtualizedList = () => (
  <List
    height={600}
    itemCount={1000}
    itemSize={35}
  >
    {Row}
  </List>
);
      </code></pre>
      
      <h2>State Management Optimization</h2>
      <p>State structure yang buruk dapat menyebabkan unnecessary re-renders:</p>
      
      <h3>State Normalization</h3>
      <pre><code>
// ❌ Nested state structure
const [state, setState] = useState({
  users: [
    { id: 1, name: 'John', posts: [...] },
    { id: 2, name: 'Jane', posts: [...] }
  ]
});

// ✅ Normalized state structure
const [users, setUsers] = useState({
  1: { id: 1, name: 'John' },
  2: { id: 2, name: 'Jane' }
});
const [posts, setPosts] = useState({
  1: { id: 1, userId: 1, content: '...' },
  2: { id: 2, userId: 1, content: '...' }
});
      </code></pre>
      
      <h2>Caching Strategies</h2>
      <p>Caching dapat dramatically improve perceived performance:</p>
      
      <h3>HTTP Caching</h3>
      <p>Set proper cache headers untuk static assets:</p>
      <pre><code>
// Service Worker for aggressive caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
      </code></pre>
      
      <h3>React Query Caching</h3>
      <pre><code>
const { data, isLoading } = useQuery({
  queryKey: ['posts', { page, limit }],
  queryFn: () => fetchPosts({ page, limit }),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
      </code></pre>
      
      <h2>Tools untuk Monitoring</h2>
      <p>Gunakan tools yang tepat untuk monitoring performa production:</p>
      <ul>
        <li><strong>Lighthouse</strong>: Audit performa comprehensive</li>
        <li><strong>Web Vitals Extension</strong>: Real-time Core Web Vitals</li>
        <li><strong>React DevTools Profiler</strong>: Component-level performance</li>
        <li><strong>Bundle Analyzer</strong>: Bundle size analysis</li>
      </ul>
      
      <h2>Kesimpulan</h2>
      <p>Performance optimization adalah iterative process. Mulai dengan measuring, identify bottlenecks, optimize, dan measure lagi.</p>
      
      <p>Yang terpenting adalah balance antara performance dan developer experience. Jangan optimize prematurely, tetapi juga jangan abaikan performance dari awal.</p>
    `,
    date: "2025-04-12",
    tags: ["React", "Perf", "Caching"],
    category: "frontend",
    readTime: "12 min",
    author: "Ilham Ramadhan",
    publishedAt: "2025-04-12T14:30:00Z"
  }
};

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articleData[id || ""];

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Artikel tidak ditemukan</h1>
          <Button asChild>
            <Link to="/articles">Kembali ke Artikel</Link>
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
            <Link to="/articles" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Artikel
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </nav>
      </header>

      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.article
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <Badge variant="secondary" className="mb-4">{article.category}</Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {article.summary}
              </p>
              
              {/* Article Meta */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </motion.div>
          </motion.article>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Footer */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Ditulis oleh</p>
                    <p className="font-medium">{article.author}</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Artikel
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Daftar Isi
                      </h3>
                      <div className="space-y-2 text-sm">
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                          Memahami Multi-Tenancy
                        </a>
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors ml-4">
                          Single Database, Shared Schema
                        </a>
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors ml-4">
                          Single Database, Separate Schema
                        </a>
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                          Caching Strategy
                        </a>
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                          API Design Considerations
                        </a>
                        <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                          Monitoring dan Observability
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Related Articles */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <h3 className="text-lg font-semibold mb-4">Artikel Terkait</h3>
                  <div className="space-y-4">
                    {Object.values(articleData)
                      .filter((a: any) => a.id !== article.id && a.category === article.category)
                      .slice(0, 2)
                      .map((relatedArticle: any) => (
                        <Card key={relatedArticle.id} className="hover:border-primary/50 transition-colors">
                          <CardContent className="p-4">
                            <Link to={`/articles/${relatedArticle.id}`}>
                              <h4 className="font-medium mb-2 hover:text-primary transition-colors text-sm">
                                {relatedArticle.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{relatedArticle.readTime}</span>
                              </div>
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
      </div>
    </div>
  );
};

export default ArticleDetail;