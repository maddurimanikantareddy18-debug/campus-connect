import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Section from "../components/Section";

function OrganizerDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 AUTH CHECK (FIXED)
  useEffect(() => {
    if (!user || user.role !== "Organization") {
      navigate("/");
    }
  }, [user, navigate]);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  // 📅 EVENTS STATE
  const [events, setEvents] = useState([
    { name: "Hackathon 2025", winner: "Ravi", date: "12 Feb 2025" },
    { name: "Coding Contest", winner: "Sneha", date: "20 Jan 2025" }
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    winner: ""
  });

  const addEvent = () => {
    if (!newEvent.name) return;
    setEvents([...events, newEvent]);
    setNewEvent({ name: "", date: "", winner: "" });
  };

  // 👨‍🎓 ALUMNI DATA
  const alumni = [
    "Ravi → Google",
    "Sneha → Amazon",
    "Kiran → Microsoft",
    "Anil → Infosys",
    "Priya → TCS"
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
      <Sidebar role="organizer" />

      {/* MAIN */}
      <div className="flex-1 p-6">

        <Navbar title="🏢 Organizer Dashboard" />

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Events Conducted" value={events.length} color="bg-indigo-500" />
          <Card title="Announcements" value="15" color="bg-purple-500" />
          <Card title="Active Members" value="120" color="bg-pink-500" />
        </div>

        {/* CLUBS */}
        <Section title="📚 Club Groups">
          {clubs.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 mb-3 rounded-lg shadow text-white"
              style={{ background: "linear-gradient(to right, #4f46e5, #9333ea)" }}
            >
              <div>
                <h4 className="font-bold">{c.name}</h4>
                <p className="text-sm opacity-90">Manage • Organize • Lead</p>
              </div>

              <button
                onClick={() => openChat(c.short)}
                className="bg-white text-black px-3 py-1 rounded font-semibold"
              >
                Open Chat
              </button>
            </div>
          ))}
        </Section>

        {/* ANNOUNCEMENT */}
        <Section title="📢 Post Announcement">
          <textarea
            placeholder="Write announcement..."
            className="w-full border p-2 rounded mb-3"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Post Announcement
          </button>
        </Section>

        {/* EVENTS */}
        <Section title="📅 Past Events">
          {events.map((e, i) => (
            <div key={i} className="p-3 border-b">
              <p className="font-bold">{e.name}</p>
              <p className="text-sm">Winner: {e.winner}</p>
              <p className="text-xs text-gray-500">{e.date}</p>
            </div>
          ))}
        </Section>

        {/* ADD EVENT */}
        <Section title="➕ Add New Event">
          <input
            placeholder="Event Name"
            className="border p-2 mr-2 mb-2"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            placeholder="Date"
            className="border p-2 mr-2 mb-2"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            placeholder="Winner"
            className="border p-2 mr-2 mb-2"
            value={newEvent.winner}
            onChange={(e) => setNewEvent({ ...newEvent, winner: e.target.value })}
          />

          <button
            onClick={addEvent}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        </Section>

        {/* ALUMNI */}
        <Section title="👨‍🎓 Alumni Connect">
          <input
            placeholder="Search Alumni"
            className="w-full p-2 border rounded mb-3"
            onChange={(e) => setSearch(e.target.value)}
          />

          {alumni
            .filter((a) => a.toLowerCase().includes(search.toLowerCase()))
            .map((a, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{a}</span>
                <button
                  onClick={() => openChat("alumni")}
                  className="bg-green-600 text-white px-2 rounded"
                >
                  Request Chat
                </button>
              </div>
            ))}
        </Section>

      </div>
    </div>
  );
}

export default OrganizerDashboard;