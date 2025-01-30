"use client"
import { User2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/lib/context";
import { useState } from "react";
import ExportButton from "@/components/export";
import { v4 as uuidv4 } from "uuid";

export default function SettingsPage() {
    const {addNewCategory, categories} = useCategory();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState(0);
    return (
      <div className="w-full h-full flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <ExportButton />
          </div>
        <div className="w-full h-full flex flex-col border p-8 rounded-xl gap-4 justify-center items-center min-h-[100px]">
          <div className="border rounded p-4">
            <User2Icon />
          </div>
          <p className="">User info will be added soon</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center gap-4">
            <h1 className="text-xl font-bold">Categories</h1>
            <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
              <DialogTrigger asChild>
                <Button variant={"outline"}>Add Category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Name</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="budget">Budget (optional)</Label>
                    <Input
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      id="budget"
                      type="number"
                      placeholder="Enter budget"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      const newCategory = {
                        id: uuidv4(),
                        name: title,
                        budget: budget,
                      };
                      addNewCategory(newCategory);
                      setOpen(false);
                    }}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {categories &&
              categories.map((category) => (
                <div
                  className="border rounded hover:bg-[#222] p-4"
                  key={category.id}
                >
                  <p>{category.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}