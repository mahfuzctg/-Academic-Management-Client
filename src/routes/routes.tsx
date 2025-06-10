// src/routes/index.tsx

import DashboardLayout from "@/components/layout/DashboardLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { ThemeProvider } from "@/components/theme-provider";
import CourseEnrollment from "@/pages/Courses/CourseEnrollment";
import Home from "@/pages/Home";
import InstructorManagement from "@/pages/Instructors/InstructorManagement";
import JobManagement from "@/pages/Jobs/JobManagement";
<<<<<<< HEAD
import LoginForm from "@/pages/Login";

import NotFound from "@/pages/NotFound/NotFound";
import RegisterForm from "@/pages/Register";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { instructorPaths } from "./instructor.routes";
import { studentPaths } from "./student.routes";
=======
import CourseEnrollment from "@/pages/Courses/CourseEnrollment";
import NotFound from "@/pages/NotFound";
>>>>>>> 3e1a0a52a587a93e210b4802c457a26d39ff97fd

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
        element: <CourseEnrollment />,
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
