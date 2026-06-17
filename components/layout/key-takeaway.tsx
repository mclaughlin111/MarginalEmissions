import { LightbulbIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function KeyTakeaway({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-accent/35 p-4 text-sm leading-6 shadow-sm",
        className,
      )}
    >
      <div className="flex gap-3">
        <LightbulbIcon className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>{children}</p>
      </div>
    </div>
  );
}
