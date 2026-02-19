import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/OptimizedImage";

interface RecentlyViewedProps {
  excludeHandle?: string;
}

export const RecentlyViewed = ({ excludeHandle }: RecentlyViewedProps) => {
  const items = useRecentlyViewed(excludeHandle);
  
  if (items.length === 0) return null;
  
  return (
    <div className="py-8 border-t">
      <h3 className="text-lg font-semibold mb-4">Vistos recientemente</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}>
        {items.map((item) => (
          <Link
            key={item.handle}
            to={`/producto/${item.handle}`}
            className="flex-shrink-0 w-[140px] group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-muted/10 border mb-2">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              €{parseFloat(item.price).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
