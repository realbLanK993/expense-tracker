"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Category, Expense, Income } from "./types";

// Define the types for Expense and ExpenseContextType

type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addNewExpense: (newExpense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (updatedExpense: Expense) => void;
};
type IncomeContextType = {
  income: Income[];
  setIncome: React.Dispatch<React.SetStateAction<Income[]>>;
  addNewIncome: (NewIncome: Income) => void;
  deleteIncome: (id: string) => void;
  updateIncome: (updatedIncome: Income) => void;
};

type CategoryContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addNewCategory: (newCategory: Category) => void;
  updateCategory: (updatedCategory: Category) => void;
};

// Create the ExpenseContext with a default value
export const ExpenseContext = createContext<ExpenseContextType | null>(null);
export const IncomeContext = createContext<IncomeContextType | null>(null);
export const CategoryContext = createContext<CategoryContextType | null>(null);
// ExpenseProvider component
export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]); // State for managing expenses
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (window) {
      const storedExpenses = localStorage.getItem("expenses");
      if (storedExpenses && storedExpenses.length > 0) {
        setExpenses(JSON.parse(storedExpenses));
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  const addNewExpense = (newExpense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        addNewExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export const IncomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [income, setIncome] = useState<Income[]>([]); // State for managing expenses
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (window) {
      const storedIncome = localStorage.getItem("income");
      if (storedIncome && storedIncome.length > 0) {
        setIncome(JSON.parse(storedIncome));
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      localStorage.setItem("income", JSON.stringify(income));
    }
  }, [income]);

  const addNewIncome = (newIncome: Income) => {
    setIncome((prevIncome) => [...prevIncome, newIncome]);
  };
  const deleteIncome = (id: string) => {
    setIncome((prevIncome) => prevIncome.filter((income) => income.id !== id));
  };
  const updateIncome = (updatedIncome: Income) => {
    setIncome((prevIncome) =>
      prevIncome.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
  };
  return (
    <IncomeContext.Provider
      value={{ income, setIncome, addNewIncome, deleteIncome, updateIncome }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]); // State for managing expenses
  const isInitialRender = useRef(true);

  // Load categories from localStorage on initial render
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories && storedCategories.length > 0) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Save categories to localStorage when they change, but not on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Mark the initial render as complete
    } else {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  const addNewCategory = (newCategory: Category) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  const updateCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };
  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, addNewCategory, updateCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook for consuming the ExpenseContext
export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};

export const useIncome = (): IncomeContextType => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider");
  }
  return context;
};
