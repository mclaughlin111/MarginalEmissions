declare module "react-charts" {
  import * as React from "react";

  export type ScaleType = "linear" | "ordinal" | "time" | "utc" | "log";
  export type ElementType = "line" | "area" | "bar";

  export type AxisOptions<TDatum> = {
    primary?: boolean;
    type: ScaleType;
    position: "top" | "right" | "bottom" | "left";
    min?: number;
    max?: number;
    hardMin?: number;
    hardMax?: number;
    stacked?: boolean;
    showGrid?: boolean;
    showTicks?: boolean;
    format?: (value: unknown, datum?: TDatum) => string;
  };

  export type ChartSeries<TDatum> = {
    label: string;
    data: TDatum[];
  };

  export type SeriesOptions = {
    type?: ElementType;
    showPoints?: boolean;
  };

  export type TooltipOptions = {
    align?: string;
    anchor?: string;
    padding?: number;
    render?: (props: unknown) => React.ReactNode;
  };

  export type ChartProps<TDatum> = {
    data: ChartSeries<TDatum>[];
    axes: AxisOptions<TDatum>[];
    series?: SeriesOptions;
    grouping?: string;
    focus?: string;
    dark?: boolean;
    getDatums?: (series: ChartSeries<TDatum>) => TDatum[];
    getPrimary?: (datum: TDatum) => string | number | Date;
    getSecondary?: (datum: TDatum) => number;
    getR?: (datum: TDatum) => number | undefined;
    getLabel?: (series: ChartSeries<TDatum>, index: number) => string;
    getSeriesID?: (series: ChartSeries<TDatum>, index: number) => string | number;
    getPrimaryAxisID?: (series: ChartSeries<TDatum>) => string | undefined;
    getSecondaryAxisID?: (series: ChartSeries<TDatum>) => string | undefined;
    getSeriesStyle?: (series: unknown) => Record<string, string | undefined>;
    getDatumStyle?: (datum: unknown) => Record<string, string | number>;
    getSeriesOrder?: (series: unknown[]) => unknown[];
    onHover?: () => void;
    primaryCursor?: object | false;
    secondaryCursor?: object | false;
    tooltip?: TooltipOptions | boolean;
    showVoronoi?: boolean;
  };

  export function Chart<TDatum>(props: ChartProps<TDatum>): React.ReactElement;

  export const groupingPrimary: string;
  export const focusAuto: string;
}
