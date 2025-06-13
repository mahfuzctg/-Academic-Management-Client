import { InstructorDashboard } from "@/pages/Dashboard/InstructorDashboard";
import StudentManagement from "@/pages/Students/StudentManagement";
import { LayoutDashboard, GraduationCap } from "lucide-react";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <InstructorDashboard />,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Student Management",
    path: "studentmanagement",
    element: <StudentManagement />,
    icon: <GraduationCap className="w-5 h-5" />,
  },
];
