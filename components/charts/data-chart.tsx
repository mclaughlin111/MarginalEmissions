"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { AxisOptions, SeriesOptions } from "react-charts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChartSpec } from "@/types/dissertation";

type ReactChartDatum = {
  x: string | number;
  y: number;
  note?: string;
};

type ReactChartSeries = {
  label: string;
  data: ReactChartDatum[];
};

const ReactChart = dynamic(
  () => import("@/components/charts/react-chart").then((mod) => mod.ReactChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading chart
      </div>
    ),
  },
);

type DataChartProps = {
  spec: ChartSpec;
  className?: string;
};

export function DataChart({ spec, className }: DataChartProps) {
  const data = React.useMemo(() => spec.data, [spec.data]);
  const chartData = React.useMemo(
    (): ReactChartSeries[] =>
      data.map((series) => ({
        label: series.label,
        data: series.data.map((datum) => ({
          x: datum.primary,
          y: datum.secondary,
          note: datum.note,
        })),
      })),
    [data],
  );

  const axes = React.useMemo(
    (): AxisOptions<ReactChartDatum>[] => [
      {
        primary: true,
        type: spec.scaleType === "linear" ? "linear" : "ordinal",
        position: "bottom",
      },
      {
        type: "linear",
        position: "left",
        showGrid: true,
      },
    ],
    [spec.scaleType],
  );

  const series = React.useMemo(
    (): SeriesOptions => ({
      type: spec.type,
      showPoints: spec.type !== "bar",
    }),
    [spec.type],
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{spec.source}</Badge>
          <CardTitle>{spec.title}</CardTitle>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{spec.description}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
          <span>{spec.primaryLabel}</span>
          <span className="sm:text-right">{spec.secondaryLabel}</span>
        </div>
        <div
          className="chart-surface h-[320px] w-full rounded-md border bg-card p-3"
          style={{ height: spec.height ?? 320 }}
        >
          <ReactChart data={chartData} axes={axes} series={series} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {spec.data.map((series) => (
            <Badge key={series.label} variant="secondary">
              {series.label}
            </Badge>
          ))}
        </div>
        <table className="sr-only">
          <caption>{spec.title}</caption>
          <thead>
            <tr>
              <th>{spec.primaryLabel}</th>
              <th>{spec.secondaryLabel}</th>
            </tr>
          </thead>
          <tbody>
            {spec.data.flatMap((series) =>
              series.data.map((datum) => (
                <tr key={`${series.label}-${datum.primary}`}>
                  <td>{`${series.label}: ${datum.primary}`}</td>
                  <td>{datum.secondary}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
