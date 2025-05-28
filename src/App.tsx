import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AcademicPerformance } from "./pages/AcademicPerformance";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/academic-performance" element={<AcademicPerformance />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
