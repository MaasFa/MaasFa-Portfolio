import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
        {title}
        <span className="text-primary ml-1">.</span>
      </h2>
      {subtitle && (
        <div className={cn("w-16 h-1 bg-primary rounded-full mb-6", align === "center" && "mx-auto")} />
      )}
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
