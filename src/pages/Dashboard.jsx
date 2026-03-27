import React from "react";

function Dashboard() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="bg-blue-700 text-white p-4 text-xl font-bold">
        CampusConnect Dashboard 🚀
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Welcome to Dashboard
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded shadow">
            Events
          </div>

          <div className="bg-white p-4 rounded shadow">
            Notifications
          </div>

          <div className="bg-white p-4 rounded shadow">
            Alumni Connect
          </div>

          <div className="bg-white p-4 rounded shadow">
            Performance
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;