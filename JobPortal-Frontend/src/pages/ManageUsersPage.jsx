import React, { useState } from "react";
import ManageUsers from "../components/ManageUsers";

const ManageUsersPage = () => {
  const [userType, setUserType] = useState("recruiters"); // Default to recruiters

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* User Type Selector */}
        <div className="flex justify-center mb-6">
          <select
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-100"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="recruiters">Recruiters</option>
            <option value="candidates">Candidates</option>
          </select>
        </div>

        {/* ManageUsers Component */}
        <ManageUsers
          userType={userType.charAt(0).toUpperCase() + userType.slice(1)} // Capitalize the first letter
          apiEndpoint={`/api/v1/admins/${userType}`}
        />
      </div>
    </div>
  );
};

export default ManageUsersPage;
