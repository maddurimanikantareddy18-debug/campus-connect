import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Section from "../components/Section";

function AdminDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 AUTH CHECK
  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/");
    }
  }, []);

  // 🔍 SEARCH + FILTER STATES
  const [searchRoll, setSearchRoll] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  // 👨‍🎓 STUDENTS DATA (FAKE FOR NOW)
  const students = [
    { roll: "22HP1A1101", name: "Ravi", branch: "AIML", year: "2", score: 980 },
    { roll: "22HP1A1102", name: "Sneha", branch: "CSE", year: "3", score: 870 },
    { roll: "22HP1A1103", name: "Rahul", branch: "ECE", year: "1", score: 820 },
    { roll: "22HP1A1104", name: "Kiran", branch: "AIML", year: "2", score: 790 },
    { roll: "22HP1A1105", name: "Anil", branch: "CSE", year: "4", score: 760 },
  ];

  // 👨‍🎓 ALUMNI DATA
  const alumni = [
    "Ravi → Google",
    "Sneha → Amazon",
    "Kiran → Microsoft",
    "Anil → Infosys",
    "Priya → TCS"
  ];

  // 📚 CLUBS
  const clubs = ["ATC", "Magic", "Library", "AICUF"];

  // 🔍 FILTER LOGIC
  const filteredStudents = students.filter((s) =>
    (searchRoll === "" || s.roll.includes(searchRoll)) &&
    (branch === "" || s.branch === branch) &&
    (year === "" || s.year === year)
  );

  const openChat = (group) => {
    navigate(`/chat/${group}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar role="admin" />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <Navbar title="🧑‍💼 Admin Dashboard" />

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card title="Students" value="1200" color="bg-blue-600" />
          <Card title="Events" value="25" color="bg-purple-600" />
          <Card title="Clubs" value="4" color="bg-pink-600" />
          <Card title="Top Score" value="980" color="bg-green-600" />
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <Section title="🔍 Student Search & Filter">

          <div className="flex flex-wrap gap-3 mb-4">
            <input
              placeholder="Search by Roll No"
              className="border p-2 rounded"
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">All Branch</option>
              <option>AIML</option>
              <option>CSE</option>
              <option>ECE</option>
            </select>

            <select
              className="border p-2 rounded"
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">All Year</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          {/* STUDENT LIST */}
          {filteredStudents.map((s, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>
                {s.roll} | {s.name} | {s.branch} | {s.year} Year
              </span>
              <span className="font-bold">{s.score} pts</span>
            </div>
          ))}
        </Section>

        {/* 🏫 CLASS GROUPS */}
        <Section title="🏫 Class Groups">
          {["AIML-1", "AIML-2", "CSE-3", "ECE-1"].map((g, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{g}</span>
              <button
                onClick={() => openChat(g)}
                className="bg-blue-600 text-white px-2 rounded"
              >
                Open Chat
              </button>
            </div>
          ))}
        </Section>

        {/* 📚 CLUB GROUPS */}
        <Section title="📚 Club Groups">
          {clubs.map((c, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{c}</span>
              <button
                onClick={() => openChat(c)}
                className="bg-purple-600 text-white px-2 rounded"
              >
                Open Chat
              </button>
            </div>
          ))}
        </Section>

        {/* 👨‍🎓 ALUMNI */}
        <Section title="👨‍🎓 Alumni Panel">
          {alumni.map((a, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{a}</span>
              <button
                onClick={() => openChat("alumni")}
                className="bg-green-600 text-white px-2 rounded"
              >
                Chat
              </button>
            </div>
          ))}
        </Section>

        {/* 🏆 LEADERBOARD */}
        <Section title="🏆 Top 10 Leaderboard">
          {students
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((s, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{i + 1}. {s.name}</span>
                <span>{s.score} pts</span>
              </div>
            ))}
        </Section>

      </div>
    </div>
  );
}

export default AdminDashboard;