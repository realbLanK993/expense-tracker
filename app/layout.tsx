import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { CategoryProvider, ExpenseProvider, IncomeProvider } from "@/lib/context";

const poppins = Poppins({weight:["100","200","300","400", "500", "600", "700"], subsets:["latin"]});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses locally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased flex flex-col justify-center items-center w-full h-full`}
      >
        <CategoryProvider>
          <ExpenseProvider>
            <IncomeProvider>
              <div className="flex flex-col gap-8 max-w-[1000px] w-full p-4 md:px-8">
                <Navbar />
                <div className="w-full">{children}</div>
              </div>
            </IncomeProvider>
          </ExpenseProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
