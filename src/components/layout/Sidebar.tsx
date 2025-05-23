import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { type TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
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
  const role = user?.role ?? "admin";
  const sidebarItems = role
    ? roleBasedPaths[role as keyof typeof roleBasedPaths]
    : [];

  return (
    <>
      {/* Mobile Sheet Menu */}
      <div className="lg:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-4">
            <div className="text-xl font-bold text-primary mb-4">PH Uni</div>
            <ScrollArea className="h-full">
              <nav className="flex flex-col gap-2">
                {sidebarItems.map((item: any) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-primary text-black"
                        : "hover:bg-accent hover:text-accent-foreground text-black"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen bg-muted border-r text-muted-foreground sticky top-0 hidden lg:flex flex-col">
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
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-black"
                    : "hover:bg-accent hover:text-accent-foreground text-black"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
