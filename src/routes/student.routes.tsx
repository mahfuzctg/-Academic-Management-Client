import { StudentDashboard } from "@/pages/Dashboard/StudentDashboard";
import StudentProfile from "@/pages/Students/StudentProfile";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <StudentProfile />,
  },
  {
    name: "My Courses",
    path: "profile",
    element: <StudentProfile />,
  },
  {
    name: "Grades",
    path: "profile",
    element: <StudentProfile />,
  },
];
