import React from "react";

function StudentDashboard() {

  const student = {
    name: "Student Name",
    branch: "CSE",
    year: "2"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* 🔵 TOP BAR */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold text-blue-700">
          Welcome, {student.name}
        </h2>

        <button className="bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>
      </div>

      {/* 🟢 CLUB GROUPS */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Club Groups</h3>

        <div className="grid grid-cols-2 gap-4">

          {["Technical", "Cultural", "Sports", "Literary"].map((club) => (
            <div
              key={club}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
            >
              <h4 className="font-bold text-blue-600">{club} Club</h4>
              <p className="text-sm text-gray-500">Open Chat</p>
            </div>
          ))}

        </div>
      </div>

      {/* 🟡 COLLEGE GROUP */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Your Class Group</h3>

        <div className="bg-white p-4 rounded shadow hover:bg-blue-50 cursor-pointer">
          <h4 className="font-bold text-green-600">
            {student.branch} - {student.year} Year Group
          </h4>
          <p className="text-sm text-gray-500">Open Class Chat</p>
        </div>
      </div>

      {/* 🟣 SCORE SECTION */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Your Score</h3>

        <div className="bg-white p-4 rounded shadow">
          <p>Total Participation Score:</p>
          <h2 className="text-2xl font-bold text-purple-600">120 Points</h2>
        </div>
      </div>

    </div>
  );
}

export default StudentDashboard;