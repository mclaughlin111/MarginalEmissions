"use client";

import * as React from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/dissertation";

type ChapterNavProps = {
  items: NavItem[];
};

function NavLinks({
  items,
  activeId,
  onNavigate,
}: ChapterNavProps & {
  activeId?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Dissertation sections" className="space-y-0.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={onNavigate}
          className={cn(
            "group block rounded-md px-2.5 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            activeId === item.id && "bg-accent text-accent-foreground",
          )}
        >
          <span className="text-muted-foreground block text-[10px] font-medium uppercase tracking-wide">
            {item.eyebrow}
          </span>
          <span className="text-[13px] font-medium">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export function ChapterNav({ items }: ChapterNavProps) {
  const [activeId, setActiveId] = React.useState(items[0]?.id);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const updateActiveSection = () => {
      const activationLine = Math.max(120, window.innerHeight * 0.22);
      let current = items[0]?.id;

      for (const item of items) {
        const node = document.getElementById(item.id);
        if (!node) continue;

        if (node.getBoundingClientRect().top <= activationLine) {
          current = item.id;
        }
      }

      if (current) setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [items]);

  return (
    <>
      <aside className="sticky top-6 hidden max-h-[calc(100vh-3rem)] w-56 shrink-0 self-start lg:block">
        <div className="border-b pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Contents
          </p>
          <h2 className="mt-1.5 text-base font-semibold">Interactive Dissertation</h2>
        </div>
        <ScrollArea className="mt-3 h-[calc(100vh-9rem)] pr-2">
          <NavLinks items={items} activeId={activeId} />
        </ScrollArea>
      </aside>

      <div className="fixed right-3 bottom-3 z-40 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" aria-label="Open table of contents">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Contents</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-6rem)] px-3 pb-6">
              <NavLinks
                items={items}
                activeId={activeId}
                onNavigate={() => setOpen(false)}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
