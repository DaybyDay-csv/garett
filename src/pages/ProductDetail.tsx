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
const ProductDetail = () => {
  const {
    handle
  } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video'>('image');
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
          // For AeroGlow, default to video
          const isAeroGlowProduct = found.node.handle.toLowerCase().includes('aeroglow');
          if (isAeroGlowProduct) {
            setSelectedMediaType('video');
          }

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
  return <div className={`min-h-screen ${isAeroGlow ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-red-950' : 'bg-background'}`}>
      <Header />
      
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images/Video - Interactive Gallery */}
          <div className="space-y-4">
            {/* Main Media Display with Video/Zoom */}
            <div className={`relative aspect-square rounded-lg overflow-hidden group ${isAeroGlow ? 'bg-gray-900/50 ring-2 ring-red-600/30 shadow-2xl shadow-red-950/50' : 'bg-secondary/20'}`}>
              {/* Display Video or Image based on selection */}
              {selectedMediaType === 'video' && isAeroGlow ? <VideoPlayer src="/videos/aeroglow-product.mp4" poster={node.images.edges[0]?.node.url} autoplay={false} muted={true} loop={true} controls={true} showPlayButton={true} className="w-full h-full" fallback={node.images.edges[selectedImage]?.node && <img src={node.images.edges[selectedImage].node.url} alt={node.images.edges[selectedImage].node.altText || node.title} className="w-full h-full object-cover" />} /> : node.images.edges[selectedImage]?.node && <Zoom>
                    <img src={node.images.edges[selectedImage].node.url} alt={node.images.edges[selectedImage].node.altText || node.title} className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300" />
                  </Zoom>}
              
              {/* Zoom/Video Indicator */}
              {selectedMediaType === 'image' && <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                  <span className="text-xs font-medium">Click para ampliar</span>
                </div>}
              
              {/* Locked overlay for AeroGlow */}
              {isAeroGlow && <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/70 to-black/90 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <Lock className="w-20 h-20 text-red-500 mx-auto animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,1)]" />
                    <div className="space-y-2">
                      <p className="text-white font-bold text-2xl drop-shadow-lg">PRODUCTO BLOQUEADO</p>
                      <p className="text-red-400 text-sm font-semibold">SE DESBLOQUEA EL 28 DE NOVIEMBRE</p>
                    </div>
                  </div>
                </div>}
              
              {/* Image Counter */}
              {node.images.edges.length > 1 && <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-medium">
                    {selectedImage + 1} / {node.images.edges.length}
                  </span>
                </div>}
            </div>
            
            {/* Thumbnail Gallery with Video */}
            <div className="grid grid-cols-5 gap-3">
              {/* Video thumbnail for AeroGlow */}
              {isAeroGlow && <button onClick={() => setSelectedMediaType('video')} className={`relative aspect-square bg-gray-900/50 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${selectedMediaType === 'video' ? 'border-red-500 shadow-lg shadow-red-500/30 scale-105' : 'border-red-800/50 opacity-60 hover:opacity-100'}`}>
                  <img src={node.images.edges[0]?.node.url} alt="Product Video" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="w-6 h-6 text-white fill-white drop-shadow-lg" />
                  </div>
                </button>}
              
              {/* Image thumbnails */}
              {node.images.edges.map((image, idx) => <button key={idx} onClick={() => {
              setSelectedImage(idx);
              setSelectedMediaType('image');
            }} className={`aspect-square bg-secondary/20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${selectedMediaType === 'image' && selectedImage === idx ? isAeroGlow ? 'border-red-500 shadow-lg shadow-red-500/30 scale-105' : 'border-primary shadow-lg scale-105' : isAeroGlow ? 'border-red-800/50 opacity-60 hover:opacity-100' : 'border-transparent hover:border-primary/50'} ${isAeroGlow ? 'bg-gray-900/30' : ''}`}>
                  <img src={image.node.url} alt={image.node.altText || `${node.title} - ${idx + 1}`} className={`w-full h-full object-cover ${isAeroGlow ? 'opacity-70' : ''}`} />
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
              <div className="flex gap-2 mb-3 flex-wrap">
                {/* Promotional Stage Badge - Highest priority */}
                {priceInfo.hasDiscount && priceInfo.stage && <Badge className={`bg-gradient-to-r ${priceInfo.stage.color} text-white border-0 ${isAeroGlow ? 'animate-pulse text-lg px-4 py-2' : ''}`}>
                    <Zap className={`mr-1 ${isAeroGlow ? 'w-5 h-5' : 'w-3 h-3'}`} />
                    {priceInfo.stage.badge} {priceInfo.discountLabel}
                  </Badge>}
                {!isAeroGlow && isNew && <Badge>Nuevo</Badge>}
                {!isAeroGlow && isBestseller && <Badge variant="secondary">Bestseller</Badge>}
                <Badge variant="outline" className={`gap-1 ${isAeroGlow ? 'border-red-600/30 text-gray-300' : ''}`}>
                  <Shield className="w-3 h-3" />
                  Garantía 2 años
                </Badge>
              </div>
              
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isAeroGlow ? 'text-white drop-shadow-lg' : ''}`}>{node.title}</h1>
              
              {/* Quick Benefits - Above the fold */}
              <div className="flex flex-wrap gap-3 mb-4">
                {productContent.quickBenefits.map((benefit, idx) => {
                const IconComponent = (LucideIcons as any)[benefit.icon] || Clock;
                return <div key={idx} className={`flex items-center gap-1.5 text-sm ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                      <IconComponent className={`w-4 h-4 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                      <span>{benefit.text}</span>
                    </div>;
              })}
              </div>
            </div>

            {/* Price */}
            <div className={`border-t border-b py-6 ${isAeroGlow ? 'border-red-900/30 bg-gradient-to-r from-red-950/20 to-pink-950/20 rounded-lg px-4' : ''}`}>
              {priceInfo.hasDiscount ? <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <div className={`text-4xl font-bold ${isAeroGlow ? 'text-red-500 text-5xl' : 'text-primary'}`}>
                      €{priceInfo.discountedPrice.toFixed(2)}
                    </div>
                    <Badge variant="destructive" className={`text-base px-3 py-1 ${isAeroGlow ? 'bg-gradient-to-r from-red-600 to-pink-600 text-lg px-4 py-2' : ''}`}>
                      {priceInfo.discountLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl line-through ${isAeroGlow ? 'text-gray-500' : 'text-muted-foreground'}`}>
                      €{priceInfo.originalPrice.toFixed(2)}
                    </span>
                    <span className={`text-sm ${isAeroGlow ? 'text-gray-400 font-semibold' : 'text-muted-foreground'}`}>
                      Ahorras €{(priceInfo.originalPrice - priceInfo.discountedPrice).toFixed(2)}
                    </span>
                  </div>
                  <p className={`text-sm ${isAeroGlow ? 'text-gray-400' : 'text-muted-foreground'}`}>IVA incluido</p>
                </div> : <div>
                  <div className={`text-4xl font-bold ${isAeroGlow ? 'text-white' : ''}`}>€{priceInfo.originalPrice.toFixed(2)}</div>
                  <p className={`text-sm mt-1 ${isAeroGlow ? 'text-gray-400' : 'text-muted-foreground'}`}>IVA incluido</p>
                </div>}
            </div>

            {/* Black Friday Email Notification - Only for AeroGlow */}
            {isAeroGlow && <form onSubmit={handleNotifySubmit} className="bg-gradient-to-br from-red-950/40 via-red-900/30 to-pink-950/40 border-2 border-red-600/40 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Bell className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">Notifícame en Black Friday</h3>
                    <p className="text-gray-300 text-xs mb-3">Recibe un email cuando esté disponible con 50% OFF</p>
                    <div className="flex gap-2">
                      <Input type="email" placeholder="tu@email.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} className="h-9 bg-gray-900/50 border-red-600/30 text-white placeholder:text-gray-500 focus:border-red-500" disabled={isSubmittingEmail} required />
                      <Button type="submit" size="sm" disabled={isSubmittingEmail} className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                        {isSubmittingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Notificar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>}

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
            {node.variants.edges.length > 1 && <div>
                <label className="text-sm font-medium mb-2 block">Variante</label>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map((v, idx) => <Button key={v.node.id} variant={selectedVariant === idx ? "default" : "outline"} onClick={() => setSelectedVariant(idx)}>
                      {v.node.title}
                    </Button>)}
                </div>
              </div>}

            {/* Add to Cart */}
            {isAeroGlow ? <div className="space-y-4">
                <Button size="lg" className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-500 cursor-not-allowed border-2 border-red-600/30 hover:border-red-600/50 transition-all relative overflow-hidden group" disabled>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-950/20 to-red-950/0 animate-pulse" />
                  <Lock className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10 font-bold">PRODUCTO BLOQUEADO</span>
                </Button>
                
                <div className="relative bg-gradient-to-br from-red-950/40 via-red-900/30 to-pink-950/40 border-2 border-red-600/40 rounded-xl p-6 overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-6 h-6 text-red-500 animate-pulse" />
                      <p className="text-white font-bold text-lg">SE DESBLOQUEA EN BLACK FRIDAY</p>
                      <Zap className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <p className="text-sm">28 de Noviembre 2025</p>
                    </div>
                    
                    <CountdownTimer targetDate={unlockDate} />
                    
                    <div className="text-center pt-2 border-t border-red-600/30">
                      <p className="text-red-400 font-bold text-xl animate-pulse">50% OFF EXCLUSIVO</p>
                      <p className="text-gray-400 text-xs mt-1">Stock limitado - primer llegado, primer servido</p>
                    </div>
                  </div>
                </div>
                
                
              </div> : <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!variant?.availableForSale}>
                {variant?.availableForSale ? 'Añadir al carrito' : 'Agotado'}
              </Button>}

            {/* Trust Badges - Compact Version */}
            <div className="pt-6 border-t">
              <TrustBadges variant="compact" />
            </div>

            {/* Product Details Sections - User Focused */}
            <div className={`space-y-3 pt-6 border-t ${isAeroGlow ? 'border-red-900/30' : ''}`}>
              <h3 className={`font-semibold text-lg mb-4 ${isAeroGlow ? 'text-white' : ''}`}>Información del producto</h3>
              
              {/* Why It Works */}
              <Collapsible className={`border rounded-lg ${isAeroGlow ? 'border-red-800/50 bg-gray-900/50' : ''}`}>
                <CollapsibleTrigger className={`flex items-center justify-between w-full p-4 transition-colors ${isAeroGlow ? 'hover:bg-red-950/30 text-white' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Sparkle className={`w-5 h-5 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                    <span className="font-medium text-left">{productContent.dropdowns.howItWorks.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAeroGlow ? 'text-gray-300' : 'text-muted-foreground'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className={`px-4 pb-4 text-sm space-y-2 ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                  <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>{productContent.dropdowns.howItWorks.summary}</p>
                  {productContent.dropdowns.howItWorks.details.map((detail, idx) => <p key={idx}>{detail}</p>)}
                </CollapsibleContent>
              </Collapsible>

              {/* Expected Results */}
              <Collapsible className={`border rounded-lg ${isAeroGlow ? 'border-red-800/50 bg-gray-900/50' : ''}`}>
                <CollapsibleTrigger className={`flex items-center justify-between w-full p-4 transition-colors ${isAeroGlow ? 'hover:bg-red-950/30 text-white' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                    <span className="font-medium text-left">Resultados esperados</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAeroGlow ? 'text-gray-300' : 'text-muted-foreground'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className={`px-4 pb-4 text-sm space-y-2 ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                  <div className="space-y-3">
                    {productContent.dropdowns.expectedResults.phases.map((phase, idx) => <div key={idx}>
                        <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>{phase.timeframe}</p>
                        <p>{phase.description}</p>
                      </div>)}
                  </div>
                  <p className="italic pt-2">{productContent.dropdowns.expectedResults.usageNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* How to Use */}
              <Collapsible className={`border rounded-lg ${isAeroGlow ? 'border-red-800/50 bg-gray-900/50' : ''}`}>
                <CollapsibleTrigger className={`flex items-center justify-between w-full p-4 transition-colors ${isAeroGlow ? 'hover:bg-red-950/30 text-white' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                    <span className="font-medium text-left">Cómo usar (muy fácil)</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAeroGlow ? 'text-gray-300' : 'text-muted-foreground'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className={`px-4 pb-4 text-sm ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                  <ol className="space-y-2 list-decimal list-inside">
                    {productContent.dropdowns.howToUse.steps.map((step, idx) => <li key={idx}>{step}</li>)}
                  </ol>
                  <p className={`mt-3 font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>{productContent.dropdowns.howToUse.additionalNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* What Makes It Different */}
              <Collapsible className={`border rounded-lg ${isAeroGlow ? 'border-red-800/50 bg-gray-900/50' : ''}`}>
                <CollapsibleTrigger className={`flex items-center justify-between w-full p-4 transition-colors ${isAeroGlow ? 'hover:bg-red-950/30 text-white' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Award className={`w-5 h-5 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                    <span className="font-medium text-left">¿Qué la diferencia?</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAeroGlow ? 'text-gray-300' : 'text-muted-foreground'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className={`px-4 pb-4 text-sm space-y-3 ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                  {productContent.dropdowns.whatMakesDifferent.map((diff, idx) => <div key={idx}>
                      <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>{diff.title}</p>
                      <p>{diff.description}</p>
                    </div>)}
                </CollapsibleContent>
              </Collapsible>

              {/* Safety & Guarantee */}
              <Collapsible className={`border rounded-lg ${isAeroGlow ? 'border-red-800/50 bg-gray-900/50' : ''}`}>
                <CollapsibleTrigger className={`flex items-center justify-between w-full p-4 transition-colors ${isAeroGlow ? 'hover:bg-red-950/30 text-white' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <Shield className={`w-5 h-5 ${isAeroGlow ? 'text-red-400' : 'text-primary'}`} />
                    <span className="font-medium text-left">Seguridad y garantía</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isAeroGlow ? 'text-gray-300' : 'text-muted-foreground'}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className={`px-4 pb-4 text-sm space-y-2 ${isAeroGlow ? 'text-gray-200' : 'text-muted-foreground'}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isAeroGlow ? 'text-green-400' : 'text-green-600'}`} />
                      <div>
                        <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>Certificado CE</p>
                        <p>Cumple con todos los estándares europeos de seguridad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isAeroGlow ? 'text-green-400' : 'text-green-600'}`} />
                      <div>
                        <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>24 meses de garantía comercial</p>
                        <p>Contra defectos de fabricación</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isAeroGlow ? 'text-green-400' : 'text-green-600'}`} />
                      <div>
                        <p className={`font-medium ${isAeroGlow ? 'text-white' : 'text-foreground'}`}>Devolución por defecto técnico</p>
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
            <div className={`p-4 rounded-lg text-xs border ${isAeroGlow ? 'bg-red-950/20 border-red-900/30 text-gray-300' : 'bg-muted/30 border text-muted-foreground'}`}>
              <p>Los resultados pueden variar. Úsalo con constancia para mejores resultados. Certificado CE. Garantía comercial 2 años. Producto higiénico-sanitario: no admite devolución una vez desprecintado salvo defecto técnico verificado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Buy Box - Mobile Only */}
      {isMobile && !isAeroGlow && <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
          <div className="container flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{node.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
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
            <Button size="lg" className="flex-shrink-0" onClick={handleAddToCart} disabled={!variant?.availableForSale}>
              {variant?.availableForSale ? 'Añadir' : 'Agotado'}
            </Button>
          </div>
        </div>}

      <Footer />
    </div>;
};
export default ProductDetail;