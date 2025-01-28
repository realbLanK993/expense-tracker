import { Category, Expense } from "@/lib/types"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const categories:Category[] = [
    {
        id: 1,
        name: "Food",
        budget: 200,
        color: "bg-green-500",
        symbol: "🍔"
    },
    {
        id: 2,
        name: "Housing",
        budget: 1000,
        color: "bg-blue-500",
        symbol: "🏠"
    },
    {
        id: 3,
        name: "Utilities",
        budget: 200,
        color: "bg-yellow-500",
        symbol: "💡"
    }
]

const expenses: Expense[] = [
  {
    id: 1,
    title: "Rent",
    amount: 1000,
    category: {
      id: 1,
      name: "Food",
      budget: 200,
      color: "bg-green-500",
      symbol: "🍔",
    },
    date: new Date(2025, 0, 26),
    description: "Monthly rent for the apartment",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 200,
    category: {
      id: 2,
      name: "Housing",
      budget: 1000,
      color: "bg-blue-500",
      symbol: "🏠",
    },
    date: new Date(2025, 0, 27),
    description: "Weekly groceries",
  },
  {
    id: 3,
    title: "Internet",
    amount: 50,
    category: {
      id: 3,
      name: "Utilities",
      budget: 200,
      color: "bg-yellow-500",
      symbol: "💡",
    },
    date: new Date(2025, 0, 28),
    description: "Monthly internet bill",
  },
];

export default function Expenses({
    date,
}:{
    date:Date | undefined
}){
    return (
      <div className="px-2 py-10">
        <div className=" flex justify-between items-center">
          <span className="text-xl font-bold">Expenses</span>
          <Button variant={"outline"}>Add</Button>
        </div>
        <div className="mt-4">
          {expenses.filter(e => {
            if(date){
              return e.date.toDateString() === date.toDateString()
            }
            return true
          }).map((expense) => (
            <div
              key={expense.id}
              className="border flex justify-between items-center p-4 rounded-lg mb-4"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-base">{expense.title}</h2>
                <Badge className={`w-fit ${expense.category.color}`}>
                  {expense.category.name}
                </Badge>
              </div>
              <span className="font-semibold">₹{expense.amount}</span>
              {/* <p className="text-gray-500">${expense.amount}</p>
              <p className="text-gray-500">{expense.category.name}</p>
              <p className="text-gray-500">{expense.date.toDateString()}</p>
              <p className="text-gray-500">{expense.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
}