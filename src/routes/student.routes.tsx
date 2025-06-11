import { StudentDashboard } from "@/pages/Dashboard/StudentDashboard";
import StudentProfile from "@/pages/Students/StudentProfile";
import { LayoutDashboard, User } from "lucide-react";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <StudentProfile />,
    icon: <User className="w-5 h-5" />,
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
