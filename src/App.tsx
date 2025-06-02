import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AcademicPerformance } from "./pages/AcademicPerformance";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/academic-performance" element={<AcademicPerformance />} />
        {/* Add other routes as needed */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
