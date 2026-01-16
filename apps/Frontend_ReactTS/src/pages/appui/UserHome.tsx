import LeftSideBar from "@/components/ui/SideBar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCards3 from "@/components/layouts/statcard";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";

type RecurringTransaction = {
  id: number;
  amount: number;
  type: string; // "Income" or "Expense"
  category: string;
  description?: string;
  startDate: string;
  endDate?: string;
  recurrenceType: string;
};

const UserHome: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | null>(null);

  const fetchRecurringTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get<RecurringTransaction[]>(
        "http://localhost:5255/api/recurring-transactions",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRecurringTransactions(res.data);

      let income = 0;
      let expenses = 0;

      res.data.forEach((tx) => {
        if (tx.type.toLowerCase() === "income") income += tx.amount;
        else if (tx.type.toLowerCase() === "expense") expenses += tx.amount;
      });

      setMonthlyIncome(income > 0 ? income : null);
      setMonthlyExpenses(expenses > 0 ? expenses : null);

    } catch (err) {
      console.error("Error fetching recurring transactions:", err);
    }
  };

  useEffect(() => {
    const fetchData = () => {
        fetchRecurringTransactions();
    }
    fetchData();
  }, []);

  const savings = (monthlyIncome ?? 0) - (monthlyExpenses ?? 0);

  // Calculate max value for percentage bars
  const maxValue = Math.max(monthlyIncome ?? 0, monthlyExpenses ?? 0, Math.abs(savings)) || 1;

  const cards = [
    {
      title: "Monthly Income",
      value: monthlyIncome !== null ? `$${monthlyIncome.toFixed(2)}` : "N/A",
      icon: <FaDollarSign />,
      colors: { 
        bgColor: "bg-slate-800 text-white", 
      },
      metricDelta: monthlyIncome !== null ? `${((monthlyIncome / maxValue) * 100).toFixed(0)}%` : "N/A",
      positiveMetric: monthlyIncome !== null && monthlyIncome >= 0,
    },
    {
      title: "Monthly Expenses",
      value: monthlyExpenses !== null ? `$${monthlyExpenses.toFixed(2)}` : "N/A",
      icon: <FaDollarSign />,
      colors: { 
        bgColor: "bg-slate-800 text-white", 
      },
      metricDelta: monthlyExpenses !== null ? `${((monthlyExpenses / maxValue) * 100).toFixed(0)}%` : "N/A",
    },
    {
      title: "Savings",
      value: monthlyIncome !== null && monthlyExpenses !== null ? `$${savings.toFixed(2)}` : "N/A",
      icon: <FaDollarSign />,
      colors: { 
        bgColor: "bg-slate-800 text-white", 
      },
      metricDelta: monthlyIncome !== null && monthlyExpenses !== null ? `${((savings / maxValue) * 100).toFixed(0)}%` : "N/A",
      positiveMetric: monthlyIncome !== null && monthlyExpenses !== null && savings >= 0,
    },
    {
      title: "Investments",
      value: "$ N/A",
      icon: <FaDollarSign />,
      colors: { bgColor: "bg-slate-800 text-white", iconColor: "text-purple-600" },
      metricDelta: "N/A",
      positiveMetric: true,
    },
  ];

  return (
    <div className="flex bg-slate-600 min-h-screen text-white select-none">
      <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.div
        initial={{ marginLeft: 80 }}
        animate={{ marginLeft: isOpen ? 300 : 80 }}
        transition={{ duration: 0.65 }}
        className="flex-1 overflow-auto"
      >
        <div className="flex bg-gray-800 shadow-md p-4 items-center">
          <h1 className="text-3xl font-bold pr-10">User Dashboard</h1>
          <div className="flex bg-amber-600 shadow-md p-3 items-center rounded-2xl">
            <p className="ml-auto">
              Warning this is a product Demo — all saved data will be deleted 2 hours after creation.
            </p>
          </div>
        </div>

        <div className="p-8">
          <StatCards3 cards={cards} showIcons={false} />

          {/* Recurring Transactions Section */}
          <div className="mt-8 bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Recurring Transactions</h2>
            <div className="max-h-72 overflow-y-auto space-y-2">
              {recurringTransactions.length === 0 && (
                <p className="text-gray-400">No recurring transactions yet.</p>
              )}
              {recurringTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className={tx.type.toLowerCase() === "income" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                      ${tx.amount.toFixed(2)} - {tx.type}
                    </p>
                    <p className="text-gray-400 text-sm">{tx.category}</p>
                    {tx.description && (
                      <p className="text-gray-400 text-sm">{tx.description}</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {tx.startDate.slice(0, 10)}
                      {tx.endDate ? ` - ${tx.endDate.slice(0, 10)}` : ""} ({tx.recurrenceType})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserHome;
