import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { FaSearch, FaTrash, FaUserTie, FaEnvelope, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const ManageUsers = () => {
  const [userType, setUserType] = useState("recruiters");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [visibleUsers, setVisibleUsers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateApplications, setCandidateApplications] = useState([]);
  const [jobs, setJobs] = useState([]);  // New state to store job data

  const apiEndpoints = {
    recruiters: "/api/v1/admins/recruiters",
    candidates: "/api/v1/admins/candidates",
    candidateApplications: "/api/v1/admins/candidate-applications",
    jobs: "/api/v1/jobs",  // New endpoint to fetch jobs
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(apiEndpoints[userType]);
      setUsers(response.data || []);
    } catch (err) {
      setError(`Error fetching ${userType}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await api.get(apiEndpoints.jobs);
      setJobs(response.data || []);
    } catch (err) {
      setError("Error fetching jobs.");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchJobs();  // Fetch jobs when component mounts
  }, [userType]);

  const fetchCandidateApplications = async (email) => {
    try {
      const response = await api.get(`${apiEndpoints.candidateApplications}/${email}`);
      setCandidateApplications(response.data || []);
    } catch (err) {
      setError("Error fetching candidate applications.");
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await api.delete(`${apiEndpoints[userType]}/delete/${userToDelete}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userToDelete));
        setShowModal(false);
      } catch (err) {
        setError(`Error deleting ${userType.slice(0, -1)}.`);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => setSearchQuery("");

  const handleShowCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    fetchCandidateApplications(candidate.email);
    setShowModal(true);
  };

  const handleShowMore = () => {
    setLoading(true);
    setVisibleUsers(visibleUsers + 6);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fetch job info for the candidate
  const getJobDetails = (jobId) => {
    const job = jobs.find((job) => job.id === jobId);
    return job ? job.position : "Job not found";
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
            {searchQuery && (
              <button
                className="absolute left-4 top-3 text-gray-400"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <FaTimesCircle />
              </button>
            )}
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

        {loading && (
          <div className="text-center text-gray-300">
            <p>Loading users...</p>
          </div>
        )}

        {error && (
          <div>
            <p className="text-red-500 text-center mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.slice(0, visibleUsers).map((user) => (
                <div
                  key={user.email}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FaUserTie className="text-blue-400 text-2xl" />
                    <h2 className="text-xl font-semibold">{user.name || "Unknown"}</h2>
                  </div>
                  <p className="flex items-center gap-2 text-gray-300">
                    <FaEnvelope className="text-gray-400" /> {user.email}
                  </p>
                  {user.company && (
                    <p className="text-gray-400 mt-2">Company: {user.company}</p>
                  )}

                  {/* Show job details for candidates */}
                  {userType === "candidates" && (
                    <p className="text-gray-400 mt-2">Job: {getJobDetails(user.jobId)}</p>
                  )}

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => {
                        setUserToDelete(user.email);
                        setShowModal(true);
                      }}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                    {userType === "candidates" && (
                      <button
                        onClick={() => handleShowCandidateDetails(user)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <FaInfoCircle /> View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No {userType} found.</p>
          )}
        </div>

        {filteredUsers.length > visibleUsers && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              {loading ? 'Loading...' : 'Show More'}
            </button>
          </div>
        )}
      </div>

      {showModal && selectedCandidate && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {selectedCandidate.name || "Unknown"}'s Details
            </h3>
            <p className="text-gray-300 mb-4">Email: {selectedCandidate.email}</p>
            {selectedCandidate.company && (
              <p className="text-gray-300 mb-4">Company: {selectedCandidate.company}</p>
            )}
            <h4 className="text-lg text-gray-100 mb-2">Job Applications</h4>
            <ul className="list-disc pl-5 text-gray-300">
              {candidateApplications.length > 0 ? (
                candidateApplications.map((app) => {
                  const jobDetails = getJobDetails(app.jobId); // Get job details by matching jobId
                  return (
                    <li key={`${selectedCandidate.email}-${app.jobId}-${app.status}`}>
                      <p>{jobDetails} - Status: {app.status}</p>
                    </li>
                  );
                })
              ) : (
                <li>No applications found.</li>
              )}
            </ul>
            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
