import React, { useState } from "react";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

// 🔥 NEW (Firebase)
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    // ✅ VALIDATION
    if ((role === "Student" || role === "Organization") && (!formData.roll || !formData.password)) {
      alert("Enter Roll No & Password ❌");
      return;
    }

    if (role === "Organization" && !formData.club) {
      alert("Select Club ❌");
      return;
    }

    if ((role === "Admin" || role === "Alumni") && (!formData.email || !formData.password)) {
      alert("Enter Email & Password ❌");
      return;
    }

    setLoading(true);

    try {

      // 🔥 TRY BACKEND FIRST (your existing system)
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
      const userRole = data.role || role;

      if (data.success) {

        alert("Login Successful ✅");

        localStorage.setItem("user", JSON.stringify({
          ...data.user,
          role: userRole
        }));

        // 🔀 ROUTING
        if (userRole === "Student") navigate("/student");
        else if (userRole === "Admin") navigate("/admin");
        else if (userRole === "Organization") navigate("/organizer");
        else if (userRole === "Alumni") navigate("/alumni");
        else navigate("/");

      } else {
        throw new Error("Backend failed");
      }

    } catch (error) {

      console.log("Backend failed → switching to Firebase");

      // 🔥 FIREBASE FALLBACK (only for Admin & Alumni)
      if (role === "Admin" || role === "Alumni") {
        try {
          const res = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

          alert("Firebase Login Success ✅");

          localStorage.setItem("user", JSON.stringify({
            name: formData.email.split("@")[0],
            role: role
          }));

          if (role === "Admin") navigate("/admin");
          else navigate("/alumni");

        } catch (err) {
          alert("Login Failed ❌");
        }

      } else {

        // 🔥 LAST FALLBACK (offline login)
        alert("Server offline — using local login");

        localStorage.setItem("user", JSON.stringify({
          role: role,
          roll: formData.roll,
          club: formData.club
        }));

        if (role === "Student") navigate("/student");
        else if (role === "Organization") navigate("/organizer");

      }
    }

    setLoading(false);
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white/85 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border">

        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
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
            value={formData.roll}
            onChange={handleChange}
            placeholder="Enter Roll Number"
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {role === "Organization" && (
          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Select Club</option>
            <option>ATC</option>
            <option>Magic Club</option>
            <option>Library</option>
            <option>AICUF</option>
          </select>
        )}

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

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

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