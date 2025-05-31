import { AdminDashboard } from "@/pages/AdminDashboard";
import Dashboard from "@/pages/Dashboard";
import InstructorManagement from "@/pages/Instructors/InstructorManagement";
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
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <h1>ok</h1>,
      },
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
  {
    name: "Instructors Management",
    path: "instructorsmanagement",
    element: <InstructorManagement />,
  },
];
