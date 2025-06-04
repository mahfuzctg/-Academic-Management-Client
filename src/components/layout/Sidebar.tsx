import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { type TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { adminPaths } from "@/routes/admin.routes";
import { studentPaths } from "@/routes/student.routes";

const roleBasedPaths = {
  admin: adminPaths,
  student: studentPaths,
};

const Sidebar: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  const user = token ? (verifyToken(token) as TUser) : null;
  const role = user?.role;
  const sidebarItems = role
    ? roleBasedPaths[role as keyof typeof roleBasedPaths]
    : [];

  console.log("User Role:", role);
  console.log("Sidebar Items:", sidebarItems);

  return (
    <>
      {/* Mobile Sheet Menu */}
      <div className="hidden  p-4 relative z-50">
        <div className="text-xl font-bold text-primary mb-4">PH Uni</div>
        <ScrollArea className="h-full ">
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item: any) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "rounded-md px-4 py-2 text-base font-semibold",
                  location.pathname === item.path
                    ? "text-primary"
                    : "hover:text-primary text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen  border-r text-primary sticky top-0 hidden lg:flex flex-col">
        <div className="p-4 text-2xl font-bold text-primary border-b">
          PH Uni
        </div>
        <ScrollArea className="flex-1 p-4">
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item: any) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "rounded-md px-4 py-2 text-primary font-semibold",
                  location.pathname === item.path
                    ? "text-primary"
                    : "hover:text-primary text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
