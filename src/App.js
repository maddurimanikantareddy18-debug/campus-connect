import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/alumni" element={<AlumniDashboard />} />

      <Route path="/chat/:group" element={<ChatPage />} />  {/* ✅ FIXED */}

    </Routes>
  );
}

export default App;