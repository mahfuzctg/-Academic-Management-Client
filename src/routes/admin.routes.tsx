import { AdminDashboard } from "@/pages/AdminDashboard";
import Dashboard from "@/pages/Dashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <h1>ok</h1>,
      },
    ],
  },
];
