import klarnaLogo from "@/assets/klarna-badge.png";

interface KlarnaWidgetProps {
  price: number;
  variant?: "product" | "cart";
  className?: string;
}

export const KlarnaWidget = ({ price, variant = "product", className = "" }: KlarnaWidgetProps) => {
  const installmentAmount = (price / 3).toFixed(2);
  
  // Klarna typically works for purchases between €5 and €1500
  const isEligible = price >= 5 && price <= 1500;
  
  if (!isEligible) return null;
  
  if (variant === "cart") {
    return (
      <div className={`flex items-center justify-center gap-2.5 py-2.5 px-3 bg-[#FFB3C7]/15 rounded-lg border border-[#FFB3C7]/30 ${className}`}>
        <img 
          src={klarnaLogo} 
          alt="Klarna" 
          className="h-5 rounded"
        />
        <span className="text-xs text-muted-foreground">
          o <strong className="text-foreground">3 cuotas de €{installmentAmount}</strong> sin intereses
        </span>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center gap-3 py-2.5 px-3.5 bg-[#FFB3C7]/10 rounded-lg border border-[#FFB3C7]/25 ${className}`}>
      <img 
        src={klarnaLogo} 
        alt="Klarna" 
        className="h-6 rounded"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          3 cuotas de €{installmentAmount}
        </span>
        <span className="text-xs text-muted-foreground">
          sin intereses con Klarna
        </span>
      </div>
    </div>
  );
};
