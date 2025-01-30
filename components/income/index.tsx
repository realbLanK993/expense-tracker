"use client"
import { Category, Expense } from "@/lib/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { useExpense } from "@/lib/context";
import { Pencil } from "lucide-react";
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
import { useIncome } from "@/lib/context"
import AddIncome from "./income-add";

export default function Incomes({date}:{date:Date | undefined}) {
    
    const {income, deleteIncome} = useIncome()
function formatDate(dateInput: Date) {
  const date = new Date(dateInput); // Convert input to Date object
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Return formatted date
}
    return (
      <div className="px-2 py-2">
        <div className=" flex justify-between items-center">
          <span className="text-xl font-bold">Income</span>
            <AddIncome />
        </div>
        <div className="mt-4">
          {income &&
            income.length > 0 &&
            income
              .filter((e) => {
                console.log(income);

                if (date) {
                  return (
                    new Date(e.date).toDateString() === date.toDateString()
                  );
                }
                return true;
              })
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((inc) => (
                <ContextMenu key={inc.id}>
                  <ContextMenuTrigger asChild>
                    <div
                      key={inc.id}
                      className="border flex hover:bg-[#222] justify-between items-center p-4 rounded-lg mb-4"
                    >
                      <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-base">{inc.title}</h2>
                        <div className="flex gap-2 items-center">
                          <Badge className={`w-fit ${inc.category.color}`}>
                            {inc.category.name}
                          </Badge>
                          {!date && (
                            <Badge className={`w-fit`}>
                              {formatDate(new Date(inc.date))}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 justify-between items-center">
                        <span className="font-semibold">₹{inc.amount}</span>
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <AddIncome existingIncome={inc} />

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
                            delete this inc and cannot be recovered.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteIncome(inc.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
          {income.length === 0 && (
            <div className="text-center text-gray-500 w-full h-full flex flex-1 min-h-[300px] justify-center items-center">
              No income found
            </div>
          )}
        </div>
      </div>
    );
}