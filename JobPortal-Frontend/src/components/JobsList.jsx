import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiSend } from "react-icons/fi";

const JobsList = ({ actionLoading, jobs, onApply, onDelete, setSelectedJob }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);
  const userData = useSelector((state) => state.auth.userData);

  // Redirect unauthorized users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Predefined job categories
  const categories = [
    "All",
    "Software Development",
    "IT",
    "Engineering",
    "Marketing",
    "Finance",
    "Design",
    "Human Resources",
    "Sales",
    "Healthcare",
    "Education",
    "Other",
  ];

  // Function to categorize jobs
  const extractCategory = (position) => {
    if (!position) return "Other"; // Prevents errors

    const lowerTitle = position.toLowerCase();
    if (lowerTitle.includes("developer") || lowerTitle.includes("engineer")) return "Engineering";
    if (lowerTitle.includes("it") || lowerTitle.includes("software")) return "IT";
    if (lowerTitle.includes("marketing")) return "Marketing";
    if (lowerTitle.includes("finance")) return "Finance";
    if (lowerTitle.includes("designer") || lowerTitle.includes("ui") || lowerTitle.includes("ux")) return "Design";
    if (lowerTitle.includes("hr") || lowerTitle.includes("human resources")) return "Human Resources";
    if (lowerTitle.includes("sales")) return "Sales";
    if (lowerTitle.includes("doctor") || lowerTitle.includes("nurse") || lowerTitle.includes("medical")) return "Healthcare";
    if (lowerTitle.includes("teacher") || lowerTitle.includes("professor")) return "Education";
    return "Other";
  };

  // Filter jobs based on search and category
  useEffect(() => {
    let filtered = jobs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((job) => extractCategory(job.position) === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.position.toLowerCase().includes(lowercasedQuery) ||
          job.company.toLowerCase().includes(lowercasedQuery) ||
          job.location.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedCategory, jobs]);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-extrabold mb-6">Available Jobs</h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by position, company, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto py-3 px-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="text-black">
              {category}
            </option>
          ))}
        </select>

        {/* Post Job Button */}
        {isRecruiter && (
          <button
            onClick={() => navigate("/postjob")}
            className="py-3 px-8 bg-green-600 hover:bg-green-500 rounded-lg text-white text-lg font-bold transition-all shadow-lg"
          >
            + Post Job
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-slate-800 border border-white/10 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
            >
              {/* Job Details */}
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">{job.position}</h2>
                <p className="opacity-80 mb-1">
                  Salary: <span className="font-medium">{job.salaryRange}</span>
                </p>
                <p className="opacity-80 mb-4">{job.experience} years required</p>

                <h3 className="font-semibold">{job.company}</h3>
                <p className="opacity-80">{job.location}</p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="py-1 px-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs rounded-full text-white shadow-md cursor-pointer"
                    title={`Skill: ${skill}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                {isRecruiter && userData.jobIds.includes(job.id) ? (
                  <button
                    onClick={() => onDelete(job)}
                    disabled={actionLoading}
                    className={`flex items-center gap-2 py-3 px-6 bg-red-600 hover:bg-red-500 rounded-lg text-white text-lg font-semibold transition-all ${
                      actionLoading && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      onApply();
                    }}
                    disabled={isRecruiter}
                    className={`flex items-center gap-2 py-3 px-6 bg-green-600 hover:bg-green-500 rounded-lg text-white text-lg font-semibold transition-all ${
                      isRecruiter && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <FiSend />
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="my-10 text-center">
            <p className="text-lg font-semibold mb-4">No jobs available</p>
            <div className="text-gray-500 text-6xl">😞</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
