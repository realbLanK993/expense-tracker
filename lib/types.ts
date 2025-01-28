import { LucideIcon } from "lucide-react";

export type Category = {
  id: string | number;
  name: string;
  color?: string;
  symbol?: string;
  budget?: number
};

export type Expense = {
  id: string|number;
  title: string;
  amount: number;
  date: Date;
  category: Category;
  description: string;
};

export type Income = {
  id: string | number;
  title: string;
  amount: number;
  date: Date;
  category: Category;
  description: string;
};