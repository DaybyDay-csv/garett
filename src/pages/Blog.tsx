import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

const Blog = () => {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Garett Beauty - Blog de Belleza',
    description: 'Guías, consejos y tutoriales sobre dispositivos de belleza profesional',
    url: `${window.location.origin}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Garett Beauty',
      logo: {
        '@type': 'ImageObject',
        url: 'https://storage.googleapis.com/gpt-engineer-file-uploads/pESnn9BB6adLJMk8NGIHDpkTO553/uploads/1762822197317-3.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog de Belleza - Guías y Consejos"
        description="Guías completas, tutoriales y consejos expertos sobre dispositivos de belleza profesional. Aprende a usar tecnología IPL, masajeadores faciales, limpieza sónica y más."
        canonicalUrl="/blog"
        schema={blogSchema}
      />
      <Header />
      
      <main className="container py-12 px-6">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Guías de Belleza Profesional
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consejos expertos y tutoriales completos para sacar el máximo partido a tus dispositivos de belleza
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-card">
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden relative">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="text-5xl mb-3">📝</div>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/95 backdrop-blur-sm text-primary-foreground border-0 shadow-lg font-semibold">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-4 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                    <span className="text-muted-foreground/50">•</span>
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-[1.3]">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-muted-foreground mb-5 line-clamp-3 flex-1 leading-[1.6]">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-auto pt-3 border-t border-border/50">
                    <span>Leer más</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
