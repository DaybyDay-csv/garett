import { Calculator } from "lucide-react";

interface ScalapayWidgetProps {
  price: number;
  variant?: "product" | "cart";
  className?: string;
}

export const ScalapayWidget = ({ price, variant = "product", className = "" }: ScalapayWidgetProps) => {
  // Scalapay divides payment into 3 installments
  const installmentAmount = (price / 3).toFixed(2);
  
  // Scalapay typically works for purchases between €5 and €1500
  const isEligible = price >= 5 && price <= 1500;
  
  if (!isEligible) return null;
  
  if (variant === "cart") {
    return (
      <div className={`flex items-center justify-center gap-2 py-2 px-3 bg-[#FF8A00]/10 rounded-lg border border-[#FF8A00]/20 ${className}`}>
        <img 
          src="https://cdn.scalapay.com/img/logo-primary-business-online-scalapay.svg" 
          alt="Scalapay" 
          className="h-4"
        />
        <span className="text-xs text-muted-foreground">
          o <strong className="text-foreground">3 cuotas de €{installmentAmount}</strong> sin intereses
        </span>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center gap-2 py-2 px-3 bg-[#FF8A00]/10 rounded-lg border border-[#FF8A00]/20 ${className}`}>
      <img 
        src="https://cdn.scalapay.com/img/logo-primary-business-online-scalapay.svg" 
        alt="Scalapay" 
        className="h-5"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          3 cuotas de €{installmentAmount}
        </span>
        <span className="text-xs text-muted-foreground">
          sin intereses con Scalapay
        </span>
      </div>
      <Calculator className="w-4 h-4 text-[#FF8A00] ml-auto" />
    </div>
  );
};
