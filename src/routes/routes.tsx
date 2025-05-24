import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "@/components/layout/HomeLayout";
import LoginForm from "@/pages/Login";
import RegisterForm from "@/pages/Register";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { studentPaths } from "./student.routes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <ProtectedRoute role="admin">
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/student",
    element: (
      // <ProtectedRoute role="student">
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: routeGenerator(studentPaths),
  },
]);

export default router;
