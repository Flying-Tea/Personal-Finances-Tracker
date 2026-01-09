import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ColDef, GridApi, ValueFormatterParams } from "ag-grid-community";
import { AllCommunityModule, ClientSideRowModelModule, createGrid, ModuleRegistry } from "ag-grid-community";

import { provideGlobalGridOptions } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

provideGlobalGridOptions({
    theme: "legacy",
});

type Transaction = {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
};

const columnDefs: ColDef<Transaction>[] = [
  {
    field: "amount",
    headerName: "Amount",
    valueFormatter: (params: ValueFormatterParams<Transaction>) =>
      `£${params.value?.toFixed(2) ?? 0}`,
  },
  { field: "type", headerName: "Type" },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "createdAt",
    headerName: "Date",
    valueFormatter: (params: ValueFormatterParams<Transaction>) =>
      new Date(params.value!).toLocaleString(),
  },
];

const defaultColDef: ColDef<Transaction> = {
  resizable: true,
  sortable: true,
  filter: true,
};

export const TransactionsGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const gridApiRef = useRef<GridApi<Transaction> | null>(null);
  const [rowData, setRowData] = useState<Transaction[]>([]);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("About to request transactions");
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get<Transaction[]>(
          "http://localhost:5255/api/transactions",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response.data);
        setRowData(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Initialize grid
  useEffect(() => {
    if (!gridRef.current) return;

    const gridOptions = {
      columnDefs,
      rowData,
      defaultColDef,
      pagination: true,
      paginationPageSize: 10,
      rowHeight: 30,
      animateRows: true,
    };

    gridApiRef.current = createGrid(gridRef.current, gridOptions);

    // Quick filter like original AGGrid.tsx
    if (filterRef.current) {
      const handleFilter = (event: Event) => {
        const value = (event.currentTarget as HTMLInputElement).value;
        gridApiRef.current?.setGridOption("quickFilterText", value);
      };
      filterRef.current.addEventListener("input", handleFilter);

      return () => {
        filterRef.current?.removeEventListener("input", handleFilter);
        gridApiRef.current?.destroy();
        gridApiRef.current = null;
      };
    }
  }, [rowData]);

  return (
    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg">
      <input
        ref={filterRef}
        type="text"
        placeholder="Search transactions..."
        className="border rounded-md px-3 py-1.5 text-sm mb-4 bg-gray-800 text-gray-100"
      />
      <div
        ref={gridRef}
        className="ag-theme-quartz-dark h-[725px] w-full"
      ></div>
    </div>
  );
};

export default TransactionsGrid;
