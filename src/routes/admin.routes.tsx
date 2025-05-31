import { AdminDashboard } from "@/pages/AdminDashboard";
import Dashboard from "@/pages/Dashboard";
import StudentManagement from "@/pages/Students/StudentManagement";

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
  {
    name: "Student Management",
    path: "studentmanagement",
    element: <StudentManagement />,
  },
];
