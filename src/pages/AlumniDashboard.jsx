import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Section from "../components/Section";

function AlumniDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 AUTH CHECK
  useEffect(() => {
    if (!user || user.role !== "Alumni") {
      navigate("/");
    }
  }, []);

  // 👨‍🎓 ALUMNI DATA (FAKE)
  const alumniList = [
    { name: "Ravi", company: "Google" },
    { name: "Sneha", company: "Amazon" },
    { name: "Kiran", company: "Microsoft" },
    { name: "Anil", company: "Infosys" },
    { name: "Priya", company: "TCS" }
  ];

  // 📚 CLUBS
  const clubs = [
    { name: "ALIET Techpreneur Club", short: "ATC" },
    { name: "ALIET Magic Club", short: "Magic" },
    { name: "ALIET Central Library", short: "Library" },
    { name: "AICUF", short: "AICUF" }
  ];

  const openChat = (group) => {
    navigate(`/chat/${group}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar role="alumni" />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <Navbar title="🎓 Alumni Dashboard" />

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Alumni Network" value="500+" color="bg-indigo-500" />
          <Card title="Connections" value="120" color="bg-purple-500" />
          <Card title="Messages" value="25" color="bg-pink-500" />
        </div>

        {/* GLOBAL ALUMNI CHAT */}
        <Section title="🌐 Alumni Global Group">
          <div className="flex justify-between items-center">
            <span>All Alumni Group</span>
            <button
              onClick={() => openChat("alumni")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Open Chat
            </button>
          </div>
        </Section>

        {/* ALUMNI LIST */}
        <Section title="👨‍🎓 Alumni Network">
          {alumniList.map((a, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{a.name} → {a.company}</span>
              <button
                onClick={() => openChat(a.name)}
                className="bg-green-600 text-white px-2 rounded"
              >
                Chat
              </button>
            </div>
          ))}
        </Section>

        {/* CLUB VISIBILITY */}
        <Section title="📚 Club Groups (View & Join)">
          {clubs.map((c, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{c.name}</span>
              <button
                onClick={() => openChat(c.short)}
                className="bg-purple-600 text-white px-2 rounded"
              >
                View Chat
              </button>
            </div>
          ))}
        </Section>

        {/* IDEAS / CONTRIBUTION */}
        <Section title="💡 Alumni Contribution">
          <textarea
            placeholder="Share your ideas / guidance..."
            className="w-full border p-2 rounded mb-3"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Submit Idea
          </button>
        </Section>

      </div>
    </div>
  );
}

export default AlumniDashboard;