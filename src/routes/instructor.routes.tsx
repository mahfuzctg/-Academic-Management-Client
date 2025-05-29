import { InstructorDashboard } from "@/pages/InstructorDashboard";

import StudentManagement from "@/pages/Students/StudentManagement";

export const instructorPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <InstructorDashboard />,
  },
  {
    name: "Studentmanagement",
    path: "studentmanagement",
    element: <StudentManagement />,
  },
];
