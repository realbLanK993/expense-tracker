"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import Expenses from "@/components/expense";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getTotalExpenseToday } from "@/lib/utils";
import { useExpense } from "@/lib/context";
import Incomes from "@/components/income";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTab, setCurrentTab] = useState("expenses");
  const {expenses} = useExpense()
  function formatDate(dateInput:Date) {
    const date = new Date(dateInput); // Convert input to Date object
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Return formatted date
  }
  return (
    <div className="max-w-[1000px] w-full h-full">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>
                {date ? formatDate(date) : "All"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none p-0 w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
        {currentTab === "expenses" && (
          <div className="flex justify-between items-center gap-8 py-10">
            <div className="border flex flex-col gap-2 p-4 rounded-md w-full">
              <p className="text-xl font-bold">
                ₹{getTotalExpenseToday(expenses)}
              </p>
              <span className="text-sm">Day</span>
            </div>
            <div className="border flex flex-col gap-2 p-4 rounded-md w-full">
              <p className="text-xl font-bold">
                ₹ {getTotalExpenseToday(expenses)}
              </p>
              <span className="text-sm">Week</span>
            </div>
            <div className="border flex flex-col gap-2 p-4 rounded-md w-full">
              <p className="text-xl font-bold">
                ₹{getTotalExpenseToday(expenses)}
              </p>
              <span className="text-sm">Month</span>
            </div>
          </div>
        )}
        <TabsContent className="w-full h-full" value="expenses">
          <Expenses date={date} />
        </TabsContent>
        <TabsContent value="income">
          <Incomes date={date} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
