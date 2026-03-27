import React, { useState } from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* LOGIN CARD */}
      <div className="relative bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border border-white/30">

        {/* LOGO */}
        <div className="flex justify-center mb-3">
          <img
            src={logo}
            alt="ALIET logo"
            className="w-20 h-20 object-contain"
          />
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
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>Student</option>
          <option>Admin</option>
          <option>Organization</option>
          <option>Alumni</option>
        </select>

        {/* ROLL NUMBER */}
        <input
          type="text"
          placeholder="Enter Roll Number"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded hover:scale-105 transition duration-200"
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="text-sm text-center mt-4">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;