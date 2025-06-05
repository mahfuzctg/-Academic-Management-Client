// src/pages/NotFound.tsx

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-lg bg-[#112D6E] text-white hover:bg-[#112d6e97] transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
