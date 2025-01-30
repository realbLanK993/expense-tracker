import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Expense, Income } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTotalExpenseToday = (expenses: Expense[]): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of the day

  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0); // Normalize to start of the day
      return expenseDate.getTime() === today.getTime();
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getTotalExpenseThisWeek = (expenses: Expense[]): number => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Set to Sunday of the current week
  startOfWeek.setHours(0, 0, 0, 0);

  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfWeek && expenseDate <= now;
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getTotalExpenseThisMonth = (expenses: Expense[]): number => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
  return expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth && expenseDate <= now;
    })
    .reduce((total, expense) => total + expense.amount, 0);
};

export const getBalanceAmount = (income: Income[], expenses: Expense[]): number => {
  const totalIncome = income.reduce((total, entry) => total + entry.amount, 0);
  const totalExpenses = expenses.reduce(
    (total, entry) => total + entry.amount,
    0
  );

  return totalIncome - totalExpenses;
};

