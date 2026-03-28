import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";

import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    branch: "",
    year: "",
    phone: "",
    club: "",
    staff_id: "",
    department: "",
    company: "",
    job_role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      let emailToUse = formData.email;

      if (role === "Student" || role === "Organization") {
        emailToUse = formData.roll + "@campus.com";
      }

      // 🔥 Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailToUse,
        formData.password
      );

      const user = userCredential.user;

      // 🔥 Firestore Save
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: emailToUse,
        role: role
      });

      // 🔥 MySQL API
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          email: emailToUse,
          role: role
        })
      });

      alert("Account Created Successfully 🎉");
      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/85 p-8 rounded-2xl shadow-2xl w-[420px]">

        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>

        <h2 className="text-xl font-bold text-center text-blue-900">
          ALIET Register
        </h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option>Student</option>
          <option>Admin</option>
          <option>Organization</option>
          <option>Alumni</option>
        </select>

        <input name="name" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Name" />

        {/* STUDENT */}
        {role === "Student" && (
          <>
            <input name="roll" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Roll No" />
            <input name="branch" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Branch" />
            <input name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Year" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ORGANIZER */}
        {role === "Organization" && (
          <>
            <input name="roll" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Roll No" />
            <input name="club" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Club Name" />
            <input name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Year" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ADMIN */}
        {role === "Admin" && (
          <>
            <input name="staff_id" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Staff ID" />
            <input name="department" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Department" />
            <input name="email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ALUMNI */}
        {role === "Alumni" && (
          <>
            <input name="branch" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Branch" />
            <input name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Passout Year" />
            <input name="company" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Company" />
            <input name="job_role" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Job Role" />
            <input name="email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        <input type="password" name="password" onChange={handleChange} className="w-full mb-4 p-2 border rounded" placeholder="Password" />

        <button onClick={handleRegister} className="w-full bg-blue-600 text-white p-2 rounded">
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Register;