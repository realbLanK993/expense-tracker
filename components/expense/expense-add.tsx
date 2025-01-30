"use client"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Expense } from "@/lib/types";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Check, ChevronDown, ChevronUp, Delete } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useCategory, useExpense } from "@/lib/context";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";

export default function AddExpense({existingExpense}: {existingExpense?: Expense}) {
  const {addNewExpense, updateExpense} = useExpense()
  const [displayMoney, setDisplayMoney] = useState("");
  const [showCalc, setShowCalc] = useState(false);
  const [more, setMore] = useState(false);
  const {categories} = useCategory();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existingExpense?.title ?? "");
  const [amount, setAmount] = useState( existingExpense?.amount ?? 0);
  const [category, setCategory] = useState( existingExpense?.category.id ?? "");
  const [date, setDate] = useState<Date | undefined>( existingExpense?.date ?? new Date());
  const [description, setDescription] = useState(  existingExpense?.description ?? "");
  const [error, setError] = useState("");
  const resetStates = () => {
    setTitle("");
    setAmount(0);
    setDisplayMoney("");
    setCategory("");
    setDate(new Date());
    setDescription("");
  }
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        {existingExpense ? (
          <DialogTrigger className="w-full text-sm flex justify-start p-2 hover:bg-gray-100">
            Edit
          </DialogTrigger>
        ) : (
          <Button variant={"outline"}>Add</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[450px] md:max-h-[600px] h-full p-4">
          <div className="flex flex-col gap-4 py-6">
            <div className="flex flex-col gap-2">
              {/* <Label htmlFor="title">Title</Label> */}
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="title"
                placeholder="Enter title"
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* <Label htmlFor="amount">Amount</Label> */}
              {/* <Input
              value={amount}
              type="number"
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
              }}
              id="amount"
              placeholder="Enter amount"
            /> */}
              {displayMoney !== null && (
                <span
                  onClick={() => setShowCalc(true)}
                  className="text-xl font-bold p-4 border rounded bg-gray-900"
                >
                  ₹ {displayMoney}
                </span>
              )}
              {showCalc && (
                <div className="flex gap-4">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {Array.from({ length: 9 }, (_, index) => (
                      <Button
                        key={index}
                        variant={"outline"}
                        onClick={() => {
                          setDisplayMoney(
                            (prev) => prev + (index + 1).toString()
                          );
                        }}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDisplayMoney((prev) => prev + "00");
                      }}
                    >
                      00
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDisplayMoney((prev) => prev + "0");
                      }}
                    >
                      0
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDisplayMoney((prev) => prev + ".");
                      }}
                    >
                      .
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDisplayMoney((prev) => prev.slice(0, -1));
                      }}
                    >
                      <Delete />
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setDisplayMoney("");
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      className="h-full"
                      onClick={() => {
                        setAmount(parseFloat(displayMoney));
                        setShowCalc(false);
                      }}
                    >
                      <Check />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {/* <Label htmlFor="category">Category</Label> */}
              <Select
                onValueChange={(e) => {
                  if (category && e == category) {
                    console.log(category);
                  }
                  setCategory(
                    categories.find((category) => category.id === e)?.id || ""
                  );
                }}
                value={category}
              >
                <SelectTrigger disabled={categories.length === 0}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent id="category">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {more && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="flex justify-between items-center "
                        variant={"outline"}
                      >
                        <span>{date ? format(date, "PPP") : ""}</span>
                        <span>
                          <CalendarIcon />
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border-none p-0 w-fit">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <Link className="text-sm underline pl-2" href="/settings">
                Add Category
              </Link>
              <Badge
                onClick={() => setMore(!more)}
                className="rounded-full hover:cursor-pointer flex gap-2 items-center"
              >
                <span>{more ? "Less" : "More"} options</span>{" "}
                {more ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Badge>
            </div>
            <p className="text-red-500">{error}</p>
          </div>
          <DialogFooter className="gap-4">
            <Button
              variant={"outline"}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (title === "" || amount === 0 || category === "") {
                  setError("All fields are required");
                  return;
                }
                if (categories.find((c) => c.id === category) === undefined) {
                  setError("Category not found");
                  return;
                }

                const newExpenses = {
                  title,
                  amount,
                  category: categories.find((c) => c.id === category)!,
                  date: date ?? new Date(),
                  description,
                };
                if (existingExpense) {
                  updateExpense({ ...newExpenses, id: existingExpense.id });
                  setOpen(false);
                  return;
                }
                addNewExpense({ ...newExpenses, id: uuidv4() });
                resetStates();
                setOpen(false);
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

}
