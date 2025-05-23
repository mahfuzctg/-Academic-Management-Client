import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { type TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Simulated role-based paths (replace with actual imports if needed)
const adminPaths = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Manage Users", path: "/admin/users" },
];

const facultyPaths = [
  { label: "Dashboard", path: "/faculty/dashboard" },
  { label: "My Courses", path: "/faculty/courses" },
];

const studentPaths = [
  { label: "Dashboard", path: "/student/dashboard" },
  { label: "Register Courses", path: "/student/enroll" },
];

const roleBasedPaths = {
  admin: adminPaths,
  faculty: facultyPaths,
  student: studentPaths,
};

const Sidebar: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  const user = token ? (verifyToken(token) as TUser) : null;
  const role = user?.role as keyof typeof roleBasedPaths;
  const sidebarItems = role ? roleBasedPaths[role] : [];

  return (
    <aside className="w-64 h-screen bg-muted border-r text-muted-foreground sticky top-0 hidden lg:flex flex-col">
      <div className="p-4 text-2xl font-bold text-primary border-b">PH Uni</div>
      <ScrollArea className="flex-1 p-4">
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item: any) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
