import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import ComingSoon from "./pages/ComingSoon";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlackFriday from "./pages/BlackFriday";
import NewArrivals from "./pages/NewArrivals";
import Superventas from "./pages/Superventas";
import Search from "./pages/Search";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaCookies from "./pages/PoliticaCookies";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageTracker } from "./components/PageTracker";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("garett_admin") === "true"
  );

  const handleAdminLogin = () => {
    sessionStorage.setItem("garett_admin", "true");
    setIsAdmin(true);
  };

  if (!isAdmin) {
    return <ComingSoon onAdminLogin={handleAdminLogin} />;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/producto/:handle" element={<ProductDetail />} />
            <Route path="/categoria/:slug" element={<Category />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/black-friday" element={<BlackFriday />} />
            <Route path="/novedades" element={<NewArrivals />} />
            <Route path="/superventas" element={<Superventas />} />
            <Route path="/busqueda" element={<Search />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-cookies" element={<PoliticaCookies />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
            <Route path="/garantia" element={<WarrantyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
