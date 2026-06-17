"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChartSpec } from "@/types/dissertation";

const CHART_WIDTH = 720;
const DEFAULT_CHART_HEIGHT = 320;
const PADDING = {
  top: 18,
  right: 20,
  bottom: 46,
  left: 58,
};

const SERIES_COLORS = [
  "var(--primary)",
  "var(--accent-foreground)",
  "var(--muted-foreground)",
  "var(--ring)",
];

function formatValue(value: number) {
  if (Math.abs(value) >= 10) return value.toFixed(1).replace(/\.0$/, "");
  if (Math.abs(value) >= 1) return value.toFixed(2).replace(/\.?0+$/, "");
  return value.toFixed(3).replace(/\.?0+$/, "");
}

function formatDatumTitle(
  seriesLabel: string,
  primary: string | number,
  secondary: number,
  note?: string,
) {
  const base = `${seriesLabel}: ${primary} = ${formatValue(secondary)}`;
  return note ? `${base} (${note})` : base;
}

type DataChartProps = {
  spec: ChartSpec;
  className?: string;
};

function InlineChart({ spec }: { spec: ChartSpec }) {
  const height = spec.height ?? DEFAULT_CHART_HEIGHT;
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = height - PADDING.top - PADDING.bottom;
  const values = spec.data.flatMap((series) =>
    series.data.map((datum) => datum.secondary),
  );
  const rawMin = Math.min(0, ...values);
  const rawMax = Math.max(0, ...values);
  const span = rawMax - rawMin || 1;
  const yMin = rawMin - span * 0.08;
  const yMax = rawMax + span * 0.08;
  const yScale = (value: number) =>
    PADDING.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
  const zeroY = yScale(0);
  const categories = Array.from(
    new Set(
      spec.data.flatMap((series) => series.data.map((datum) => datum.primary)),
    ),
  );
  const numericPrimary =
    spec.scaleType === "linear" &&
    categories.every((category) => typeof category === "number");
  const xMin = numericPrimary ? Math.min(...(categories as number[])) : 0;
  const xMax = numericPrimary ? Math.max(...(categories as number[])) : categories.length - 1;
  const xSpan = xMax - xMin || 1;
  const xForPrimary = (primary: string | number) => {
    if (numericPrimary && typeof primary === "number") {
      return PADDING.left + ((primary - xMin) / xSpan) * plotWidth;
    }

    const index = categories.findIndex((category) => category === primary);
    const categoryWidth = plotWidth / Math.max(categories.length, 1);
    return PADDING.left + categoryWidth * index + categoryWidth / 2;
  };
  const yTicks = Array.from({ length: 5 }, (_, index) => yMin + ((yMax - yMin) / 4) * index);

  const barGeometry = React.useMemo(() => {
    const categoryWidth = plotWidth / Math.max(categories.length, 1);
    const seriesCount = Math.max(spec.data.length, 1);
    const groupGap = Math.min(14, categoryWidth * 0.22);
    const barGap = Math.min(5, categoryWidth * 0.05);
    const availableWidth = Math.max(categoryWidth - groupGap, 8);
    const barWidth = Math.max(
      6,
      (availableWidth - barGap * (seriesCount - 1)) / seriesCount,
    );
    const groupWidth = barWidth * seriesCount + barGap * (seriesCount - 1);

    return { barGap, barWidth, categoryWidth, groupWidth };
  }, [categories.length, plotWidth, spec.data.length]);

  const linePathFor = (seriesIndex: number) =>
    spec.data[seriesIndex].data
      .map((datum, index) => {
        const command = index === 0 ? "M" : "L";
        return `${command} ${xForPrimary(datum.primary)} ${yScale(datum.secondary)}`;
      })
      .join(" ");

  const areaPathFor = (seriesIndex: number) => {
    const points = spec.data[seriesIndex].data;
    if (!points.length) return "";
    const linePath = linePathFor(seriesIndex);
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePath} L ${xForPrimary(last.primary)} ${zeroY} L ${xForPrimary(first.primary)} ${zeroY} Z`;
  };

  return (
    <svg
      role="img"
      aria-label={`${spec.title}: ${spec.description}`}
      className="h-full w-full text-foreground"
      viewBox={`0 0 ${CHART_WIDTH} ${height}`}
      preserveAspectRatio="none"
    >
      <line
        x1={PADDING.left}
        y1={zeroY}
        x2={CHART_WIDTH - PADDING.right}
        y2={zeroY}
        stroke="var(--border)"
      />
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={PADDING.left}
            y1={yScale(tick)}
            x2={CHART_WIDTH - PADDING.right}
            y2={yScale(tick)}
            stroke="var(--border)"
            strokeDasharray="4 6"
          />
          <text
            x={PADDING.left - 10}
            y={yScale(tick) + 4}
            textAnchor="end"
            className="fill-muted-foreground text-[10px]"
          >
            {formatValue(tick)}
          </text>
        </g>
      ))}
      <line
        x1={PADDING.left}
        y1={PADDING.top}
        x2={PADDING.left}
        y2={height - PADDING.bottom}
        stroke="var(--border)"
      />
      <line
        x1={PADDING.left}
        y1={height - PADDING.bottom}
        x2={CHART_WIDTH - PADDING.right}
        y2={height - PADDING.bottom}
        stroke="var(--border)"
      />

      {spec.type === "bar"
        ? spec.data.flatMap((series, seriesIndex) =>
            series.data.map((datum) => {
              const categoryIndex = categories.findIndex(
                (category) => category === datum.primary,
              );
              const x =
                PADDING.left +
                barGeometry.categoryWidth * categoryIndex +
                (barGeometry.categoryWidth - barGeometry.groupWidth) / 2 +
                seriesIndex * (barGeometry.barWidth + barGeometry.barGap);
              const y = yScale(Math.max(datum.secondary, 0));
              const barHeight = Math.abs(yScale(datum.secondary) - zeroY);

              return (
                <rect
                  key={`${series.label}-${datum.primary}`}
                  x={x}
                  y={y}
                  width={barGeometry.barWidth}
                  height={Math.max(barHeight, 1)}
                  rx={3}
                  fill={SERIES_COLORS[seriesIndex % SERIES_COLORS.length]}
                >
                  <title>
                    {formatDatumTitle(
                      series.label,
                      datum.primary,
                      datum.secondary,
                      datum.note,
                    )}
                  </title>
                </rect>
              );
            }),
          )
        : spec.data.map((series, seriesIndex) => {
            const color = SERIES_COLORS[seriesIndex % SERIES_COLORS.length];

            return (
              <g key={series.label}>
                {spec.type === "area" ? (
                  <path d={areaPathFor(seriesIndex)} fill={color} opacity={0.16} />
                ) : null}
                <path
                  d={linePathFor(seriesIndex)}
                  fill="none"
                  stroke={color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                />
                {series.data.map((datum) => (
                  <circle
                    key={`${series.label}-${datum.primary}`}
                    cx={xForPrimary(datum.primary)}
                    cy={yScale(datum.secondary)}
                    r={4}
                    fill="var(--card)"
                    stroke={color}
                    strokeWidth={2}
                  >
                    <title>
                      {formatDatumTitle(
                        series.label,
                        datum.primary,
                        datum.secondary,
                        datum.note,
                      )}
                    </title>
                  </circle>
                ))}
              </g>
            );
          })}

      {categories.map((category) => (
        <text
          key={category}
          x={xForPrimary(category)}
          y={height - 18}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {category}
        </text>
      ))}
    </svg>
  );
}

export function DataChart({ spec, className }: DataChartProps) {
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
          <InlineChart spec={spec} />
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
