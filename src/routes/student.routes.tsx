import Dashboard from "@/pages/Dashboard";
import StudentManagement from "@/pages/Students/StudentManagement";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Studentmanagement",
    path: "studentmanagement",
    element: <StudentManagement />,
  },
];
