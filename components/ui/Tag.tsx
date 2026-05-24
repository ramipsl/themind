import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 font-body text-[10px] tracking-widest uppercase",
        "border border-ink-faint rounded-full text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
