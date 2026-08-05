import type { ReactNode } from "react";

import Header from "../Header/Header";
import { SearchProvider } from "@/context/SearchContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SearchProvider>
      <div className="flex min-h-screen bg-slate-50">
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}

export default DashboardLayout;