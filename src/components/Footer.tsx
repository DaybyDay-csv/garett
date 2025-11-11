import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import garettLogo from "@/assets/garett-logo-white.png";
import garettPattern from "@/assets/garett-pattern-2.png";
import { NewsletterCTA } from "@/components/NewsletterCTA";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url(${garettPattern})`,
          backgroundSize: '150px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="container relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-2">
                <img src={garettLogo} alt="Garett" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold">GARETT</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tecnología de belleza profesional para resultados visibles. Innovación y calidad certificada.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/productos?category=capilar" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Cuidado capilar
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos?category=masajeadores-faciales" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Masajeadores faciales
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos?category=limpieza-facial" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Limpieza facial
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos?category=mesoterapia" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Dispositivos de Mesoterapia
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos?category=corporales" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Dispositivos corporales
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos?category=ipl" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Depilación e IPL
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/black-friday" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Black Friday
                </Link>
              </li>
              <li>
                <Link 
                  to="/novedades" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Política de devoluciones
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Envíos y entregas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/80" />
                <div>
                  <a 
                    href="mailto:info@garett.es" 
                    className="text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    info@garett.es
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/80" />
                <div>
                  <a 
                    href="tel:+34900000000" 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    +34 900 000 000
                  </a>
                  <p className="text-primary-foreground/60 text-xs mt-1">
                    Lun - Vie: 9:00 - 18:00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/80" />
                <div className="text-primary-foreground/80">
                  <p>Madrid, España</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Mantente informado</h3>
            <p className="text-primary-foreground/80 text-sm mb-4 leading-relaxed">
              Recibe alertas de cada etapa de ofertas y descuentos exclusivos
            </p>
            <NewsletterCTA 
              variant="default" 
              size="sm"
              text="Notificarme"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white w-full"
            />
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-primary-foreground/60">
              <span className="flex items-center gap-1">
                🔔 Alertas
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🎁 Ofertas exclusivas
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {currentYear} Garett. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs">Certificado CE</span>
              <span className="text-xs">•</span>
              <span className="text-xs">Garantía 3 años</span>
              <span className="text-xs">•</span>
              <span className="text-xs">Pago seguro SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
