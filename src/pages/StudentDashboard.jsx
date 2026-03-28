import Sidebar from "../components/Sidebar";

export default function StudentDashboard() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        
        <h1 className="text-2xl font-bold mb-6">
          Student Dashboard 👨‍🎓
        </h1>

        <div className="grid grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-gray-500">Connections</h2>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-gray-500">Messages</h2>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-gray-500">Notifications</h2>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>

        </div>

      </div>
    </div>
  );
}