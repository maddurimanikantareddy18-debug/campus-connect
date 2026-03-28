import { Link, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaUserShield,
  FaUsers,
  FaUserTie
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Student",
      path: "/student",
      icon: <FaUserGraduate />
    },
    {
      name: "Admin",
      path: "/admin",
      icon: <FaUserShield />
    },
    {
      name: "Alumni",
      path: "/alumni",
      icon: <FaUsers />
    },
    {
      name: "Organizer",
      path: "/organizer",
      icon: <FaUserTie />
    }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      
      <h1 className="text-2xl font-bold mb-8">
        CampusConnect
      </h1>

      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition 
              ${
                location.pathname === item.path
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}