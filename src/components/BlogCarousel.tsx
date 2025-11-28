import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { getLatestBlogPosts } from "@/lib/blogPosts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const BlogCarousel = () => {
  const latestPosts = getLatestBlogPosts(6);

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {latestPosts.map((post) => (
              <CarouselItem key={post.slug} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                <Link to={`/blog/${post.slug}`} className="group block">
                  <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 h-full hover:shadow-xl">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden relative">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-3xl md:text-4xl mb-2">📝</div>
                            <p className="text-xs text-muted-foreground font-medium">{post.category}</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 md:top-3 right-2 md:right-3">
                        <div className="bg-primary/95 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
                          {post.category}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center gap-1.5 md:gap-2 text-xs text-muted-foreground/80 mb-2 md:mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="truncate">{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <h3 className="text-sm md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 leading-relaxed hidden md:block">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 md:gap-2 text-primary font-semibold text-xs md:text-sm">
                        <span>Leer más</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
