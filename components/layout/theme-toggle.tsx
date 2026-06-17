"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Toggle theme"
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Toggle theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
