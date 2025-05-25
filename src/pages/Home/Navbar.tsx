import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Students", to: "/students" },
  { label: "Instructors", to: "/instructors" },
  { label: "Courses", to: "/courses" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Jobs", to: "/jobs" },
];

export default function NavBar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              AcademicMS
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                      location.pathname === link.to
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </motion.div>

            {/* User Menu */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark:bg-gray-800">
                  <DropdownMenuItem className="dark:text-gray-300">
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:text-gray-300">
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dark:text-gray-300">
                    <Link to="/logout">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Mobile Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 dark:bg-gray-800"
                >
                  {navLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.to}
                      className="dark:text-gray-300"
                    >
                      <Link
                        to={link.to}
                        className={`w-full ${
                          location.pathname === link.to
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
