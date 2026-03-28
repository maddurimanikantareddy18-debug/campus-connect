import { Routes, Route } from "react-router-dom";

// 🔥 PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🔥 DASHBOARDS
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ROLE DASHBOARDS */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/alumni" element={<AlumniDashboard />} />
    </Routes>
  );
}

export default App;