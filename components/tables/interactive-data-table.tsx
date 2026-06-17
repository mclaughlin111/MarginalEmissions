"use client";

import * as React from "react";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TableColumn, TableDataset, TableRow as DataRow } from "@/types/dissertation";

type SortState = {
  key: string;
  direction: "asc" | "desc";
} | null;

const PAGE_SIZE = 8;

function formatCell(value: string | number | null) {
  if (value === null || value === "") return " - ";
  if (typeof value !== "number") return value;

  const abs = Math.abs(value);
  const maximumFractionDigits = abs >= 1000 ? 0 : 4;

  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits,
  }).format(value);
}

function compareValues(a: DataRow, b: DataRow, sort: SortState) {
  if (!sort) return 0;

  const aValue = a[sort.key];
  const bValue = b[sort.key];
  const direction = sort.direction === "asc" ? 1 : -1;

  if (typeof aValue === "number" && typeof bValue === "number") {
    return (aValue - bValue) * direction;
  }

  return String(aValue ?? "").localeCompare(String(bValue ?? "")) * direction;
}

export function InteractiveDataTable({ dataset }: { dataset: TableDataset }) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(0);

  const filteredRows = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const rows = normalizedQuery
      ? dataset.rows.filter((row) =>
          Object.values(row).some((value) =>
            String(value ?? "").toLowerCase().includes(normalizedQuery),
          ),
        )
      : dataset.rows;

    return [...rows].sort((a, b) => compareValues(a, b, sort));
  }, [dataset.rows, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const visibleRows = filteredRows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const toggleSort = (column: TableColumn) => {
    setPage(0);
    setSort((current) => {
      if (!current || current.key !== column.key) {
        return { key: column.key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key: column.key, direction: "desc" };
      }
      return null;
    });
  };

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{dataset.source}</Badge>
          <CardTitle>{dataset.title}</CardTitle>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {dataset.description}
        </p>
        <label className="relative max-w-sm">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <span className="sr-only">Search {dataset.title}</span>
          <Input
            value={query}
            onChange={(event) => {
              setPage(0);
              setQuery(event.target.value);
            }}
            placeholder="Search table"
            className="pl-9"
          />
        </label>
      </CardHeader>
      <CardContent>
        <div className="max-h-[420px] overflow-auto rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              <TableRow>
                {dataset.columns.map((column) => {
                  const isSorted = sort?.key === column.key;
                  return (
                    <TableHead key={column.key} className="bg-muted">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto justify-start px-0 py-0 font-medium"
                        onClick={() => toggleSort(column)}
                      >
                        <span>
                          {column.label}
                          {column.unit ? ` (${column.unit})` : ""}
                        </span>
                        {isSorted ? (
                          sort.direction === "asc" ? (
                            <ArrowUpIcon className="size-3" />
                          ) : (
                            <ArrowDownIcon className="size-3" />
                          )
                        ) : (
                          <ArrowUpDownIcon className="size-3 opacity-50" />
                        )}
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((row, rowIndex) => (
                <TableRow key={`${dataset.id}-${page}-${rowIndex}`}>
                  {dataset.columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.numeric ? "text-right tabular-nums" : ""}
                    >
                      {formatCell(row[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {visibleRows.length} of {filteredRows.length} rows
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            >
              Previous
            </Button>
            <span className="min-w-20 text-center">
              {page + 1} / {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page + 1 >= pageCount}
              onClick={() =>
                setPage((current) => Math.min(pageCount - 1, current + 1))
              }
            >
              Next
            </Button>
          </div>
        </div>

        {dataset.notes?.length ? (
          <div className="mt-4 space-y-1 text-xs leading-5 text-muted-foreground">
            {dataset.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
