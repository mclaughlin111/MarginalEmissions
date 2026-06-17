export type NavItem = {
  id: string;
  label: string;
  eyebrow?: string;
};

export type DetailBlock = {
  title: string;
  body: string[];
};

export type DissertationSection = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: string[];
  takeaways?: string[];
  details?: DetailBlock[];
};

export type EquationVariable = {
  symbol: string;
  label: string;
  description: string;
  unit?: string;
};

export type Equation = {
  id: string;
  title: string;
  latex: string;
  explanation?: string;
  variables: EquationVariable[];
  source: string;
};

export type TableColumn = {
  key: string;
  label: string;
  unit?: string;
  numeric?: boolean;
};

export type TableRow = Record<string, string | number | null>;

export type TableDataset = {
  id: string;
  title: string;
  description: string;
  source: string;
  columns: TableColumn[];
  rows: TableRow[];
  notes?: string[];
};

export type ChartDatum = {
  primary: string | number;
  secondary: number;
  note?: string;
};

export type ChartSeries = {
  label: string;
  data: ChartDatum[];
};

export type ChartSpec = {
  id: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  type: "bar" | "line" | "area";
  scaleType?: "band" | "linear";
  height?: number;
  data: ChartSeries[];
  source: string;
};

export type FigureAsset = {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  source: string;
  note?: string;
};

export type StatCard = {
  label: string;
  value: string;
  description: string;
};

export type Reference = {
  id: number;
  citation: string;
  url?: string;
};
