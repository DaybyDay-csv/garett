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
        "flex items-center gap-1 overflow-x-auto scrollbar-hide",
        className
      )}
      aria-label="Categorías"
    >
      {includeAll && (
        <Link
          to="/productos"
          className={cn(
            "flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
            !activeSlug
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
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
              "flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
};
