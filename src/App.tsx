import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { FloatingCountdown } from "@/components/FloatingCountdown";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Search from "./pages/Search";
import BlackFriday from "./pages/BlackFriday";
import NewArrivals from "./pages/NewArrivals";
import Superventas from "./pages/Superventas";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaCookies from "./pages/PoliticaCookies";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnnouncementBar />
          <FloatingCountdown />
          <NewsletterPopup />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/busqueda" element={<Search />} />
            <Route path="/categoria/:category" element={<Category />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
            <Route path="/black-friday" element={<BlackFriday />} />
            <Route path="/novedades" element={<NewArrivals />} />
            <Route path="/superventas" element={<Superventas />} />
            <Route path="/garantia" element={<WarrantyPolicy />} />
            <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
