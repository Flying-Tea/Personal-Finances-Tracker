import React, { useEffect, useState } from "react";
import axios from "axios";
import RecurringTransactionModal from "./layouts/RecurringTransactionFormModal";
import { Trash2 } from "lucide-react";

type RecurringTransaction = {
  id: number;
  amount: number;
  type: string;
  category: string;
  description?: string;
  startDate: string;
  endDate?: string;
  recurrenceType: string;
};

export default function RecurringTransactionsPage() {
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch recurring transactions
  const fetchRecurringTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get<RecurringTransaction[]>(
        "http://localhost:5255/api/recurring-transactions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecurringTransactions(res.data);
    } catch (err) {
      console.error("Error fetching recurring transactions:", err);
    }
  };

  // Delete recurring transaction
  const deleteRecurringTransaction = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://172.16.4.3:5000/api/recurring-transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh the list
      fetchRecurringTransactions();
    } catch (err) {
      console.error("Failed to delete recurring transaction:", err);
    }
  };

  useEffect(() => {
    const FetchData = () => {
      fetchRecurringTransactions();
    }
    FetchData();
  }, []);

  return (
    <div
      className="p-4 bg-gray-900 text-gray-100 rounded-lg flex flex-col"
      style={{ height: "calc(100vh - 136px)" }}
    >
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold flex-1">Recurring Transactions</h1>
        <button
          onClick={() => setOpen(true)}
          className="p-2 border rounded-2xl bg-slate-700 hover:bg-teal-500"
        >
          Add Recurring Transaction
        </button>
        <RecurringTransactionModal open={open} onOpenChange={setOpen} />
      </div>

      {/* Scrollable list */}
      <div className="overflow-y-auto flex-1 space-y-3 border rounded-2xl p-3">
        {recurringTransactions.length === 0 && (
          <p className="text-gray-400">No recurring transactions yet.</p>
        )}

        {recurringTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-gray-800 p-3 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                ${tx.amount.toFixed(2)} - {tx.type}
              </p>
              <p className="text-gray-400 text-sm">{tx.category}</p>
              {tx.description && <p className="text-gray-400 text-sm">{tx.description}</p>}
              <p className="text-gray-400 text-sm">
                {tx.startDate.slice(0, 10)} 
                {tx.endDate ? ` to ${tx.endDate.slice(0, 10)} ` : " "} 
                ({tx.recurrenceType})
              </p>
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteRecurringTransaction(tx.id)}
              className="p-2 rounded hover:bg-red-600"
              title="Delete"
            >
              <Trash2 size={20} className="text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
