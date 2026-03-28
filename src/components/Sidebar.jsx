import { Link } from "react-router-dom";

function Sidebar({ role }) {

  const menu = {
    student: ["Dashboard", "Clubs", "Class", "Score", "Alumni"],
    organizer: ["Dashboard", "Clubs", "Events", "Announcements", "Alumni"],
    admin: ["Dashboard", "Students", "Leaderboard", "Events", "Alumni", "Chat"],
    alumni: ["Dashboard", "Network", "Clubs", "Messages", "Ideas"]
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-8">CampusConnect</h2>

      <div className="space-y-3">
        {menu[role]?.map((item, i) => (
          <Link
            key={i}
            to="#"
            className="block p-2 rounded hover:bg-white/20 transition"
          >
            {item}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;