import { StudentDashboard } from "@/pages/Dashboard/StudentDashboard";
import StudentManagement from "@/pages/Students/StudentManagement";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Studentmanagement",
    path: "studentmanagement",
    element: <StudentManagement />,
  },
];
