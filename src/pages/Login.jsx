import React, { useState } from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roll: "",
    email: "",
    password: "",
    club: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 LOGIN FUNCTION
  const handleLogin = async () => {

    // ✅ VALIDATION
    if (role === "Student" || role === "Organization") {
      if (!formData.roll || !formData.password) {
        return alert("Enter Roll No & Password ❌");
      }
    }

    if (role === "Organization" && !formData.club) {
      return alert("Select Club ❌");
    }

    if (role === "Admin" || role === "Alumni") {
      if (!formData.email || !formData.password) {
        return alert("Enter Email & Password ❌");
      }
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: role,
          rollNo: formData.roll.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          clubName: formData.club
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Successful ✅");

        // 🔥 ROLE BASED ROUTING
        if (role === "Student") navigate("/student");
        else if (role === "Admin") navigate("/admin");
        else if (role === "Organization") navigate("/organizer");
        else if (role === "Alumni") navigate("/alumni");

      } else {
        alert(data.message || "Invalid Credentials ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }

    setLoading(false);
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border border-white/30">

        {/* LOGO */}
        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center text-blue-900">
          ALIET CampusConnect
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          Andhra Loyola Institute of Engineering & Technology
        </p>

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-400"
        >
          <option>Student</option>
          <option>Admin</option>
          <option>Organization</option>
          <option>Alumni</option>
        </select>

        {/* ROLL */}
        {(role === "Student" || role === "Organization") && (
          <input
            type="text"
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            placeholder="Enter Roll Number"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {/* CLUB */}
        {role === "Organization" && (
          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Select Club</option>
            <option value="Technical">Technical Club</option>
            <option value="Cultural">Cultural Club</option>
            <option value="Sports">Sports Club</option>
            <option value="Literary">Literary Club</option>
          </select>
        )}

        {/* EMAIL */}
        {(role === "Admin" || role === "Alumni") && (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full mb-4 p-2 border rounded"
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:scale-105 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="text-sm text-center mt-4">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;