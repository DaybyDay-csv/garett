import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
import garettLogo from "@/assets/garett-logo-footer.png";
import garettPattern from "@/assets/garett-pattern-2.png";
import { NewsletterCTA } from "@/components/NewsletterCTA";
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url(${garettPattern})`,
      backgroundSize: '150px',
      backgroundRepeat: 'repeat'
    }} />

      <div className="container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <Link to="/">
              <img src={garettLogo} alt="GARETT" className="h-9 object-contain hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tecnología de belleza profesional para resultados visibles. Innovación y calidad certificada.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/garettbeauty.spain/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              
              <a href="https://www.youtube.com/@GARETTpl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-semibold text-base mb-5">Categorías</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/productos?category=capilar" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Cuidado capilar
                </Link>
              </li>
              <li>
                <Link to="/productos?category=masajeadores-faciales" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Masajeadores faciales
                </Link>
              </li>
              <li>
                <Link to="/productos?category=limpieza-facial" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Limpieza facial
                </Link>
              </li>
              <li>
                <Link to="/productos?category=mesoterapia" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Dispositivos de Mesoterapia
                </Link>
              </li>
              <li>
                <Link to="/productos?category=corporales" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Dispositivos corporales
                </Link>
              </li>
              <li>
                <Link to="/productos?category=ipl" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Depilación e IPL
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="font-semibold text-base mb-5">Información</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/black-friday" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Black Friday
                </Link>
              </li>
              <li>
                <Link to="/novedades" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Novedades
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-cookies" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link to="/aviso-legal" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Garantía y devoluciones
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Envíos y entregas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-5">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/60" />
                <div>
                  <a href="mailto:info@garett.es" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    info@garett.es
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/60" />
                <div>
                  <a className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" href="tel:+34913822400\n">
                    +34 913822400

                  </a>
                  <p className="text-primary-foreground/50 text-xs mt-1.5">
                    Lun - Vie: 9:00 - 18:00
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-foreground/60" />
                <div className="text-primary-foreground/70">
                  <p>Madrid, España</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold text-base mb-5">Mantente informado</h3>
            <p className="text-primary-foreground/70 text-sm mb-5 leading-relaxed">
              Recibe alertas de cada etapa de ofertas y descuentos exclusivos
            </p>
            <NewsletterCTA variant="default" size="sm" text="Notificarme" className="bg-white/10 hover:bg-white/20 border-white/20 text-white w-full" />
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-primary-foreground/50">
              <span className="flex items-center gap-1">
                Alertas
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Ofertas exclusivas
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>
              © {currentYear} Garett. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span>Certificado CE</span>
              <span>•</span>
              <span>Garantía 24 meses</span>
              <span>•</span>
              <span>Pago seguro SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};