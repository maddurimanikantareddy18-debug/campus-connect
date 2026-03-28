import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/bg.jpg";

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
    club_name: "",
    staff_id: "",
    department: "",
    admin_role: "",
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
      const res = await fetch("http://localhost:5000/register", {
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
        alert("Account Created Successfully 🎉");
        navigate("/");
      } else {
        alert(data.message || "Registration Failed ❌");
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
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/90 p-8 rounded-2xl shadow-2xl w-[420px]">

        <div className="flex justify-center mb-3">
          <img src={logo} alt="logo" className="w-16 h-16" />
        </div>

        <h2 className="text-xl font-bold text-center text-blue-900 mb-3">
          ALIET Register
        </h2>

        {/* ROLE */}
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

            <select name="branch" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>IT</option>
              <option>AIML</option>
            </select>

            <select name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Year</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <input name="email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ORGANIZER */}
        {role === "Organization" && (
          <>
            <input name="roll" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Roll No" />

            <select name="club_name" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Club</option>
              <option>Technical</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Literary</option>
            </select>

            <select name="branch" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>IT</option>
              <option>AIML</option>
            </select>

            <select name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Year</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <input name="email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ADMIN */}
        {role === "Admin" && (
          <>
            <input name="staff_id" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Staff ID" />

            <select name="admin_role" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Role</option>
              <option>HOD</option>
              <option>Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer</option>
            </select>

            <select name="department" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Department</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>IT</option>
              <option>AIML</option>
            </select>

            <input name="email" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Email" />
            <input name="phone" onChange={handleChange} className="w-full mb-2 p-2 border rounded" placeholder="Phone" />
          </>
        )}

        {/* ALUMNI */}
        {role === "Alumni" && (
          <>
            <select name="branch" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Branch</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>IT</option>
              <option>AIML</option>
            </select>

            <select name="year" onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="">Select Passout Year</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>

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