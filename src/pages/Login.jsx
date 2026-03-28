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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    // 🔥 BASIC VALIDATION
    if (
      (role === "Student" || role === "Organization") && !formData.roll
    ) {
      return alert("Enter Roll Number");
    }

    if (
      (role === "Admin" || role === "Alumni") && !formData.email
    ) {
      return alert("Enter Email");
    }

    if (!formData.password) {
      return alert("Enter Password");
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          role: role
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Successful ✅");

        // 🔥 SAVE USER (important for dashboard)
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔥 ROLE ROUTING (FIXED)
        if (data.role === "Student") navigate("/student");
        else if (data.role === "Admin") navigate("/admin");
        else if (data.role === "Organization") navigate("/organizer");
        else if (data.role === "Alumni") navigate("/alumni");
        else navigate("/");

      } else {
        alert(data.message || "Invalid Credentials ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border border-white/30">

        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-20 h-20" />
        </div>

        <h2 className="text-xl font-bold text-center text-blue-900">
          ALIET CampusConnect
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          Andhra Loyola Institute of Engineering & Technology
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option>Student</option>
          <option>Admin</option>
          <option>Organization</option>
          <option>Alumni</option>
        </select>

        {(role === "Student" || role === "Organization") && (
          <input
            type="text"
            name="roll"
            onChange={handleChange}
            placeholder="Enter Roll Number"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {role === "Organization" && (
          <input
            type="text"
            name="club"
            onChange={handleChange}
            placeholder="Enter Club Name"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {(role === "Admin" || role === "Alumni") && (
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;