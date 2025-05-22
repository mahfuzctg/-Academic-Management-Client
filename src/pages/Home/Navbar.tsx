import { Link, useLocation } from "react-router-dom";

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

  return (
    <header className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">AcademicMS</h1>
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium ${
                location.pathname === link.to
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
