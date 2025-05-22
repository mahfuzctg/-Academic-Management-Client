export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-20 border-t">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} AcademicMS. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a
            href="/privacy-policy"
            className="text-sm text-gray-600 hover:text-blue-500"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm text-gray-600 hover:text-blue-500"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
