"use client";
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
import { Income } from "@/lib/types";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useCategory, useIncome } from "@/lib/context";

export default function AddIncome({
  existingIncome,
}: {
  existingIncome?: Income;
}) {
  const { addNewIncome, updateIncome } = useIncome();
  const { categories } = useCategory();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existingIncome?.title ?? "");
  const [amount, setAmount] = useState(existingIncome?.amount ?? 0);
  const [category, setCategory] = useState(existingIncome?.category.id ?? "");
  const [date, setDate] = useState<Date | undefined>(
    existingIncome?.date ?? new Date()
  );
  const [description, setDescription] = useState(
    existingIncome?.description ?? ""
  );
  const [error, setError] = useState("");
  const resetStates = () => {
    setTitle("");
    setAmount(0);
    setCategory("");
    setDate(new Date());
    setDescription("");
  };
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        {existingIncome ? (
          <DialogTrigger className="w-full text-sm flex justify-start p-2 hover:bg-gray-100">
            Edit
          </DialogTrigger>
        ) : (
          <Button variant={"outline"}>Add</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
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
            <Label htmlFor="amount">Amount</Label>
            <Input
              value={amount}
              type="number"
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
              }}
              id="amount"
              placeholder="Enter amount"
            />
          </div>
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
            <Label htmlFor="category">Category</Label>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Enter description"
            />
          </div>
          <p className="text-red-500">{error}</p>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => {}}>
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

              const newincome = {
                title,
                amount,
                category: categories.find((c) => c.id === category)!,
                date: date ?? new Date(),
                description,
              };
              if (existingIncome) {
                updateIncome({ ...newincome, id: existingIncome.id });
                setOpen(false);
                return;
              }
              addNewIncome({ ...newincome, id: uuidv4() });
              resetStates();
              setOpen(false);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
