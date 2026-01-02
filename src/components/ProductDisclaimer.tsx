import { getCategoryFromTags } from "@/lib/categories";
interface ProductDisclaimerProps {
  tags: string[];
}
export const ProductDisclaimer = ({
  tags
}: ProductDisclaimerProps) => {
  const category = getCategoryFromTags(tags);

  // Don't show disclaimer if category doesn't have one
  if (!category?.disclaimer) {
    return null;
  }
  return <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-3">
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            Aviso
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {category.disclaimer}
          </p>
        </div>
      </div>
    </div>;
};