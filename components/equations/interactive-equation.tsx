"use client";

import * as React from "react";
import katex from "katex";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EquationVariablePopover } from "@/components/equations/equation-variable-popover";
import type { Equation } from "@/types/dissertation";

function renderDisplayLatex(latex: string) {
  return katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
    strict: false,
  });
}

export function InteractiveEquation({ equation }: { equation: Equation }) {
  const rendered = React.useMemo(
    () => renderDisplayLatex(equation.latex),
    [equation.latex],
  );

  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{equation.source}</Badge>
          <CardTitle>{equation.title}</CardTitle>
        </div>
        {equation.explanation ? (
          <p className="text-sm leading-6 text-muted-foreground">
            {equation.explanation}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <div
          className="rounded-lg border bg-muted/35 p-4 text-center text-lg md:text-xl"
          aria-label={equation.latex}
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {equation.variables.map((variable) => (
            <EquationVariablePopover
              key={`${equation.id}-${variable.symbol}`}
              variable={variable}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
