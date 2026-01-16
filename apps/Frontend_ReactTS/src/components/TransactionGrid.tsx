import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ColDef, GridApi, ValueFormatterParams } from "ag-grid-community";
import { AllCommunityModule, ClientSideRowModelModule, createGrid, ModuleRegistry } from "ag-grid-community";

import { provideGlobalGridOptions } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TransactionModal from "./layouts/TransactionFormModal";
import { ActionsCellRenderer } from "./cell-renderers/actionsCellRenderer";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

provideGlobalGridOptions({
    theme: "legacy",
});

type Transaction = {
  id: string;
  userId: string;
  amount: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  date: string;
  actions: unknown;
};

const columnDefs: ColDef<Transaction>[] = [
  {
    field: "amount",
    headerName: "Amount",
    valueFormatter: (params: ValueFormatterParams<Transaction>) =>
      `$ ${params.value?.toFixed(2) ?? 0}`,
  },
  { field: "type", headerName: "Type" },
  { field: "description", headerName: "Description", flex: 1 },
  { field: "category", headerName: "Category"},
  {
    field: "date",
    headerName: "Date",
    valueFormatter: (params: ValueFormatterParams<Transaction>) =>
      new Date(params.value!).toISOString().split("T")[0],
  },
  {
    field: "createdAt",
    headerName: "Created at",
    valueFormatter: (params: ValueFormatterParams<Transaction>) =>
      new Date(params.value!).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
  },
  { // Maybe delete this in future I need to test when internet avaliable
    field: "actions",
    cellRenderer: ActionsCellRenderer,
    maxWidth: 110
  }
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
  const [open, setOpen] = useState(false);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("About to request transactions");
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get<Transaction[]>(
          "http://172.16.4.3:5000/api/transactions", // 0.0.0.0:5000
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
      rowHeight: 45,
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
      <div className="flex">
        <input
          ref={filterRef}
          type="text"
          placeholder="Search transactions..."
          className="border rounded-md px-3 py-1.5 text-sm mb-4 bg-gray-800 text-gray-100"
        />
        <div className="ml-auto">
          <button onClick={() => setOpen(true)} className="mr-auto p-2 border rounded-2xl bg-slate-700 hover:bg-teal-500">
            Add Transaction
          </button>
          <TransactionModal open={open} onOpenChange={setOpen}></TransactionModal>
        </div>
      </div>
      <div
        ref={gridRef}
        className="ag-theme-quartz-dark h-[725px] w-full"
      ></div>
    </div>
  );
};

export default TransactionsGrid;
