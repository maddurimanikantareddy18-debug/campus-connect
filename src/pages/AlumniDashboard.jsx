import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AlumniDashboard() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="p-6 bg-gray-100 min-h-screen">
          
          <h1 className="text-2xl font-bold mb-6">
            Alumni Dashboard 🎓
          </h1>

          {/* Cards Section */}
          <div className="grid grid-cols-3 gap-6">
            
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Students Connected</h2>
              <p className="text-2xl font-bold mt-2">20</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Messages</h2>
              <p className="text-2xl font-bold mt-2">8</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Posts</h2>
              <p className="text-2xl font-bold mt-2">4</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}