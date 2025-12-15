import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { HeroSection } from "@/components/HeroSection";
import { Testimonials } from "@/components/Testimonials";
import { UGCSection } from "@/components/UGCSection";
import { PromotionalBanners } from "@/components/PromotionalBanners";
// import { BlackFridayFeatured } from "@/components/BlackFridayFeatured"; // Hidden for Christmas campaign
import { OptimizedImage } from "@/components/OptimizedImage";
import { FAQ } from "@/components/FAQ";
import { BlogCarousel } from "@/components/BlogCarousel";
import { ObjectionsSection } from "@/components/ObjectionsSection";
import { ResultsTimeline } from "@/components/ResultsTimeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { homeFAQs } from "@/lib/faqData";
import { Sparkles, Zap, Timer, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import categoryCuidadoCapilar from "@/assets/category-cuidado-capilar.jpg";
import categoryMasajeadoresFaciales from "@/assets/category-masajeadores-faciales.jpg";
import categoryLimpiezaFacial from "@/assets/category-limpieza-facial.jpg";
import categoryMesoterapia from "@/assets/category-mesoterapia.jpg";
import categoryCorporales from "@/assets/category-corporales.jpg";
import categoryDepilacionIPL from "@/assets/category-depilacion-ipl.jpg";
import categoryTerapiaLuzLED from "@/assets/category-terapia-luz-led.jpg";
const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(50);
        // Filter out GWP product from display
        const filteredData = data.filter(p => !isGWPProduct(p));
        setProducts(filteredData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  const newProducts = products.filter(p => p.node.tags.includes('new:true'));
  const bestSellers = products.filter(p => p.node.tags.includes('bestseller:true'));

  // Home page schema
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Garett Beauty España',
    url: window.location.origin,
    description: 'Tecnología de belleza profesional para resultados visibles. Dispositivos de cuidado capilar, facial y corporal con garantía 2 años.',
    publisher: {
      '@type': 'Organization',
      name: 'Garett Beauty',
      logo: {
        '@type': 'ImageObject',
        url: 'https://storage.googleapis.com/gpt-engineer-file-uploads/pESnn9BB6adLJMk8NGIHDpkTO553/uploads/1762822197317-3.png'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${window.location.origin}/busqueda?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return <div className="min-h-screen bg-background">
      <SEO 
        title="Garett Beauty España - Belleza Profesional"
        description="Descubre los mejores dispositivos de belleza profesional. Cuidado capilar, facial y corporal con tecnología avanzada. Envío gratis en 24-48h y garantía 2 años."
        canonicalUrl="/"
        schema={homeSchema}
      />
      <Header />
      
      {/* Hero Section with UVP */}
      <HeroSection />
      
      {/* Trust Badges */}
      <div className="container py-6 md:py-12 px-6">
        <TrustBadges />
      </div>

      {/* Black Friday Featured Products - Hidden for Christmas campaign */}
      {/* <BlackFridayFeatured /> */}

      {/* Superventas - Horizontal Scroll */}
      {bestSellers.length > 0 && <section id="superventas" className="py-10 md:py-12 bg-gradient-to-b from-background to-secondary/10">
          <div className="container px-6">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-4xl text-foreground font-semibold tracking-tight">
                  Superventas
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">Los más vendidos de Garett</p>
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 h-11 px-4">
                <Link to="/superventas">Ver todos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pl-6 md:pl-8">
              <div className="flex gap-4 md:gap-6 pb-4 pr-6 md:pr-8">
                {bestSellers.map((product, index) => <div key={product.node.id} className="flex-none w-[260px] md:w-[320px]">
                    <ProductCard product={product} tagIndex={index} />
                  </div>)}
              </div>
            </div>
          </div>
        </section>}


      {/* Results Timeline - "Resultados en semanas" */}
      <ResultsTimeline />

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container px-6">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
              Explora por categoría
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Encuentra el dispositivo perfecto para ti
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Cuidado Capilar */}
            <Link to="/categoria/cuidado-capilar" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryCuidadoCapilar} 
                    alt="Cuidado capilar - Dispositivos profesionales para el cabello" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Cuidado capilar
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Dispositivos profesionales para el cabello
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Masajeadores Faciales */}
            <Link to="/categoria/masajeadores-faciales" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryMasajeadoresFaciales} 
                    alt="Masajeadores faciales - Estimulación facial avanzada" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Masajeadores faciales
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Estimulación facial avanzada
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Limpieza Facial */}
            <Link to="/categoria/limpieza-facial" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryLimpiezaFacial} 
                    alt="Limpieza facial - Limpieza profunda profesional" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Limpieza facial
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Limpieza profunda profesional
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Dispositivos de Mesoterapia */}
            <Link to="/categoria/mesoterapia" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryMesoterapia} 
                    alt="Dispositivos de Mesoterapia - Tratamientos de rejuvenecimiento" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Dispositivos de Mesoterapia
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Tratamientos de rejuvenecimiento
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Dispositivos Corporales */}
            <Link to="/categoria/corporales" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryCorporales} 
                    alt="Dispositivos corporales - Tratamientos para todo el cuerpo" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Dispositivos corporales
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Tratamientos para todo el cuerpo
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Depilación e IPL */}
            <Link to="/categoria/depilacion-ipl" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryDepilacionIPL} 
                    alt="Depilación e IPL - Depilación permanente profesional" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Depilación e IPL
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Depilación láser profesional en casa
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Terapia de Luz LED */}
            <Link to="/categoria/terapia-luz-led" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={categoryTerapiaLuzLED} 
                    alt="Terapia de Luz LED - Fototerapia profesional para rejuvenecimiento" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    blurPlaceholder
                  />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                    Terapia de Luz LED
                  </h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">
                    Fototerapia profesional para rejuvenecimiento
                  </p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Objections Section - Addressing concerns */}
      <ObjectionsSection />

      {/* Promotional Banners Carousel */}
      <PromotionalBanners />

      {/* UGC Section - Real User Stories */}
      <UGCSection />
      
      {/* Customer Testimonials */}
      <Testimonials />

      {/* Blog Articles Carousel */}
      <BlogCarousel />

      {/* FAQ Section */}
      <FAQ 
        items={homeFAQs}
        title="Preguntas frecuentes"
        description="Resolvemos tus dudas sobre nuestros dispositivos de belleza profesional"
      />

      <div className="container py-16 px-6">
        {/* New Arrivals */}
        {newProducts.length > 0 && <section className="py-8">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold text-foreground tracking-tight">
                  Novedades
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-lg">Lo último en tecnología de belleza</p>
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 h-11 px-4">
                <Link to="/novedades">Ver todas</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {newProducts.slice(0, 6).map(product => <ProductCard key={product.node.id} product={product} />)}
            </div>
          </section>}

        {/* All Products or Empty State */}
        {products.length === 0 && !loading && <section className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No hay productos aún</h3>
            <p className="text-muted-foreground mb-6">
              Estamos preparando nuestro catálogo. ¡Vuelve pronto!
            </p>
          </section>}

        {loading && <section className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </section>}
      </div>

      <Footer />
    </div>;
};
export default Index;