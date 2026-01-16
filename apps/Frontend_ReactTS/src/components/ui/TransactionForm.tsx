import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Receipt } from "lucide-react";
import axios from "axios";

type TransactionFormProps = {
  onClose?: () => void;
};

const todayISO = new Date().toISOString().split("T")[0];

const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayISO);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token){
        setError("Must be logged in!");
        return;
    }

    // Required field validation (description excluded)
    if (!type || !category || !amount || !date) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setError("");

    const transaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
    };

    try {
      console.log("Submitting:", transaction);
      await axios.post("http://172.16.4.3:5000/api/transactions", transaction, // 172.16.4.3:5000 swap to backend ip (Local host if needed)
        {
            headers: {
                Authorization:`Bearer ${token}`,
            },
        }
      );
      window.location.reload();
      onClose?.(); // close modal after success
    } catch (err) {
      console.error("Failed to submit transaction", err);
      setError("Failed to submit transaction.");
    }
  };

  return (
    <div className="flex items-center justify-center py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
      <form onSubmit={handleSubmit}>
        <Card className="w-[520px] p-3 shadow-none border-none">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <span className="bg-primary size-10 rounded-md text-white flex justify-center items-center">
                <Receipt />
              </span>
            </div>
            <CardTitle className="text-center text-2xl">
              New Transaction
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              Enter transaction details below.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 mt-4">
            <div className="space-y-2 pt-3">
              <Label className="opacity-80">
                Type <span className="text-red-500">*</span>
              </Label>
              <select
                className="bg-white/10 text-black h-10 dark:text-white w-full border rounded-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value=""></option>
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>

            <div className="space-y-2 pt-3">
              <Label className="opacity-80">
                Category <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="e.g. Food, Rent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/10 text-black h-10 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2 pt-3">
              <Label className="opacity-80">
                Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/10 text-black h-10 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2 pt-3">
              <Label className="opacity-80">Description</Label>
              <Input
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/10 text-black h-10 dark:text-white"
              />
            </div>

            <div className="space-y-2 pt-3">
              <Label className="opacity-80">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/10 text-black h-10 dark:text-white"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button className="w-full text-white h-10" type="submit">
              Add Transaction
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default TransactionForm;