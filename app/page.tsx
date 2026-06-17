import Image from "next/image";
import { ArrowUpRightIcon, BookOpenIcon, ExternalLinkIcon } from "lucide-react";

import { DataChart } from "@/components/charts/data-chart";
import { InteractiveEquation } from "@/components/equations/interactive-equation";
import { ChapterNav } from "@/components/layout/chapter-nav";
import { FigurePanel } from "@/components/layout/figure-panel";
import { SectionBlock } from "@/components/layout/section-block";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { InteractiveDataTable } from "@/components/tables/interactive-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  charts,
  equations,
  figures,
  headlineStats,
  navItems,
  references,
  sections,
  tables,
  thesisMeta,
} from "@/data/dissertation";

function getSection(id: string) {
  const section = sections.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Missing section: ${id}`);
  }
  return section;
}

const mainTableIds = [
  "summary-statistics",
  "model-d-diagnostics",
  "model-d-coefficients",
  "marginal-effects",
];

const appendixTableIds = [
  "model-selection",
  "stationarity",
  "efficiency-penalties",
  "predictive-training",
  "sap-robustness",
];

export default function Home() {
  const overview = getSection("overview");
  const mainTables = tables.filter((table) => mainTableIds.includes(table.id));
  const appendixTables = tables.filter((table) => appendixTableIds.includes(table.id));
  const chartFigures = figures.filter((figure) => figure.id !== "carbon-cost");
  const carbonFigure = figures.find((figure) => figure.id === "carbon-cost");

  return (
    <main className="overflow-x-hidden">
      <header className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="#references">
            <BookOpenIcon />
            References
          </a>
        </Button>
        <ThemeToggle />
      </header>

      <section
        id="overview"
        className="relative isolate min-h-[76vh] scroll-mt-24 overflow-hidden border-b"
      >
        <Image
          src="/extracted-figures/page-27-image-1.png"
          alt="Marginal impacts figure used as a subtle background."
          fill
          priority
          className="object-cover opacity-[0.10] dark:opacity-[0.08]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/94" />
        <div className="relative flex min-h-[76vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-5 lg:ml-40 lg:mr-4 lg:px-4">
          <div className="max-w-4xl">
            <Image
              src="/edinburgh-engineering-logo.png"
              alt="The University of Edinburgh School of Engineering"
              width={1547}
              height={353}
              priority
              className="h-auto w-full max-w-[420px] object-contain dark:brightness-0 dark:invert md:max-w-[500px]"
              sizes="(min-width: 768px) 500px, 88vw"
            />
            <Badge variant="secondary" className="mt-7">
              {thesisMeta.institution}
            </Badge>
            <h1 className="title-font mt-5 max-w-5xl text-4xl font-bold tracking-normal text-balance md:text-6xl">
              {thesisMeta.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
              {overview.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>{thesisMeta.author}</span>
              <span aria-hidden="true">/</span>
              <span>Supervisor: {thesisMeta.supervisor}</span>
              <span aria-hidden="true">/</span>
              <span>{thesisMeta.date}</span>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {headlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border bg-card/95 p-4 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl px-3 sm:px-4 lg:ml-40 lg:mr-4 lg:px-4">
        <ChapterNav items={navItems} />

        <article className="min-w-0 overflow-hidden">
          {["introduction", "literature", "mechanism"].map((id) => (
            <SectionBlock key={id} section={getSection(id)}>
              {id === "mechanism" ? (
                <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                  <DataChart spec={charts.find((chart) => chart.id === "period-mefs")!} />
                  <DataChart spec={charts.find((chart) => chart.id === "generation-mix")!} />
                </div>
              ) : null}
            </SectionBlock>
          ))}

          <SectionBlock section={getSection("methodology")}>
            {carbonFigure ? <FigurePanel figure={carbonFigure} /> : null}
          </SectionBlock>

          <SectionBlock section={getSection("equations")}>
            <div className="grid min-w-0 gap-5">
              {equations.map((equation) => (
                <InteractiveEquation key={equation.id} equation={equation} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock section={getSection("data")}>
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="main">Core tables</TabsTrigger>
                <TabsTrigger value="appendix">Appendix tables</TabsTrigger>
              </TabsList>
              <TabsContent value="main" className="grid min-w-0 gap-5">
                {mainTables.map((dataset) => (
                  <InteractiveDataTable key={dataset.id} dataset={dataset} />
                ))}
              </TabsContent>
              <TabsContent value="appendix" className="grid min-w-0 gap-5">
                {appendixTables.map((dataset) => (
                  <InteractiveDataTable key={dataset.id} dataset={dataset} />
                ))}
              </TabsContent>
            </Tabs>
          </SectionBlock>

          <SectionBlock section={getSection("results")}>
            <div className="grid min-w-0 gap-5 xl:grid-cols-2">
              {charts
                .filter(
                  (chart) =>
                    chart.id !== "period-mefs" && chart.id !== "generation-mix",
                )
                .map((chart) => (
                  <DataChart key={chart.id} spec={chart} />
                ))}
            </div>

            <Separator />

            <div className="grid min-w-0 gap-5">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold">Extracted dissertation figures</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  These figures preserve the original plots where the PDF did not expose the
                  underlying month-level series as tables.
                </p>
              </div>
              <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                {chartFigures.map((figure) => (
                  <FigurePanel key={figure.id} figure={figure} />
                ))}
              </div>
            </div>
          </SectionBlock>

          <SectionBlock section={getSection("discussion")} />
          <SectionBlock section={getSection("conclusion")} />

          <section
            id="references"
            className="scroll-mt-24 border-t py-12 md:py-16"
          >
            <div className="mb-8 max-w-3xl">
              <Badge variant="secondary">Bibliography</Badge>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                References
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Citation details are preserved from the dissertation bibliography, with
                extracted URLs linked where available.
              </p>
            </div>
            <ol className="grid gap-3">
              {references.map((reference) => (
                <li
                  key={reference.id}
                  className="rounded-lg border bg-card p-4 text-sm leading-6 shadow-sm"
                >
                  <div className="flex gap-3">
                    <span className="font-mono text-muted-foreground">
                      [{reference.id}]
                    </span>
                    <div>
                      <p>{reference.citation}</p>
                      {reference.url ? (
                        <a
                          className="mt-2 inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source
                          <ExternalLinkIcon className="size-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <footer className="border-t py-8 text-sm text-muted-foreground">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
            >
              Back to top
              <ArrowUpRightIcon className="size-4" />
            </a>
          </footer>
        </article>
      </div>
    </main>
  );
}
