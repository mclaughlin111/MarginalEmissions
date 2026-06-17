# Interactive Dissertation Web App

This repository converts `DMcLaughlin Dissertation.pdf` into a production-ready Next.js App Router site.

The app presents the dissertation as an interactive long-form technical article about short-run marginal emissions factors, coal and gas prices, and the British electricity system. It uses typed static content extracted from the PDF, interactive tables, TanStack React Charts, KaTeX-rendered equations, and extracted figure assets.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- ShadCN-style UI primitives
- TanStack React Charts via `react-charts`
- KaTeX for equations
- Framer Motion for animated equation variable popups
- `next-themes` for dark mode

## Run Locally

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build

```bash
npm run build
npm run start
```

## Deploy To Vercel

The app is static-content driven and does not parse the PDF at runtime.

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Deploy.

## Content Structure

- `data/dissertation.ts` contains extracted and curated dissertation content:
  - section summaries and body text
  - equations and variable metadata
  - numeric tables
  - chart specifications
  - extracted figure metadata
  - bibliography entries
- `types/dissertation.ts` defines the content schema.
- `public/extracted-figures` contains images extracted from the PDF figures.

The month-level raw data behind Figures 4.1-4.6 was not printed in the PDF, so the app preserves those plots as extracted figure assets. Interactive charts are built only from numerical values explicitly printed in the dissertation text, tables, or appendix.

## Add Or Edit Equations

Add a new object to `equations` in `data/dissertation.ts`:

```ts
{
  id: "new-equation",
  title: "Readable title",
  latex: "y = \\alpha + \\beta x",
  explanation: "Plain-English explanation.",
  source: "Equation X.Y",
  variables: [
    {
      symbol: "\\alpha",
      label: "Intercept",
      description: "Baseline value when x is zero."
    }
  ]
}
```

The equation renders with KaTeX. Variables render as hoverable and keyboard-focusable legend items through `components/equations/interactive-equation.tsx`.

## Add Or Edit Charts

Add a `ChartSpec` to `charts` in `data/dissertation.ts`. Charts are rendered by `components/charts/data-chart.tsx` using TanStack React Charts:

```ts
{
  id: "example",
  title: "Example chart",
  description: "What the user is seeing.",
  primaryLabel: "Category",
  secondaryLabel: "Value",
  type: "bar",
  data: [
    {
      label: "Series",
      data: [
        { primary: "A", secondary: 1.2 },
        { primary: "B", secondary: 2.4 }
      ]
    }
  ],
  source: "Table X.Y"
}
```

## Add Or Edit Tables

Add a `TableDataset` to `tables` in `data/dissertation.ts`. Tables are searchable, sortable, paginated, and preserve units in column labels.

## Extraction Notes

PDF text was extracted locally with development-only Python tooling. The deployed site does not depend on Python, PDF libraries, or file-system access.

Known limitations:

- Automatically detected PDF tables were sparse, so statistical tables were curated from page text.
- Figure plots without tabulated source points are included as extracted images and marked with verification notes.
- Any post-2021 or post-2024 claims are presented as dissertation limitations and future work, not recalculated findings.
