"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import katex from "katex";

import { cn } from "@/lib/utils";
import type { EquationVariable } from "@/types/dissertation";

function renderInlineLatex(latex: string) {
  return katex.renderToString(latex, {
    displayMode: false,
    throwOnError: false,
    strict: false,
  });
}

export function EquationVariablePopover({
  variable,
  className,
}: {
  variable: EquationVariable;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const contentId = React.useId();

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={open ? contentId : undefined}
        className="rounded-md border bg-background px-2 py-1 text-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((current) => !current)}
      >
        <span
          aria-label={variable.symbol}
          dangerouslySetInnerHTML={{ __html: renderInlineLatex(variable.symbol) }}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.span
            id={contentId}
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeInOut" }}
            className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-md border bg-popover p-3 text-left text-popover-foreground shadow-md"
          >
            <span className="block text-sm font-semibold">{variable.label}</span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              {variable.description}
            </span>
            {variable.unit ? (
              <span className="mt-2 block text-xs font-medium">Unit: {variable.unit}</span>
            ) : null}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
