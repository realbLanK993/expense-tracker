"use client";
import { Category, Expense } from "@/lib/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { useExpense } from "@/lib/context";
import { Pencil } from "lucide-react";
import AddExpense from "./expense-add";
import { format } from "date-fns";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



export default function Expenses({ date }: { date: Date | undefined }) {
  const { expenses, deleteExpense } = useExpense();
  function formatDate(dateInput: Date) {
    const date = new Date(dateInput); // Convert input to Date object
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Return formatted date
  }
  return (
    <div className="px-2 py-2">
      <div className=" flex justify-between items-center">
        <span className="text-xl font-bold">Expenses</span>
        <AddExpense />
      </div>
      <div className="mt-4">
        {expenses &&
          expenses.length > 0 &&
          expenses
            .filter((e) => {
              console.log(expenses);

              if (date) {
                return new Date(e.date).toDateString() === date.toDateString();
              }
              return true;
            })
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((expense) => (
              <ContextMenu key={expense.id}>
                <ContextMenuTrigger asChild>
                  <div
                    key={expense.id}
                    className="border flex hover:bg-[#222] justify-between items-center p-4 rounded-lg mb-4"
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="font-bold text-base">{expense.title}</h2>
                      <div className="flex gap-2 items-center">
                        <Badge className={`w-fit ${expense.category.color}`}>
                          {expense.category.name}
                        </Badge>
                        {!date && (
                          <Badge className={`w-fit`}>
                            {formatDate(new Date(expense.date))}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 justify-between items-center">
                      <span className="font-semibold">₹{expense.amount}</span>
                    </div>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <AddExpense existingExpense={expense} />

                  <AlertDialog>
                    <AlertDialogTrigger className="w-full text-sm flex justify-start p-2 hover:bg-gray-100">
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this expense and cannot be recovered.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteExpense(expense.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </ContextMenuContent>
              </ContextMenu>
            ))}
        {expenses.length === 0 && (
          <div className="text-center text-gray-500 w-full h-full flex flex-1 min-h-[300px] justify-center items-center">
            No expenses found
          </div>
        )}
      </div>
    </div>
  );
}
