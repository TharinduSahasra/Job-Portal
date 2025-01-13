import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobsList = ({
  actionLoading,
  jobs,
  onApply,
  onDelete,
  setSelectedJob,
}) => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    onApply();
  };

  const handleDeleteClick = (job) => {
    onDelete(job);
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Available Jobs</h1>

      {isRecruiter && (
        <div className="my-6">
          <button
            onClick={() => navigate("/postjob")}
            className="py-3 px-8 bg-green-600 hover:opacity-70 rounded-lg text-white text-lg font-bold transition-opacity"
          >
            + Post New Job
          </button>
        </div>
      )}

      <div className="my-6 flex flex-col gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="my-4 p-4 flex justify-between items-center gap-4 border border-white/20 rounded-lg"
            >
              {/* Job Details Section */}
              <div>
                <h2 className="text-xl font-semibold">{job.position}</h2>
                <p className="opacity-80 mb-1">
                  Salary Range: <span className="font-medium">{job.salaryRange}</span>
                </p>
                <p className="opacity-80 mb-4">
                  {job.experience} of Experience required
                </p>

                <h2 className="font-semibold">{job.company}</h2>
                <p className="opacity-80">{job.location}</p>
              </div>

              {/* Skills Section */}
              <div className="flex flex-wrap gap-2">
                {job.skills.map((item, idx) => (
                  <span
                    key={idx}
                    className="mr-2 py-1 px-2 bg-slate-700 text-xs border rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons Section */}
              <div>
                {isRecruiter && userData.jobIds.includes(job.id) ? (
                  <button
                    onClick={() => handleDeleteClick(job)}
                    disabled={actionLoading}
                    className={`py-4 px-8 bg-red-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
                      actionLoading && "opacity-30 hover:opacity-40"
                    }`}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyClick(job)}
                    disabled={isRecruiter}
                    className={`py-4 px-8 bg-green-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
                      isRecruiter && "opacity-30 hover:opacity-40"
                    }`}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="my-10 text-lg font-semibold">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default JobsList;
