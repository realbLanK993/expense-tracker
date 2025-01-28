"use client"
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, icons } from "lucide-react";
import Expenses from "@/components/expense";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  function formatDate(dateInput:Date) {
    const date = new Date(dateInput); // Convert input to Date object
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Return formatted date
  }
  return (
    <div className="max-w-[1000px] w-full ">
      <Tabs defaultValue="expenses" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"}>{date ? formatDate(date) : ""}</Button>
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
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Jan 28 <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <TabsContent value="expenses">
          <Expenses date={date} />
        </TabsContent>
        <TabsContent value="income">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
