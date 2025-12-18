import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home Link */}
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 text-header-foreground/70 hover:text-header-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-header-foreground/50 flex-shrink-0" />
              {item.href && !isLast ? (
                <Link 
                  to={item.href}
                  className="text-header-foreground/70 hover:text-header-foreground transition-colors line-clamp-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-header-foreground font-medium line-clamp-1">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
