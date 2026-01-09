import React, { useEffect, useRef } from "react";
import axios from "axios";
import type {
  ColDef,
  GetDetailRowDataParams,
  GridApi,
  GridOptions,
  ValueFormatterFunc,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  createGrid,
  ModuleRegistry,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { getData } from "./data";
import { ActionsCellRenderer } from "./cell-renderers/actionsCellRenderer";
import { PriceCellRenderer } from "./cell-renderers/priceCellRenderer";
import { ProductCellRenderer } from "./cell-renderers/productCellRenderer";
import { StatusCellRenderer } from "./cell-renderers/statusCellRenderer";
import { StockCellRenderer } from "./cell-renderers/stockCellRenderer";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
]);

const statuses = {
  all: "All",
  active: "Active",
  paused: "On Hold",
  outOfStock: "Out of Stock",
};
type Status = keyof typeof statuses;

const statusFormatter: ValueFormatterFunc = ({ value }) =>
  statuses[value as keyof typeof statuses] ?? "";

const columnDefs: ColDef[] = [
  {
    field: "product",
    headerName: "Album Name",
    cellRenderer: "agGroupCellRenderer",
    headerClass: "header-product",
    cellRendererParams: { innerRenderer: ProductCellRenderer },
    minWidth: 300,
  },
  { field: "artist" },
  { field: "category", headerClass: "header-sku" },
  { field: "year", width: 150 },
  {
    field: "status",
    valueFormatter: statusFormatter,
    cellRenderer: StatusCellRenderer,
    filter: true,
    filterParams: { valueFormatter: statusFormatter },
    headerClass: "header-status",
  },
  {
    field: "available",
    headerName: "Available",
    cellRenderer: StockCellRenderer,
    headerClass: "header-inventory",
    sortable: false,
  },
  { field: "incoming", editable: true },
  {
    field: "price",
    width: 150,
    headerClass: "header-price",
    cellRenderer: PriceCellRenderer,
  },
  { field: "sold", headerClass: "header-calendar" },
  {
    field: "priceIncrease",
    headerName: "Price Δ%",
    headerClass: "header-percentage",
    valueFormatter: ({ value }: ValueFormatterParams) => `${value}%`,
    width: 120,
  },
  {
    headerName: "Est. Profit",
    colId: "profit",
    headerClass: "header-percentage",
    cellDataType: "number",
    valueGetter: ({ data }: ValueGetterParams) =>
      (data.price * data.sold) / 10,
    valueFormatter: ({ value }: ValueFormatterParams) => `£${value}`,
    width: 150,
  },
  { field: "variants", headerName: "Variants" },
  { field: "actions", cellRenderer: ActionsCellRenderer, minWidth: 194 },
];

const defaultColDef = { resizable: false };

const detailCellRendererParams = {
  detailGridOptions: {
    columnDefs: [
      { field: "title", flex: 1.5 },
      { field: "available", maxWidth: 120 },
      { field: "format", flex: 2 },
      { field: "label", flex: 1 },
      { field: "cat", headerName: "Cat#", type: "rightAligned", flex: 0.66 },
      { field: "country", flex: 0.66 },
      { field: "year", type: "rightAligned", maxWidth: 80 },
    ],
    headerHeight: 38,
  },
  getDetailRowData: ({ successCallback, data }: GetDetailRowDataParams) =>
    successCallback(data.variantDetails),
};

const gridOptions: GridOptions = {
  theme: "legacy",
  columnDefs,
  rowData: getData(),
  defaultColDef,
  rowHeight: 80,
  paginationPageSizeSelector: [5, 10, 20],
  pagination: true,
  paginationPageSize: 10,
  masterDetail: true,
  detailRowAutoHeight: true,
  autoSizeStrategy: { type: "fitGridWidth" },
  detailCellRendererParams,
};

export const GridComponent: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridApiRef = useRef<GridApi | null>(null);

  // ✅ Define updateActiveTab before useEffect
  function updateActiveTab(status: Status) {
    tabsRef.current?.querySelectorAll("button").forEach((button) => {
      if ((button as HTMLElement).dataset.status === status) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  useEffect(() => {
    if (gridRef.current) {
      gridApiRef.current = createGrid(gridRef.current, gridOptions);
    }

    // Quick filter
    if (filterRef.current) {
      filterRef.current.addEventListener("input", (event) => {
        const value = (event.currentTarget as HTMLInputElement).value;
        gridApiRef.current?.setGridOption("quickFilterText", value);
      });
    }

    // Status tabs
    if (tabsRef.current) {
      Object.entries(statuses).forEach(([key, status]) => {
        const button = document.createElement("button");
        button.className = "tabButton";
        button.textContent = status;
        button.dataset.status = key;
        button.onclick = () => {
          if (!gridApiRef.current) return;
          gridApiRef.current.setColumnFilterModel(
            "status",
            key === "all" ? null : { values: [key] }
          );
          gridApiRef.current.onFilterChanged();
          updateActiveTab(key as Status);
        };
        tabsRef.current?.appendChild(button);
      });
      updateActiveTab("all");
    }

    // Cleanup to prevent duplicate grids in dev StrictMode
    return () => {
      gridApiRef.current?.destroy();
      gridApiRef.current = null;
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg">
      {/* <div ref={tabsRef} id="statusTabs" className="tabs mb-4"></div> */}
      <input
        ref={filterRef}
        id="filter-text-box"
        type="text"
        placeholder="Filter..."
        className="border rounded-md px-3 py-1.5 text-sm mb-4 bg-gray-800 text-gray-100"
      />
      <div
        ref={gridRef}
        id="app"
        className="ag-theme-quartz-dark h-[720px] w-full"
      ></div>
    </div>
  );
};

export default GridComponent;