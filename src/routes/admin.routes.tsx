import AcademicManagement from "@/pages/Academic/AcademicManagement";
import AcademicDepartment from "@/pages/Admin/academic/AcademicDepartment";
import AcademicSemester from "@/pages/Admin/academic/AdmissionSemester";
import Faculty from "@/pages/Admin/academic/Faculty";

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
    path: "academic-management",
    element: <AcademicManagement />,
  },
  {
    name: "Faculty Management",
    path: "faculty-management",
    element: <Faculty />,
  },
  {
    name: "Academic Department",
    path: "academic-department",
    element: <AcademicDepartment />,
  },

  {
    name: "Academic Semester   ",
    path: "academic-semester",
    element: <AcademicSemester />,
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
