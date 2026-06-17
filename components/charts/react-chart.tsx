"use client";

import * as React from "react";
import {
  Chart,
  focusAuto,
  groupingPrimary,
  type AxisOptions,
  type SeriesOptions,
} from "react-charts";

type ReactChartDatum = {
  x: string | number;
  y: number;
  note?: string;
};

type ReactChartSeries = {
  label: string;
  data: ReactChartDatum[];
};

export function ReactChart({
  data,
  axes,
  series,
}: {
  data: ReactChartSeries[];
  axes: AxisOptions<ReactChartDatum>[];
  series: SeriesOptions;
}) {
  const getDatums = React.useCallback(
    (chartSeries: ReactChartSeries) => chartSeries.data,
    [],
  );
  const getLabel = React.useCallback(
    (chartSeries: ReactChartSeries, index: number) =>
      chartSeries.label || `Series ${index + 1}`,
    [],
  );
  const getSeriesID = React.useCallback(
    (_chartSeries: ReactChartSeries, index: number) => index,
    [],
  );
  const getPrimary = React.useCallback((datum: ReactChartDatum) => datum.x, []);
  const getSecondary = React.useCallback((datum: ReactChartDatum) => datum.y, []);
  const getR = React.useCallback(() => undefined, []);
  const getPrimaryAxisID = React.useCallback(() => undefined, []);
  const getSecondaryAxisID = React.useCallback(() => undefined, []);
  const getSeriesStyle = React.useCallback((chartSeries: unknown) => {
    const originalSeries =
      typeof chartSeries === "object" &&
      chartSeries !== null &&
      "originalSeries" in chartSeries
        ? (chartSeries.originalSeries as { color?: string } | undefined)
        : undefined;

    return {
      color: originalSeries?.color,
    };
  }, []);
  const getDatumStyle = React.useCallback(() => ({}), []);
  const getSeriesOrder = React.useCallback((orderedSeries: unknown[]) => orderedSeries, []);
  const onHover = React.useCallback(() => undefined, []);

  return (
    <Chart
      data={data}
      axes={axes}
      series={series}
      grouping={groupingPrimary}
      focus={focusAuto}
      showVoronoi={false}
      getDatums={getDatums}
      getLabel={getLabel}
      getSeriesID={getSeriesID}
      getPrimary={getPrimary}
      getSecondary={getSecondary}
      getR={getR}
      getPrimaryAxisID={getPrimaryAxisID}
      getSecondaryAxisID={getSecondaryAxisID}
      getSeriesStyle={getSeriesStyle}
      getDatumStyle={getDatumStyle}
      getSeriesOrder={getSeriesOrder}
      onHover={onHover}
      primaryCursor={{ showLine: true, showLabel: false }}
      secondaryCursor={{ showLine: true, showLabel: false }}
      tooltip
    />
  );
}
