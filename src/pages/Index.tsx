import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ProductCard } from "@/components/ProductCard";
import { OptimizedImage } from "@/components/OptimizedImage";
import { FAQ } from "@/components/FAQ";
import { BlogCarousel } from "@/components/BlogCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { fetchProducts, ShopifyProduct, isGWPProduct } from "@/lib/shopify";
import { LOCAL_PRODUCTS_BY_HANDLE } from "@/lib/catalog";
import { BUNDLES } from "@/lib/bundles";
import { homeFAQs } from "@/lib/faqData";
import { ShoppingBag, ArrowRight, ShieldCheck, Award, Truck, FlaskConical, Leaf, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { DEVOLUCION, ENVIO, GARANTIA, CONTACTO } from "@/lib/policies";
import { UGCSection } from "@/components/UGCSection";
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
    description: `Tecnología de belleza profesional para resultados visibles. Dispositivos de cuidado capilar, facial y corporal con garantía comercial de ${GARANTIA.comercial.anios} años.`,
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
      <SEO title="Garett Beauty España - Belleza Profesional" description={`Descubre los mejores dispositivos de belleza profesional. Cuidado capilar, facial y corporal con tecnología avanzada. ${ENVIO.textoCorto} y garantía comercial de ${GARANTIA.comercial.anios} años.`} canonicalUrl="/" schema={homeSchema} />
      <Header />

      {/* [1] HERO — sin claims sin fuente: solo lo demostrable (CE, garantía, devolución, contacto) */}
      <section className="bg-card">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <Badge className="animate-fade-up bg-primary-light text-primary border-primary/10 px-3 py-1.5 text-xs">
                <ShieldCheck className="w-3 h-3 mr-1.5" />
                Dispositivos médicos CE clase IIa
              </Badge>
              <h2 className="animate-fade-up [animation-delay:80ms] text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-foreground">
                Tecnología de belleza <span className="text-primary">profesional</span><br />
                para usar en casa.
              </h2>
              <p className="animate-fade-up [animation-delay:160ms] text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Dispositivos con tecnología LED, microcorriente, EMS y luz pulsada para tu rutina facial y corporal.
                Con garantía comercial de {GARANTIA.comercial.anios} años, {DEVOLUCION.diasPrecintoIntacto} días de devolución con {DEVOLUCION.condicion} y teléfono de soporte si te surge una duda.
              </p>
              <div className="animate-fade-up [animation-delay:240ms] flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link to="/productos">
                    Comprar ahora
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/blog">
                    Descubre la tecnología
                  </Link>
                </Button>
              </div>
              <div className="animate-fade-up [animation-delay:320ms] flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> {ENVIO.textoCorto}</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Garantía {GARANTIA.comercial.anios} años</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Pago seguro SSL</span>
              </div>
              <a href={CONTACTO.telefonoHref} className="animate-fade-up [animation-delay:400ms] inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {CONTACTO.textoJuntoAlCta}
              </a>
            </div>
            <div className="animate-fade-up [animation-delay:200ms] relative">
              <div className="aspect-square rounded-2xl bg-primary-light overflow-hidden">
                <img
                  src={categoryTerapiaLuzLED}
                  alt="Terapia LED Garett Beauty"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="animate-fade-up [animation-delay:450ms] absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-4 flex items-center gap-3 border border-border">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">CE clase IIa</p>
                  <p className="text-xs text-muted-foreground">Dispositivos médicos certificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [2] TRUST BAR — T07: certificaciones */}
      <section className="bg-background border-y border-border">
        <div className="container py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">Seguro</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Pago SSL</p>
              </div>
            </div>
            <a href={CONTACTO.telefonoHref} className="flex items-center gap-3 justify-center hover:opacity-80 transition-opacity">
              <Phone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">{CONTACTO.telefono}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{CONTACTO.horario}</p>
              </div>
            </a>
            <div className="flex items-center gap-3 justify-center">
              <FlaskConical className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">CE clase IIa</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Dispositivo médico</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Award className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">Garantía</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{GARANTIA.comercial.anios} años comercial · {GARANTIA.legal.anios} legal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Truck className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">Envío gratis</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Todos los pedidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Leaf className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">Devolución</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{DEVOLUCION.diasPrecintoIntacto} días · {DEVOLUCION.condicion}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [4] MÁS VENDIDOS — T08 refinado */}
      {bestSellers.length > 0 && <section id="superventas" className="py-12 md:py-20 bg-card border-y border-border">
          <div className="container">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Los favoritos</p>
                <h2 className="text-2xl md:text-4xl text-foreground font-semibold tracking-tight">
                  Más vendidos
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">Los dispositivos favoritos de nuestra comunidad</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/superventas">Ver todos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 md:gap-6 pb-4 px-4 md:px-8">
                {bestSellers.map((product, index) => <div key={product.node.id} className="flex-none w-[260px] md:w-[320px]">
                    <ProductCard product={product} tagIndex={index} />
                  </div>)}
              </div>
            </div>
          </div>
        </section>}

      {/* BUNDLES CON DESCUENTO */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Packs con descuento</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight">
              Ahorra combinando tu rutina
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Rutinas completas con precio especial frente a comprarlos por separado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUNDLES.map(bundle => {
              const first = LOCAL_PRODUCTS_BY_HANDLE[bundle.includes[0]];
              return (
                <Card key={bundle.handle} className="overflow-hidden flex flex-col">
                  <div className="aspect-[16/9] bg-muted relative">
                    {first && <img src={first.node.images.edges[0]?.node.url} alt={bundle.title} className="w-full h-full object-cover" />}
                    <Badge className="absolute top-3 left-3">{bundle.badge}</Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{bundle.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{bundle.description}</p>
                    <div className="flex items-baseline gap-2 mt-auto mb-4">
                      <span className="text-2xl font-semibold text-primary">€{bundle.bundlePrice.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">€{bundle.originalPrice.toFixed(2)}</span>
                    </div>
                    <Button asChild variant="outline">
                      <Link to={`/producto/${bundle.includes[0]}`}>
                        Ver pack <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* [5] EXPLORA POR CATEGORÍA */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Encuentra tu dispositivo</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
              Explora por categoría
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Desde cuidado facial hasta corporal, encuentra la tecnología perfecta para tu rutina
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link to="/categoria/cuidado-capilar" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryCuidadoCapilar} alt="Cuidado capilar - Dispositivos profesionales para el cabello" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Cuidado Capilar</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Dispositivos profesionales para el cabello</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/masajeadores-faciales" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryMasajeadoresFaciales} alt="Masajeadores faciales - Estimulación facial avanzada" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Masajeadores Faciales</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Estimulación facial avanzada</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/limpieza-facial" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryLimpiezaFacial} alt="Limpieza facial - Limpieza profunda profesional" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Limpieza Facial</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Limpieza profunda profesional</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/mesoterapia" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryMesoterapia} alt="Dispositivos de Mesoterapia - Tratamientos de rejuvenecimiento" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Mesoterapia</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Tratamientos de rejuvenecimiento</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/corporales" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryCorporales} alt="Dispositivos corporales - Tratamientos para todo el cuerpo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Cuidado Corporal</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Tratamientos para todo el cuerpo</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/depilacion-ipl" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryDepilacionIPL} alt="Depilación e IPL - Depilación permanente profesional" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Depilación IPL</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Depilación láser profesional en casa</p>
                  <div className="flex items-center gap-1 md:gap-2 text-primary font-medium text-xs md:text-base">
                    <span>Ver productos</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/categoria/terapia-luz-led" className="group">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage src={categoryTerapiaLuzLED} alt="Terapia de Luz LED - Fototerapia profesional para rejuvenecimiento" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" blurPlaceholder />
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-sm md:text-2xl font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">Terapia de Luz LED</h3>
                  <p className="text-xs md:text-base text-muted-foreground mb-2 md:mb-4 leading-relaxed">Fototerapia profesional para rejuvenecimiento</p>
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

      {/* [6] BEAUTY ROUTINE — 3 pasos (limpieza → tratamiento → hidratación) */}
      <section className="py-12 md:py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Tu rutina en 3 pasos</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
              Rutina de cuidado completa
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Comienza con limpieza, sigue con tratamiento y termina con hidratación. Equipos profesionales, resultados visibles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Paso 1</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Limpieza</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Prepara la piel eliminando impurezas con cepillado sónico profesional.
              </p>
              <Link to="/categoria/limpieza-facial" className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Ver cepillos faciales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Paso 2</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Tratamiento</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Mesoterapia, EMS o LED para tratar arrugas, manchas o firmeza.
              </p>
              <Link to="/productos" className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Ver dispositivos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Paso 3</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Hidratación</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                LED therapy para sellar la piel y potenciar el efecto de los activos.
              </p>
              <Link to="/categoria/terapia-luz-led" className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Ver máscaras LED <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* [7] CONFIANZA — solo lo demostrable: CE clase IIa (FAQ), garantía y devolución (policies), contacto */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <Badge className="bg-white/10 text-white border-white/20 px-3 py-1.5 text-xs">
                <ShieldCheck className="w-3 h-3 mr-1.5" />
                Compra con respaldo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Esto es lo que te garantizamos, por escrito.
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
                Nuestros dispositivos están certificados como dispositivos médicos CE clase IIa. Tienes {GARANTIA.comercial.anios} años de garantía comercial y {GARANTIA.legal.anios} de garantía legal, {DEVOLUCION.diasPrecintoIntacto} días de devolución con {DEVOLUCION.condicion} y un teléfono real al que llamar si te surge una duda:{" "}
                <a href={CONTACTO.telefonoHref} className="font-semibold underline underline-offset-4 hover:no-underline">
                  {CONTACTO.telefono}
                </a>{" "}
                ({CONTACTO.horario}).
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-3xl md:text-4xl font-semibold tracking-tight">CE IIa</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">Dispositivo médico</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-semibold tracking-tight">{GARANTIA.comercial.anios} años</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">Garantía comercial</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-semibold tracking-tight">{DEVOLUCION.diasPrecintoIntacto} días</p>
                  <p className="text-xs text-primary-foreground/70 mt-1">Devolución con {DEVOLUCION.condicion}</p>
                </div>
              </div>
              <Button asChild size="lg" variant="white">
                <Link to="/blog">
                  Guías y consejos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <img
                  src={categoryLimpiezaFacial}
                  alt="Dispositivos de belleza Garett"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [8] UGC — contenido real de clientas y creadoras (vídeos en public/videos/) */}
      <UGCSection />

      {/* [9] BLOG TEASER */}
      <BlogCarousel />

      {/* [10] FAQ */}
      <FAQ items={homeFAQs} title="Preguntas frecuentes" description="Resolvemos tus dudas sobre nuestros dispositivos de belleza profesional" />

      {/* Empty/Loading States */}
      {products.length === 0 && !loading && <section className="py-20 text-center container">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">No hay productos aún</h3>
          <p className="text-muted-foreground mb-6">
            Estamos preparando nuestro catálogo. ¡Vuelve pronto!
          </p>
        </section>}

      {loading && <section className="py-20 container">
          <ProductGridSkeleton count={4} className="lg:grid-cols-4" />
        </section>}

      <Footer />
    </div>;
};
export default Index;