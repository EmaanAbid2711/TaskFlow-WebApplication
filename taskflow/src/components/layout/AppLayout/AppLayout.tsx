import { useState } from "react";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../Sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-start bg-slate-50">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right Side */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Mobile Top Bar */}
        <div className="flex h-16 items-center border-b bg-white px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <h2 className="ml-4 text-lg font-semibold">
            TaskFlow
          </h2>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AppLayout;