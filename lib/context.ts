import React, { createContext, useContext, useState } from "react";
import { Expense } from "./types";

// Define the types for Expense and ExpenseContextType


type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

// Create the ExpenseContext with a default value
export const ExpenseContext = createContext<ExpenseContextType | null>(null);

// ExpenseProvider component
export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]); // State for managing expenses

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  )
};

// Custom hook for consuming the ExpenseContext
export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
