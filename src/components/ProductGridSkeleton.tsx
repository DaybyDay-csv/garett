import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

/** Placeholder con la forma de ProductCard mientras carga el catálogo. */
export const ProductGridSkeleton = ({ count = 6, className }: ProductGridSkeletonProps) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8", className)}>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    ))}
  </div>
);
