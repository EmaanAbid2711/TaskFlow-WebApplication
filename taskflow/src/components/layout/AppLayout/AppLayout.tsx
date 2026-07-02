import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      {/* RIGHT SIDE */}
      <div className="flex flex-1 flex-col min-w-0">
        {children}
      </div>

    </div>
  );
}

export default AppLayout;