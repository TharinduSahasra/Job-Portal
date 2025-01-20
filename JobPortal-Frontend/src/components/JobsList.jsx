import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiSend, FiX } from "react-icons/fi";

const JobsList = ({ actionLoading, jobs, onApply, onDelete, setSelectedJob }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedJob, setSelectedJobDetails] = useState(null); // Modal state

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let filtered = jobs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((job) => job.category === selectedCategory);
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

    // Sort jobs by whether the current user posted them (recruiter jobs on top)
    filtered = filtered.sort((a, b) => {
      // If both jobs are posted by the same recruiter, prioritize them by date posted
      if (userData?.jobIds?.includes(a.id) && !userData?.jobIds?.includes(b.id)) {
        return -1; // a comes first
      } else if (!userData?.jobIds?.includes(a.id) && userData?.jobIds?.includes(b.id)) {
        return 1; // b comes first
      } else {
        return new Date(b.postedDate) - new Date(a.postedDate); // Sort by latest posted
      }
    });

    setFilteredJobs(filtered);
  }, [searchQuery, selectedCategory, jobs, userData]);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-extrabold mb-6">Available Jobs</h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by position, company, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto py-3 px-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All</option>
          <option value="Software Development">Software Development</option>
          <option value="IT">IT</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Sales">Sales</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

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
          (showAllJobs ? filteredJobs : filteredJobs.slice(0, 6)).map((job) => (
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
                <p className="opacity-80 mb-1">
                  Experience: <span className="font-medium">{job.experience}</span>
                </p>
                <h3 className="font-semibold">{job.company}</h3>
                <p className="opacity-80">{job.location}</p>
              </div>

              {/* View More Button */}
              <button
                onClick={() => setSelectedJobDetails(job)}
                className="py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded-lg text-white font-semibold transition-all mb-4"
              >
                View More
              </button>

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

      {/* See More Button */}
      {!showAllJobs && filteredJobs.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllJobs(true)}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-lg font-semibold transition-all"
          >
            See More Jobs
          </button>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{selectedJob.position}</h2>
              <button onClick={() => setSelectedJobDetails(null)} className="text-white text-2xl">
                <FiX />
              </button>
            </div>
            <p className="opacity-80 mb-2"><strong>Company:</strong> {selectedJob.company}</p>
            <p className="opacity-80 mb-2"><strong>Location:</strong> {selectedJob.location}</p>
            <p className="opacity-80 mb-2"><strong>Salary:</strong> {selectedJob.salaryRange}</p>
            <p className="opacity-80 mb-2"><strong>Experience:</strong> {selectedJob.experience}</p>
            <p className="opacity-80 mb-2"><strong>Description:</strong> {selectedJob.description}</p>
            <p className="opacity-80 mb-4"><strong>Skills Required:</strong> {selectedJob.skills.join(", ")}</p>
            <button
              onClick={() => setSelectedJobDetails(null)}
              className="w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
