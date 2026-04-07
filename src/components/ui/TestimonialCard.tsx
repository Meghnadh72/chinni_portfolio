import { Star } from "lucide-react";

interface TestimonialCardProps {
  clientName: string;
  clientRole: string;
  quote: string;
  rating: number;
}

export default function TestimonialCard({
  clientName,
  clientRole,
  quote,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border rounded-sm p-6 md:p-8 flex flex-col h-full">
      <div className="text-accent text-5xl font-serif leading-none mb-4">&ldquo;</div>
      <p className="text-foreground/80 text-base md:text-lg leading-relaxed flex-1 mb-6">
        {quote}
      </p>
      <div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? "fill-accent text-accent" : "text-border"}
            />
          ))}
        </div>
        <p className="text-foreground font-medium">{clientName}</p>
        <p className="text-muted-foreground text-sm">{clientRole}</p>
      </div>
    </div>
  );
}
