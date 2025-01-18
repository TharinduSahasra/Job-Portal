import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { FaUsers, FaBriefcase } from "react-icons/fa"; // Import Icons

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [recruiters, setRecruiters] = useState([]);  // Ensure initial state is []
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recruitersRes = await api.get("/api/v1/admins/recruiters");
        setRecruiters(recruitersRes.data || []); // Ensure empty array if data is null

        const candidatesRes = await api.get("/api/v1/admins/candidates");
        setCandidates(candidatesRes.data || []);

        const jobsRes = await api.get("/api/v1/jobs");
        setJobs(jobsRes.data || []);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-semibold text-center mb-10">Admin Dashboard</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Dashboard Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaUsers className="text-5xl mb-3" />
            <h2 className="text-2xl font-medium">Recruiters</h2>
            <p className="text-xl font-bold">{recruiters?.length || 0}</p> {/* Use optional chaining */}
          </div>
          <div className="bg-green-500 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaUsers className="text-5xl mb-3" />
            <h2 className="text-2xl font-medium">Candidates</h2>
            <p className="text-xl font-bold">{candidates?.length || 0}</p>
          </div>
          <div className="bg-purple-500 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
            <FaBriefcase className="text-5xl mb-3" />
            <h2 className="text-2xl font-medium">Job Postings</h2>
            <p className="text-xl font-bold">{jobs?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
