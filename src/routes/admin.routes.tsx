import { AdminDashboard } from "@/pages/Dashboard/AdminDashboard";

import InstructorManagement from "@/pages/Instructors/InstructorManagement";
import JobManagement from "@/pages/Jobs/JobManagement";
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
  {
    name: "Job Management",
    path: "jobsmanagement",
    element: <JobManagement />,
  },
];
