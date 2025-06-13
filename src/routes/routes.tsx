// src/routes/index.tsx

import DashboardLayout from "@/components/layout/DashboardLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { ThemeProvider } from "@/components/theme-provider";
import CourseEnrollment from "@/pages/offerCourses/CourseEnrollment";
import Home from "@/pages/Home";
import InstructorManagement from "@/pages/facultys/facultyManagement";
import JobManagement from "@/pages/Jobs/JobManagement";

import LoginForm from "@/pages/Login";

import NotFound from "@/pages/NotFound/NotFound";
import RegisterForm from "@/pages/Register";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { instructorPaths } from "./instructor.routes";
import { studentPaths } from "./student.routes";
import StudentCourseList from "@/pages/student/courses/StudentCourseList";
// import StudentCourseList from "@/pages/student/courses/StudentCourseList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <HomeLayout />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <StudentCourseList />,
      },
      {
        path: "instructors",
        element: <InstructorManagement />,
      },
      {
        path: "jobs",
        element: <JobManagement />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <ThemeProvider>
          <DashboardLayout />
        </ThemeProvider>
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(adminPaths),
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <ThemeProvider>
          <DashboardLayout />
        </ThemeProvider>
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(studentPaths),
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/instructor",
    element: (
      <ProtectedRoute role="instructor">
        <ThemeProvider>
          <DashboardLayout />
        </ThemeProvider>
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(instructorPaths),
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // ✅ Global catch-all route for any unknown paths
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
