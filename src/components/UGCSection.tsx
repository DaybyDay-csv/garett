import { Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const ugcContent = [
  {
    id: 1,
    name: "María García",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    instagramHandle: "@maria.beauty"
  },
  {
    id: 2,
    name: "Laura Martínez",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    instagramHandle: "@laura_skincare"
  },
  {
    id: 3,
    name: "Carmen López",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    instagramHandle: "@carmen.glow"
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    instagramHandle: "@ana.beautytech"
  },
  {
    id: 5,
    name: "Sofia Hernández",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    instagramHandle: "@sofia.selfcare"
  }
];

export const UGCSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Social Connect */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Conecta con nosotros
          </p>
          <div className="flex items-center justify-center gap-6 mb-8">
            <a 
              href="https://instagram.com/garettbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://facebook.com/garettbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://youtube.com/garettbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* UGC Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {ugcContent.map((user) => (
            <div 
              key={user.id}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm mb-1">{user.name}</p>
                  <p className="text-white/80 text-xs">{user.instagramHandle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Quiénes somos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Historias reales de personas reales
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Detrás de cada producto hay una historia. Nuestros clientes comparten sus experiencias 
            auténticas con los dispositivos Garett, mostrando resultados reales sin filtros ni ediciones. 
            Únete a nuestra comunidad y descubre cómo la tecnología de belleza puede transformar tu rutina.
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a 
              href="https://instagram.com/garettbeauty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Comparte tu historia
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
