import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import {
  FaSearch,
  FaTrash,
  FaUserTie,
  FaEnvelope,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

const ManageUsers = () => {
  const [userType, setUserType] = useState("recruiters");
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchJobs();
  }, [userType]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/api/v1/admins/${userType}`);
      setUsers(response.data || []);
    } catch (err) {
      setError(`Error fetching ${userType}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await api.get("/api/v1/jobs");
      setJobs(response.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    }
  };

  const fetchCandidateApplications = async (email) => {
    try {
      const response = await api.get(`/api/v1/admins/candidate-applications/${email}`);
      const applications = response.data || [];

      // Enrich applications with job details
      const enrichedApplications = applications.map((application) => {
        const jobInfo = jobs.find((job) => job.id === application.jobId);
        return {
          ...application,
          jobTitle: jobInfo?.position || "Unknown Job",
          company: jobInfo?.company || "Unknown Company",
          location: jobInfo?.location || "Unknown Location",
        };
      });

      setAppliedJobs(enrichedApplications);
      setSelectedUser(email);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error fetching candidate applications:", err);
      setAppliedJobs([]);
      setSelectedUser(email);
      setShowDetailsModal(true);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-6">
          Manage {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </div>

          <select
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-100"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="recruiters">Recruiters</option>
            <option value="candidates">Candidates</option>
          </select>
        </div>

        {loading && <p className="text-center text-gray-300">Loading users...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600"
                >
                  <h2 className="text-xl font-semibold">{user.name || "Unknown"}</h2>
                  <p className="text-gray-300">
                    <FaEnvelope /> {user.email}
                  </p>

                  <div className="flex gap-4 mt-4">
                    {userType === "candidates" && (
                      <button
                        onClick={() => fetchCandidateApplications(user.email)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                      >
                        <FaEye /> View Applications
                      </button>
                    )}
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No {userType} found.</p>
          )}
        </div>
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-white mb-4">
              Applications for {selectedUser}
            </h2>
            {appliedJobs.length > 0 ? (
              <ul className="text-gray-300">
                {appliedJobs.map((app, index) => (
                  <li key={index} className="mb-2 p-2 bg-gray-700 rounded-lg">
                    <strong>{app.jobTitle}</strong> at {app.company} -{" "}
                    <span className="text-yellow-400">{app.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No job applications found.</p>
            )}
            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
