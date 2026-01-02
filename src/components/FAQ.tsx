import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export const FAQ = ({ items, title, description }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      <div className="container px-6">
        {title && (
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-secondary/10"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
