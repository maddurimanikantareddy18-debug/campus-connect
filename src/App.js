import React from "react";
import { Routes, Route } from "react-router-dom";

// 🔥 Pages (IMPORTANT: names must match files exactly)
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AlumniDashboard from "./pages/AlumniDashboard";
import ChatPage from "./pages/ChatPage"; // ✅ FINAL FIX

function App() {
  return (
    <Routes>

      {/* 🔐 AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🎓 DASHBOARDS */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/alumni" element={<AlumniDashboard />} />

      {/* 💬 CHAT SYSTEM */}
      <Route path="/chat/:group" element={<ChatPage />} />

      {/* ❌ FALLBACK (OPTIONAL BUT GOOD PRACTICE) */}
      <Route path="*" element={<Login />} />

    </Routes>
  );
}

export default App;