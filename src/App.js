import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/organizer" element={<OrganizerDashboard />} />
<Route path="/alumni" element={<AlumniDashboard />} />
    </Routes>
  );
}

export default App;