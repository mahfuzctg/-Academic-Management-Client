import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import InstructorManagement from "./pages/InstructorManagement";
import CourseEnrollment from "./pages/CourseEnrollment";
import AcademicPerformance from "./pages/AcademicPerformance";
import JobSection from "./pages/JobSection";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/instructors" element={<InstructorManagement />} />
            <Route path="/courses" element={<CourseEnrollment />} />
            <Route
              path="/academic-performance"
              element={<AcademicPerformance />}
            />
            <Route path="/jobs" element={<JobSection />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
