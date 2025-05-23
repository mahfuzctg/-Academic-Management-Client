// src/layouts/DashboardLayout.tsx

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 p-4">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
