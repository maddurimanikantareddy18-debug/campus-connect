import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

function StudentDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "Student") {
      navigate("/");
    }
  }, []);

  const clubs = [
    { name: "Techpreneur Club", short: "ATC", color: "bg-blue-500" },
    { name: "Magic Club", short: "Magic", color: "bg-purple-500" },
    { name: "Library", short: "Library", color: "bg-green-500" },
    { name: "AICUF", short: "AICUF", color: "bg-pink-500" }
  ];

  return (
    <div className="flex">

      <Sidebar role="student" />

      <div className="flex-1 p-6 bg-gray-100">

        <h2 className="text-2xl font-bold mb-6">🎓 Student Dashboard</h2>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Events" value="5" />
          <Card title="Score" value="120" />
          <Card title="Messages" value="8" />
        </div>

        {/* CLUBS */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="font-bold mb-4">Club Groups</h3>

          {clubs.map((c, i) => (
            <div key={i} className="flex justify-between items-center p-3 border-b">
              <span className="font-semibold">{c.name}</span>

              <button
                onClick={() => navigate(`/chat/${c.short}`)}
                className={`${c.color} text-white px-3 py-1 rounded`}
              >
                Join Chat
              </button>
            </div>
          ))}
        </div>

        {/* SCORE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold">Score Breakdown</h3>
          <p>ATC: 40 | Magic: 20 | Library: 30 | AICUF: 30</p>
          <p className="font-bold mt-2">Total: 120</p>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;