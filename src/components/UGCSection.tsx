import { Instagram, Facebook, Youtube, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ugc1 from "@/assets/ugc/ugc-1.jpg";
import ugc2 from "@/assets/ugc/ugc-2.jpg";
import ugc3 from "@/assets/ugc/ugc-3.jpg";
import ugc4 from "@/assets/ugc/ugc-4.jpg";
import ugc5 from "@/assets/ugc/ugc-5.jpg";
interface UGCItem {
  id: number;
  type: "image" | "video";
  src: string;
  name: string;
  handle: string;
  caption?: string;
}
const ugcContent: UGCItem[] = [{
  id: 1,
  type: "image",
  src: ugc1,
  name: "Laura M.",
  handle: "@laura.beauty",
  caption: "Mi masajeador favorito 💆‍♀️"
}, {
  id: 2,
  type: "video",
  src: "/videos/ugc-video-1.mov",
  name: "Ana S.",
  handle: "@ana.skincare",
  caption: "Rutina diaria ✨"
}, {
  id: 3,
  type: "image",
  src: ugc3,
  name: "Carmen R.",
  handle: "@carmen.glow",
  caption: "LED therapy en casa 💚"
}, {
  id: 4,
  type: "video",
  src: "/videos/ugc-video-2.mp4",
  name: "Sofia H.",
  handle: "@sofia.beautytech",
  caption: "Resultados increíbles"
}, {
  id: 5,
  type: "image",
  src: ugc4,
  name: "María G.",
  handle: "@maria.haircare",
  caption: "Pelo perfecto cada día"
}, {
  id: 6,
  type: "image",
  src: ugc5,
  name: "Paula L.",
  handle: "@paula.wellness",
  caption: "Mi momento de relax 🌅"
}, {
  id: 7,
  type: "video",
  src: "/videos/ugc-video-3.mov",
  name: "Elena V.",
  handle: "@elena.selfcare",
  caption: "Tutorial rápido"
}, {
  id: 8,
  type: "image",
  src: ugc2,
  name: "Rosa M.",
  handle: "@rosa.beauty",
  caption: "Mis esenciales 💕"
}];
export const UGCSection = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  return <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container">
        {/* Social Connect Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Conecta con nosotros
          </p>
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://instagram.com/garettbeauty" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://facebook.com/garettbeauty" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://youtube.com/garettbeauty" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* UGC Carousel */}
        <div className="relative mb-16 px-12">
          <Carousel opts={{
          align: "start",
          loop: true
        }} plugins={[Autoplay({
          delay: 3000,
          stopOnInteraction: true
        })]} className="w-full">
            <CarouselContent className="-ml-4">
              {ugcContent.map(item => <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="group relative overflow-hidden rounded-xl aspect-square bg-muted cursor-pointer shadow-lg hover:shadow-xl transition-shadow" onClick={() => {
                if (item.type === "video") {
                  setPlayingVideo(playingVideo === item.id ? null : item.id);
                }
              }}>
                    {item.type === "image" ? <img src={item.src} alt={item.caption || item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /> : <div className="relative w-full h-full">
                        <video src={item.src} className="w-full h-full object-cover" loop muted playsInline ref={el => {
                    if (el) {
                      if (playingVideo === item.id) {
                        el.play();
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }} />
                        {playingVideo !== item.id && <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                            </div>
                          </div>}
                      </div>}
                    
                    {/* Hover overlay with user info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-white font-semibold text-base mb-1">{item.name}</p>
                        <p className="text-white/90 text-sm mb-2">{item.handle}</p>
                        {item.caption && <p className="text-white/80 text-sm">{item.caption}</p>}
                      </div>
                    </div>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 bg-background/95 hover:bg-background border-2" />
            <CarouselNext className="right-0 translate-x-1/2 bg-background/95 hover:bg-background border-2" />
          </Carousel>
        </div>

        {/* Brand Story */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Quiénes somos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Historias reales de personas reales
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">Garett trae la tecnología profesional de los salones de belleza directamente a tu hogar. Resultados visibles, rutinas flexibles que se adaptan a tu vida, y la confianza de invertir en ti misma sin comprometer tiempo ni calidad.</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="https://instagram.com/garettbeauty" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              Comparte tu historia
            </a>
          </Button>
        </div>
      </div>
    </section>;
};