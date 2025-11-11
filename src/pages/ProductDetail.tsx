import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Flame, Gift, Sparkles, ZoomIn, Maximize2, ChevronDown, Clock, Award, Sparkle, Zap, Droplets, Activity, Battery, Package } from "lucide-react";
import { calculatePromotionalPrice, formatPrice, getCurrentPromotionalStage } from "@/lib/promotions";
import { getProductContent, detectProductCategory } from "@/lib/productContent";
import * as LucideIcons from "lucide-react";
import gwpHeadband from "@/assets/gwp-headband.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const items = useCartStore(state => state.items);
  
  // Calculate cart total for GWP
  const cartTotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const GWP_THRESHOLD = 70;
  const currentStage = getCurrentPromotionalStage();
  const hasGWPActive = currentStage?.hasGWP ?? false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts(100);
        const found = data.find(p => p.node.handle === handle);
        setProduct(found || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Button asChild>
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { node } = product;
  const variant = node.variants.edges[selectedVariant]?.node;
  const originalPrice = variant ? variant.price.amount : "0";
  
  // Calculate promotional pricing
  const priceInfo = calculatePromotionalPrice(originalPrice);
  
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
    
    const discountText = priceInfo.hasDiscount 
      ? ` (${priceInfo.discountLabel} aplicado)` 
      : '';
    
    toast.success('Añadido al carrito', {
      description: `${node.title}${discountText}`,
      position: 'top-center',
    });
  };

  const isNew = node.tags.includes('new:true');
  const isBestseller = node.tags.includes('bestseller:true');
  
  // Calculate GWP progress with this product
  const potentialTotal = cartTotal + priceInfo.discountedPrice;
  const progressPercentage = Math.min((potentialTotal / GWP_THRESHOLD) * 100, 100);
  const remainingForGWP = Math.max(GWP_THRESHOLD - potentialTotal, 0);
  const willUnlockGWP = potentialTotal >= GWP_THRESHOLD && cartTotal < GWP_THRESHOLD;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images - Interactive Gallery */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div className="relative aspect-square bg-secondary/20 rounded-lg overflow-hidden group">
              {node.images.edges[selectedImage]?.node && (
                <Zoom>
                  <img
                    src={node.images.edges[selectedImage].node.url}
                    alt={node.images.edges[selectedImage].node.altText || node.title}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300"
                  />
                </Zoom>
              )}
              
              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
                <span className="text-xs font-medium">Click para ampliar</span>
              </div>
              
              {/* Image Counter */}
              {node.images.edges.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg">
                  <span className="text-xs font-medium">
                    {selectedImage + 1} / {node.images.edges.length}
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {node.images.edges.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {node.images.edges.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-secondary/20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === idx 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${node.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
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
                {priceInfo.hasDiscount && priceInfo.stage && (
                  <Badge className={`bg-gradient-to-r ${priceInfo.stage.color} text-white border-0 animate-pulse`}>
                    <Flame className="w-3 h-3 mr-1" />
                    {priceInfo.stage.badge} {priceInfo.discountLabel}
                  </Badge>
                )}
                {isNew && <Badge>Nuevo</Badge>}
                {isBestseller && <Badge variant="secondary">Bestseller</Badge>}
                <Badge variant="outline" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Garantía 3 años
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{node.title}</h1>
              
              {/* Quick Benefits - Above the fold */}
              <div className="flex flex-wrap gap-3 mb-4">
                {productContent.quickBenefits.map((benefit, idx) => {
                  const IconComponent = (LucideIcons as any)[benefit.icon] || Clock;
                  return (
                    <div key={idx} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <span>{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b py-6">
              {priceInfo.hasDiscount ? (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold text-primary">
                      €{priceInfo.discountedPrice.toFixed(2)}
                    </div>
                    <Badge variant="destructive" className="text-base px-3 py-1">
                      {priceInfo.discountLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-muted-foreground line-through">
                      €{priceInfo.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Ahorras €{(priceInfo.originalPrice - priceInfo.discountedPrice).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">IVA incluido</p>
                </div>
              ) : (
                <div>
                  <div className="text-4xl font-bold">€{priceInfo.originalPrice.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground mt-1">IVA incluido</p>
                </div>
              )}
            </div>

            {/* GWP Progress Incentive */}
            {hasGWPActive && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border-2 border-purple-200">
                    <img 
                      src={gwpHeadband} 
                      alt="Banda de pelo gratis" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                        ¡Obtén un regalo gratis!
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Banda de pelo deportiva
                    </p>
                  </div>
                </div>
                
                {willUnlockGWP ? (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-bold text-sm">¡Añadiendo este producto desbloqueas tu regalo!</p>
                        <p className="text-xs opacity-90">Banda de pelo gratis incluida</p>
                      </div>
                    </div>
                  </div>
                ) : potentialTotal >= GWP_THRESHOLD ? (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <p className="font-bold text-sm text-green-900 dark:text-green-100">¡Regalo desbloqueado!</p>
                        <p className="text-xs text-green-700 dark:text-green-300">Banda de pelo gratis con tu compra</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Progress value={progressPercentage} className="h-2 mb-2" />
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      {remainingForGWP > 0 ? (
                        <>Añade <span className="font-bold">€{remainingForGWP.toFixed(2)}</span> más para obtener tu <span className="font-bold">banda de pelo gratis</span></>
                      ) : (
                        <span className="font-bold">¡Banda de pelo gratis desbloqueada!</span>
                      )}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Variants */}
            {node.variants.edges.length > 1 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Variante</label>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map((v, idx) => (
                    <Button
                      key={v.node.id}
                      variant={selectedVariant === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariant(idx)}
                    >
                      {v.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!variant?.availableForSale}
            >
              {variant?.availableForSale ? 'Añadir al carrito' : 'Agotado'}
            </Button>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Garantía 3 años</p>
                  <p className="text-sm text-muted-foreground">Cobertura completa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Envío en 24-48h</p>
                  <p className="text-sm text-muted-foreground">Envío gratuito desde 60€</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Devoluciones 30 días</p>
                  <p className="text-sm text-muted-foreground">Sin preguntas</p>
                </div>
              </div>
            </div>

            {/* Product Details Sections - User Focused */}
            <div className="space-y-3 pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">Información del producto</h3>
              
              {/* Why It Works */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Sparkle className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left">{productContent.dropdowns.howItWorks.title}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground space-y-2">
                  <p className="font-medium text-foreground">{productContent.dropdowns.howItWorks.summary}</p>
                  {productContent.dropdowns.howItWorks.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Expected Results */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left">Resultados esperados</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground space-y-2">
                  <div className="space-y-3">
                    {productContent.dropdowns.expectedResults.phases.map((phase, idx) => (
                      <div key={idx}>
                        <p className="font-medium text-foreground">{phase.timeframe}</p>
                        <p>{phase.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="italic pt-2">{productContent.dropdowns.expectedResults.usageNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* How to Use */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left">Cómo usar (muy fácil)</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
                  <ol className="space-y-2 list-decimal list-inside">
                    {productContent.dropdowns.howToUse.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-3 font-medium text-foreground">{productContent.dropdowns.howToUse.additionalNote}</p>
                </CollapsibleContent>
              </Collapsible>

              {/* What Makes It Different */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left">¿Qué la diferencia?</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground space-y-3">
                  {productContent.dropdowns.whatMakesDifferent.map((diff, idx) => (
                    <div key={idx}>
                      <p className="font-medium text-foreground">{diff.title}</p>
                      <p>{diff.description}</p>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Safety & Guarantee */}
              <Collapsible className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-medium text-left">Seguridad y garantía</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground space-y-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Certificado CE</p>
                        <p>Cumple con todos los estándares europeos de seguridad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">3 años de garantía</p>
                        <p>El doble del estándar del mercado</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">30 días de devolución</p>
                        <p>Si no estás satisfecha, te devolvemos el dinero</p>
                      </div>
                    </div>
                  </div>
                  <p className="pt-2 italic">Respaldado por El Corte Inglés. No es una tienda online cualquiera.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Trust Footer */}
            <div className="bg-muted/30 p-4 rounded-lg text-xs text-muted-foreground border">
              <p>Los resultados pueden variar. Úsalo con constancia para mejores resultados. Certificado CE. Garantía 3 años.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
