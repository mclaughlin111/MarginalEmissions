import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FigureAsset } from "@/types/dissertation";

export function FigurePanel({ figure }: { figure: FigureAsset }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{figure.source}</Badge>
          <CardTitle>{figure.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-hidden rounded-md border bg-white">
          <Image
            src={figure.src}
            alt={figure.alt}
            width={1400}
            height={650}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 850px, 100vw"
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {figure.caption}
        </p>
        {figure.note ? (
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Verification note: {figure.note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
