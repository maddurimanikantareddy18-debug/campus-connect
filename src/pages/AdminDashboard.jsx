import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
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
            Admin Dashboard 🛠️
          </h1>

          {/* Cards Section */}
          <div className="grid grid-cols-3 gap-6">
            
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Total Users</h2>
              <p className="text-2xl font-bold mt-2">120</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Requests</h2>
              <p className="text-2xl font-bold mt-2">10</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-gray-500">Reports</h2>
              <p className="text-2xl font-bold mt-2">2</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}