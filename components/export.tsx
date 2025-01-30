import {  useCategory, useExpense, useIncome } from "@/lib/context";
import { Button } from "./ui/button";


const ExportButton = () => {
  const { expenses } = useExpense()
  const { income } = useIncome()
  const {categories} = useCategory()
  const handleExport = () => {
    const data = {
      expenses,
      income,
      categories
    };

    const jsonString = JSON.stringify(data, null, 2); // Pretty-print JSON
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Export Data</Button>;
};

export default ExportButton;
