import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getLatestBlogPosts } from "@/lib/blogPosts";

export const BlogCarousel = () => {
  const latestPosts = getLatestBlogPosts(3);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Guías y Consejos Expertos
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Aprende a sacar el máximo partido a tus dispositivos de belleza
            </p>
          </div>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/blog">Ver todas</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 h-full hover:shadow-lg">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative">
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
                        <p className="text-xs text-muted-foreground font-medium">{post.category}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>Leer artículo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
