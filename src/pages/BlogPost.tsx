import { useParams, Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
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
        schema={articleSchema}
      />
      <Header />
      
      <main className="container py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
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
            </header>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Artículos relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                    <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 h-full">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="text-4xl mb-2">📝</div>
                          <p className="text-xs text-muted-foreground">{relatedPost.category}</p>
                        </div>
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
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  ¿Listo para empezar tu transformación?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Descubre nuestra gama completa de dispositivos profesionales con resultados visibles desde las primeras semanas.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild size="lg">
                    <Link to={`/categoria/${post.categorySlug}`}>
                      Ver productos de {post.category}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/superventas">
                      Ver más vendidos
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
