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
  // const location = useLocation();

  return (
    <header className="bg-black shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">AcademicMS</h1>
      </div>
    </header>
  );
}
