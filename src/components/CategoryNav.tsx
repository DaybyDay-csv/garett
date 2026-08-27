import { Link } from "react-router-dom";
import { CATEGORY_NAV } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  activeSlug?: string;
  className?: string;
  includeAll?: boolean;
}

export const CategoryNav = ({ activeSlug, className, includeAll = true }: CategoryNavProps) => {
  return (
    <nav
      className={cn(
        "flex items-center gap-5 md:gap-7 overflow-x-auto scrollbar-hide",
        className
      )}
      aria-label="Categorías"
    >
      {includeAll && (
        <Link
          to="/productos"
          className={cn(
            "flex-shrink-0 whitespace-nowrap text-[13px] uppercase tracking-wide transition-colors",
            !activeSlug
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Todos
        </Link>
      )}
      {CATEGORY_NAV.map((cat) => {
        const active = activeSlug === cat.slug;
        return (
          <Link
            key={cat.slug}
            to={`/categoria/${cat.slug}`}
            className={cn(
              "flex-shrink-0 whitespace-nowrap text-[13px] uppercase tracking-wide transition-colors",
              active
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
};
