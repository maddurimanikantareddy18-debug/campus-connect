import { FaBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Dynamic title based on route
  const getTitle = () => {
    switch (location.pathname) {
      case "/student":
        return "Student Dashboard 🎓";
      case "/admin":
        return "Admin Dashboard 🛠️";
      case "/alumni":
        return "Alumni Dashboard 👥";
      case "/organizer":
        return "Organizer Dashboard 🧑‍💼";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
      
      {/* Left: Title */}
      <h2 className="text-xl font-bold">
        {getTitle()}
      </h2>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        
        {/* Notification Bell */}
        <div className="relative cursor-pointer hover:scale-110 transition">
          <FaBell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full text-white">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full"
          />
          <span className="font-medium">User</span>
        </div>

      </div>
    </div>
  );
}