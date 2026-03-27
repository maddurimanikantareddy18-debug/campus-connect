import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";

function Register() {
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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CARD */}
      <div className="relative bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[420px] border border-white/30 animate-fadeIn">

        {/* LOGO */}
        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center text-blue-900">
          ALIET Register
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          Create your CampusConnect Account
        </p>

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400"
        >
          <option>Student</option>
          <option>Admin</option>
          <option>Organization</option>
          <option>Alumni</option>
        </select>

        {/* NAME */}
        <input className="w-full mb-2 p-2 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Name" />

        {/* STUDENT */}
        {role === "Student" && (
          <>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Roll No" />

            <select className="w-full mb-2 p-2 border rounded">
              <option>Select Branch</option>
              <option>CSE</option>
              <option>CSE-AIML</option>
              <option>CSE-DS</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>MECH</option>
              <option>CIVIL</option>
              <option>IT</option>
            </select>

            <select className="w-full mb-2 p-2 border rounded">
              <option>Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <input className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ALUMNI */}
        {role === "Alumni" && (
          <>
            <select className="w-full mb-2 p-2 border rounded">
              <option>Select Branch</option>
              <option>CSE</option>
              <option>CSE-AIML</option>
              <option>CSE-DS</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>MECH</option>
              <option>CIVIL</option>
              <option>IT</option>
            </select>

            <select className="w-full mb-2 p-2 border rounded">
              <option>Join Year</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>

            <select className="w-full mb-2 p-2 border rounded">
              <option>Passout Year</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>

            <input className="w-full mb-2 p-2 border rounded" placeholder="Company" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Job Role" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
        />

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-2 rounded hover:scale-105 transition duration-200"
        >
          Create Account
        </button>

        {/* LOGIN */}
        <p className="text-center mt-3 text-sm">
          Already have account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;