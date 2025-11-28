import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBadges } from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Flame, Gift, Sparkles, ZoomIn, Maximize2, ChevronDown, Clock, Award, Sparkle, Zap, Droplets, Activity, Battery, Package, Lock, Calendar, AlertTriangle, Bell, Loader2 } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { calculatePromotionalPrice, formatPrice, getCurrentPromotionalStage } from "@/lib/promotions";
import { getProductContent, detectProductCategory } from "@/lib/productContent";
import * as LucideIcons from "lucide-react";
import gwpHeadband from "@/assets/gwp-headband.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Play } from "lucide-react";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Breadcrumb } from "@/components/Breadcrumb";
const ProductDetail = () => {
  const {
    handle
  } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const items = useCartStore(state => state.items);
  const isMobile = useIsMobile();

  // Calculate cart total for GWP
  const cartTotal = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const GWP_THRESHOLD = 70;
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts(100);
        const found = data.find(p => p.node.handle === handle);
        if (found) {
          setProduct(found);

          // Track ViewContent event when product loads
          const variant = found.node.variants.edges[0]?.node;
          if (variant && typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'ViewContent', {
              content_name: found.node.title,
              content_ids: [variant.id],
              content_type: 'product',
              value: parseFloat(variant.price.amount),
              currency: 'EUR'
            });
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);
  if (loading) {
    return <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando producto...</p>
        </div>
      </div>;
  }
  if (!product) {
    return <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Button asChild>
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>;
  }
  const {
    node
  } = product;
  const variant = node.variants.edges[selectedVariant]?.node;
  const originalPrice = variant ? variant.price.amount : "0";

  // Check if this is the AeroGlow product (Black Friday event)
  const isAeroGlow = node.handle.includes('aeroglow') || node.title.toLowerCase().includes('aeroglow');

  // Black Friday unlock date
  const unlockDate = new Date('2025-11-28T00:00:00');

  // Special Black Friday pricing for AeroGlow
  let priceInfo;
  if (isAeroGlow) {
    priceInfo = {
      originalPrice: 449,
      discountedPrice: 224.50,
      hasDiscount: true,
      discountLabel: '-50%',
      stage: {
        badge: 'BLACK FRIDAY',
        color: 'from-red-600 to-pink-600'
      }
    };
  } else {
    priceInfo = calculatePromotionalPrice(originalPrice);
  }

  // Get product-specific content
  const productContent = getProductContent(node);
  const handleAddToCart = () => {
    if (!variant) return;
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: {
        ...variant.price,
        // Store the discounted price in cart
        amount: priceInfo.discountedPrice.toString()
      },
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    addItem(cartItem);

    // Track AddToCart event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: node.title,
        content_ids: [variant.id],
        content_type: 'product',
        value: priceInfo.discountedPrice,
        currency: 'EUR'
      });
    }
    const discountText = priceInfo.hasDiscount ? ` (${priceInfo.discountLabel} aplicado)` : '';
    toast.success('Añadido al carrito', {
      description: `${node.title}${discountText}`,
      position: 'top-center'
    });
  };
  const isNew = node.tags.includes('new:true');
  const isBestseller = node.tags.includes('bestseller:true');
  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return;
    }
    setIsSubmittingEmail(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('newsletter-signup', {
        body: {
          email: notifyEmail,
          acceptsMarketing: true
        }
      });
      if (error) {
        const errorContext = (error as any)?.context;
        if (errorContext?.isDuplicate) {
          toast.success('Ya estás en la lista de notificaciones');
          setNotifyEmail("");
          return;
        }
        throw error;
      }
      if (data?.error) {
        if (data.isDuplicate) {
          toast.success('Ya estás en la lista de notificaciones');
          setNotifyEmail("");
        } else {
          throw new Error(data.error);
        }
      } else if (data?.success) {
        // Track Lead event for product notification signup
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Product Notification',
            content_category: 'Black Friday Alert'
          });
        }
        toast.success('¡Perfecto! Te notificaremos en Black Friday', {
          description: 'Recibirás un email cuando el producto esté disponible'
        });
        setNotifyEmail("");
      }
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast.error('Error al registrar email. Intenta nuevamente.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Calculate GWP progress with this product
  const potentialTotal = cartTotal + priceInfo.discountedPrice;
  const progressPercentage = Math.min(potentialTotal / GWP_THRESHOLD * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - potentialTotal, 0);
  const willUnlockGWP = potentialTotal >= GWP_THRESHOLD && cartTotal < GWP_THRESHOLD;
  
  // Get category from product tags for breadcrumb
  const getCategoryInfo = () => {
    const categoryTag = node.tags.find(tag => tag.startsWith('category:'));
    if (!categoryTag) return { name: 'Productos', slug: 'productos', path: '/productos' };
    
    const categorySlug = categoryTag.replace('category:', '');
    const categoryNames: Record<string, string> = {
      'depilacion-ipl': 'Depilación IPL',
      'masajeadores-faciales': 'Masajeadores Faciales',
      'limpieza-facial': 'Limpieza Facial',
      'mesoterapia': 'Mesoterapia',
      'corporales': 'Cuidado Corporal',
      'cuidado-capilar': 'Cuidado Capilar',
      'pretty-face': 'Pretty Face',
      'smartwatches': 'Smartwatches',
      'accessories': 'Accesorios'
    };
    
    return {
      name: categoryNames[categorySlug] || 'Productos',
      slug: categorySlug,
      path: `/categoria/${categorySlug}`
    };
  };
  
  const categoryInfo = getCategoryInfo();
  
  return <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8 px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Productos', href: '/productos' },
            { label: categoryInfo.name, href: categoryInfo.path },
            { label: node.title }
          ]}
        />
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images/Video - Interactive Gallery */}
          <div className="space-y-4">
            {/* Main Media Display with Zoom */}
            <div className="relative aspect-square rounded-lg overflow-hidden group bg-muted/10 border">
              {node.images.edges[selectedImage]?.node && <Zoom>
                <img src={node.images.edges[selectedImage].node.url} alt={node.images.edges[selectedImage].node.altText || node.title} className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300" />
              </Zoom>}
              
              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
                <span className="text-xs font-medium">Click para ampliar</span>
              </div>
              
              {/* Locked overlay removed - Product is now available */}
              
              {/* Image Counter */}
              {node.images.edges.length > 1 && <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-medium">
                    {selectedImage + 1} / {node.images.edges.length}
                  </span>
                </div>}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {/* Image thumbnails */}
              {node.images.edges.map((image, idx) => <button key={idx} onClick={() => {
              setSelectedImage(idx);
            }} className={`aspect-square bg-muted/10 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${selectedImage === idx ? 'border-primary scale-105' : 'border-transparent hover:border-muted-foreground/30'}`}>
                  <img src={image.node.url} alt={image.node.altText || `${node.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                </button>)}
            </div>
            
            {/* Trust Indicators Below Images */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground">Imágenes reales del producto</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Maximize2 className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Haz click para ver en detalle</span>
              </div>
            </div>
          </div>

            {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {/* Promotional Stage Badge - Highest priority */}
                {priceInfo.hasDiscount && priceInfo.stage && <Badge variant="destructive" className="text-sm md:text-base px-3 py-1">
                    <Zap className="mr-1 w-4 h-4" />
                    {priceInfo.stage.badge} {priceInfo.discountLabel}
                  </Badge>}
                {isNew && <Badge className="text-sm">Nuevo</Badge>}
                {isBestseller && <Badge variant="secondary" className="text-sm">Bestseller</Badge>}
                <Badge variant="outline" className="gap-1 text-sm">
                  <Shield className="w-3 h-3" />
                  Garantía 2 años
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-semibold mb-5 md:mb-4 tracking-tight leading-tight">{node.title}</h1>
              
              {/* Quick Benefits - Above the fold */}
              <div className="flex flex-wrap gap-3 mb-5">
                {productContent.quickBenefits.map((benefit, idx) => {
                const IconComponent = (LucideIcons as any)[benefit.icon] || Clock;
                return <div key={idx} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span>{benefit.text}</span>
                    </div>;
              })}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b py-6 my-6">
              {priceInfo.hasDiscount ? <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl md:text-5xl font-semibold text-primary tracking-tight">
                      €{priceInfo.discountedPrice.toFixed(2)}
                    </div>
                    <Badge variant="destructive" className="text-base md:text-lg px-4 py-1.5">
                      {priceInfo.discountLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl line-through text-muted-foreground">
                      €{priceInfo.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Ahorras €{(priceInfo.originalPrice - priceInfo.discountedPrice).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">IVA incluido</p>
                </div> : <div>
                  <div className="text-4xl md:text-5xl font-semibold tracking-tight">€{priceInfo.originalPrice.toFixed(2)}</div>
                  <p className="text-sm mt-1 text-muted-foreground">IVA incluido</p>
                </div>}
            </div>

            {/* Black Friday Email Notification removed - Product now available */}

            {/* GWP Progress Incentive */}
            {hasGWPActive && <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border-2 border-purple-200">
                    <img src={gwpHeadband} alt="Banda de pelo gratis" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                        ¡Obtén un regalo gratis!
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Banda de pelo Garett Routine 
                    </p>
                  </div>
                </div>
                
                {willUnlockGWP ? <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-bold text-sm">¡Añadiendo este producto desbloqueas tu regalo!</p>
                        <p className="text-xs opacity-90">Banda de pelo gratis incluida</p>
                      </div>
                    </div>
                  </div> : potentialTotal >= GWP_THRESHOLD ? <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-green-900 dark:text-green-100">¡Regalo desbloqueado!</p>
                        <p className="text-xs text-green-700 dark:text-green-300">Banda de pelo gratis con tu compra</p>
                      </div>
                    </div>
                  </div> : <>
                    <Progress value={progressPercentage} className="h-2 mb-2" />
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      {remainingForGWP > 0 ? <>Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para obtener tu <span className="font-bold">banda de pelo gratis</span></> : <span className="font-bold">¡Banda de pelo gratis desbloqueada!</span>}
                    </p>
                  </>}
              </div>}

            {/* Variants */}
            {node.variants.edges.length > 1 && <div className="my-6">
                <label className="text-sm font-medium mb-3 block">Variante</label>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map((v, idx) => <Button key={v.node.id} variant={selectedVariant === idx ? "default" : "outline"} onClick={() => setSelectedVariant(idx)} className="h-11">
                      {v.node.title}
                    </Button>)}
                </div>
              </div>}

            {/* Add to Cart */}
            <Button 
              size="lg" 
              className="w-full h-12 text-base" 
              onClick={handleAddToCart} 
              disabled={!variant?.availableForSale}
            >
              {variant?.availableForSale ? 'Añadir al carrito' : 'Agotado'}
            </Button>

            {/* Product Video - Below Add to Cart for AeroGlow */}
            {isAeroGlow && (
              <div className="rounded-lg overflow-hidden border bg-muted/10">
                <VideoPlayer 
                  srcWebM="/videos/aeroglow-product-new.webm" 
                  poster={node.images.edges[0]?.node.url} 
                  autoplay={false} 
                  muted={true} 
                  loop={true} 
                  controls={true} 
                  showPlayButton={true} 
                  className="w-full"
                  fallback={
                    node.images.edges[0]?.node && (
                      <img 
                        src={node.images.edges[0].node.url} 
                        alt={node.images.edges[0].node.altText || node.title} 
                        className="w-full h-full object-cover" 
                      />
                    )
                  }
                />
              </div>
            )}

            {/* Trust Badges - Compact Version */}
            <div className="pt-6 border-t">
              <TrustBadges variant="compact" />
            </div>

            {/* Product Details Sections - User Focused */}
            <div className="space-y-3 pt-8 border-t">
              <h3 className="font-semibold text-lg md:text-xl mb-5 tracking-tight">Información del producto</h3>
              
              {/* Why It Works */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Sparkle className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left text-base">{productContent.dropdowns.howItWorks.title}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 text-sm space-y-2 text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground">{productContent.dropdowns.howItWorks.summary}</p>
                  {productContent.dropdowns.howItWorks.details.map((detail, idx) => <p key={idx}>{detail}</p>)}
                </CollapsibleContent>
              </Collapsible>

              {/* Expected Results */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left text-base">Resultados esperados</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 text-sm space-y-2 text-muted-foreground leading-relaxed">
                  <div className="space-y-3">
                    {productContent.dropdowns.expectedResults.phases.map((phase, idx) => <div key={idx}>
                        <p className="font-medium text-foreground">{phase.timeframe}</p>
                        <p>{phase.description}</p>
                      </div>)}
                  </div>
                  <p className="italic pt-2">{productContent.dropdowns.expectedResults.usageNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* How to Use */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left text-base">Cómo usar (muy fácil)</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  <ol className="space-y-2 list-decimal list-inside">
                    {productContent.dropdowns.howToUse.steps.map((step, idx) => <li key={idx}>{step}</li>)}
                  </ol>
                  <p className="mt-3 font-medium text-foreground">{productContent.dropdowns.howToUse.additionalNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* What Makes It Different */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left text-base">¿Qué la diferencia?</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 text-sm space-y-3 text-muted-foreground leading-relaxed">
                  {productContent.dropdowns.whatMakesDifferent.map((diff, idx) => <div key={idx}>
                      <p className="font-medium text-foreground">{diff.title}</p>
                      <p>{diff.description}</p>
                    </div>)}
                </CollapsibleContent>
              </Collapsible>

              {/* Safety & Guarantee */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-5 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left text-base">Seguridad y garantía</span>
                  </div>
                  <ChevronDown className="w-5 h-5 transition-transform text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-5 text-sm space-y-2 text-muted-foreground leading-relaxed">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                      <div>
                        <p className="font-medium text-foreground">Certificado CE</p>
                        <p>Cumple con todos los estándares europeos de seguridad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                      <div>
                        <p className="font-medium text-foreground">24 meses de garantía comercial</p>
                        <p>Contra defectos de fabricación</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                      <div>
                        <p className="font-medium text-foreground">Devolución por defecto técnico</p>
                        <Link to="/garantia" className="text-sm underline hover:text-primary">
                          Consulta condiciones en política de garantía
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p className="pt-2 italic">Respaldado por El Corte Inglés. No es una tienda online cualquiera.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Trust Footer */}
            <div className="p-5 rounded-lg text-xs border bg-muted/30 text-muted-foreground leading-relaxed">
              <p>Los resultados pueden variar. Úsalo con constancia para mejores resultados. Certificado CE. Garantía comercial 2 años. Producto higiénico-sanitario: no admite devolución una vez desprecintado salvo defecto técnico verificado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Buy Box - Mobile Only */}
      {isMobile && <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg safe-area-inset-bottom">
          <div className="container flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{node.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-primary">
                  €{priceInfo.discountedPrice.toFixed(2)}
                </span>
                {priceInfo.hasDiscount && <span className="text-xs line-through text-muted-foreground">
                    €{priceInfo.originalPrice.toFixed(2)}
                  </span>}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>Garantía 2 años</span>
              </div>
            </div>
            <Button size="lg" className="flex-shrink-0 h-12 px-6" onClick={handleAddToCart} disabled={!variant?.availableForSale}>
              {variant?.availableForSale ? 'Añadir' : 'Agotado'}
            </Button>
          </div>
        </div>}

      {/* Related Products Section */}
      <div className="container py-8 px-6">
        <RelatedProducts currentProduct={product} />
      </div>

      <Footer />
    </div>;
};
export default ProductDetail;