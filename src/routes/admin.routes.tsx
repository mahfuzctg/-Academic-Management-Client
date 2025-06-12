import AcademicManagement from "@/pages/Academic/AcademicManagement";
import AcademicDepartment from "@/pages/Admin/academic/AcademicDepartment";
import AcademicFacultyPage from "@/pages/Admin/academic/AcademicFaculty";
import AcademicSemester from "@/pages/Admin/academic/AdmissionSemester";

import { AdminDashboard } from "@/pages/Dashboard/AdminDashboard";
import InstructorManagement from "@/pages/facultys/facultyManagement";
import JobManagement from "@/pages/Jobs/JobManagement";
import StudentManagement from "@/pages/Students/StudentManagement";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  CalendarDays,
  BookOpen,
  Briefcase,
} from "lucide-react";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Academic Management",
    path: "academic-management",
    element: <AcademicManagement />,
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "Academic Faculty",
    path: "academic-faculty",
    element: <AcademicFacultyPage />,
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Academic Department",
    path: "academic-department",
    element: <AcademicDepartment />,
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    name: "Academic Semester",
    path: "academic-semester",
    element: <AcademicSemester />,
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    name: "Student Management",
    path: "studentmanagement",
    element: <StudentManagement />,
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "Instructors Management",
    path: "instructorsmanagement",
    element: <InstructorManagement />,
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Job Management",
    path: "jobsmanagement",
    element: <JobManagement />,
    icon: <Briefcase className="w-5 h-5" />,
  },
];
