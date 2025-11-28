import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Bookmark, Share2 } from "lucide-react";
import { getBlogPost, getLatestBlogPosts } from "@/lib/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;
  const relatedPosts = getLatestBlogPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
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
        title={post.title}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        schema={articleSchema}
      />
      <Header />
      
      <main className="container py-8 px-6">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{post.category}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <article>
            {/* Hero Image */}
            {post.image && (
              <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <div className="bg-card rounded-3xl shadow-lg border border-border/50 p-8 md:p-12 mb-8">
              <header className="mb-0">
                <Badge variant="outline" className="mb-5 text-primary border-primary/60 px-4 py-1.5 text-sm font-semibold">
                  {post.category}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-[1.15]">
                  {post.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-[1.6] font-light">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/50">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} de lectura</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </header>
            </div>

            {/* Article Content */}
            <div className="bg-card rounded-3xl shadow-lg border border-border/50 p-6 md:p-10">
              <div 
                className="prose prose-base md:prose-lg max-w-none 
                  prose-headings:font-semibold prose-headings:tracking-tight
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground
                  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary
                  prose-h4:text-lg md:prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-foreground/90
                  prose-p:text-muted-foreground prose-p:leading-relaxed md:prose-p:leading-[1.8] prose-p:mb-4 prose-p:text-[15px] md:prose-p:text-[17px]
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-semibold prose-a:transition-colors
                  prose-strong:text-foreground prose-strong:font-semibold md:prose-strong:text-[17px]
                  prose-ul:text-muted-foreground prose-ul:my-5 prose-ul:space-y-2 prose-ul:pl-4
                  prose-ol:text-muted-foreground prose-ol:my-5 prose-ol:space-y-2 prose-ol:pl-4
                  prose-li:text-[15px] md:prose-li:text-[17px] prose-li:leading-relaxed md:prose-li:leading-[1.7] prose-li:my-0
                  prose-li:marker:text-primary prose-li:marker:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6 prose-blockquote:rounded-r-lg
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-table:my-6 prose-table:border prose-table:border-border
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-6
                  first:prose-p:text-base md:first:prose-p:text-lg first:prose-p:font-medium first:prose-p:text-foreground/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 px-2">
                Más artículos que te pueden interesar
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                    <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 h-full hover:shadow-lg">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative">
                        {relatedPost.image ? (
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-6">
                              <div className="text-4xl mb-2">📝</div>
                              <p className="text-xs text-muted-foreground">{relatedPost.category}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3" />
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-3">
                          <span>Leer más</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border-primary/30 overflow-hidden relative shadow-xl">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <CardContent className="p-10 md:p-14 text-center relative">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  ¿Listo para transformar tu rutina de belleza?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Descubre nuestra gama completa de dispositivos profesionales con resultados visibles desde las primeras semanas. Tecnología probada, garantía 2 años.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link to={`/categoria/${post.categorySlug}`}>
                      Ver {post.category}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link to="/superventas">
                      Productos más vendidos
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
