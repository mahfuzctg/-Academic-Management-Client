// src/layouts/DashboardLayout.tsx
import { type ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-4">{children}</main>
  </div>
);

export default DashboardLayout;
