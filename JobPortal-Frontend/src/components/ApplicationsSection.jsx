import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axiosConfig";
import CheckIcon from "./Icons/CheckIcon";
import CrossIcon from "./Icons/CrossIcon";

const ApplicationsSection = () => {
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);
  const userData = useSelector((state) => state.auth.userData);

  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const applicationsResponse = await api.get("/api/v1/applications");
        const jobsResponse = await api.get("/api/v1/jobs");
        const applicationsData = applicationsResponse.data;
        const jobsData = jobsResponse.data;

        if (isRecruiter) {
          const recruiterApplications = applicationsData.filter((application) =>
            userData?.jobIds.includes(application.jobId)
          );

          const formattedApplications = recruiterApplications.map(
            (application) => {
              const jobInfo = jobsData.find(
                (job) => job.id === application.jobId
              );
              return {
                ...application,
                position: jobInfo?.position || null,
                company: jobInfo?.company || null,
                location: jobInfo?.location || null,
                resumeLink: application.resumeLink || null,
                candidateEmail: application.email || null,
                candidatePhone: application.phone || null,
                qualification: application.qualification || null,
                skills: application.skills || [],
              };
            }
          );

          setApplications(formattedApplications);
          setPendingApplications(
            formattedApplications.filter((item) => item.status === "Pending")
          );
          setAcceptedApplications(
            formattedApplications.filter((item) => item.status === "Accepted")
          );
          setRejectedApplications(
            formattedApplications.filter((item) => item.status === "Rejected")
          );
        } else {
          const candidateApplications = applicationsData.filter(
            (item) => item.email === userData?.email
          );

          const formattedApplications = candidateApplications.map(
            (application) => {
              const jobInfo = jobsData.find(
                (job) => job.id === application.jobId
              );
              return {
                ...application,
                position: jobInfo?.position || null,
                company: jobInfo?.company || null,
                location: jobInfo?.location || null,
              };
            }
          );

          setApplications(formattedApplications);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [isRecruiter, userData]);

  const handleApplicationAction = async (item, status) => {
    setActionLoading(true);
    try {
      const response = await api.post(
        `/api/v1/applications/${item.id}`,
        status,
        { headers: { "Content-Type": "text/plain" } }
      );

      if (response.status === 200) {
        setPendingApplications((prev) =>
          prev.filter((application) => application.id !== item.id)
        );

        if (status === "Accepted") {
          setAcceptedApplications((prev) => [...prev, { ...item, status }]);
        } else {
          setRejectedApplications((prev) => [...prev, { ...item, status }]);
        }
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const renderApplicationCard = (item, statusActions = false) => (
    <div
      key={item.id}
      className="flex flex-col gap-4 p-6 rounded-lg bg-gray-800 border border-gray-600 shadow-md"
    >
      <div>
        <h3 className="text-lg font-semibold text-white">{item.position}</h3>
        <p className="text-sm text-gray-400">{item.company} - {item.location}</p>
        <p className="text-sm mt-2 text-gray-500">Applied by: {item.name}</p>
        {/* <p className="text-sm text-gray-400">Email: {item.candidateEmail}</p>
        <p className="text-sm text-gray-400">Phone: {item.candidatePhone}</p> */}
        <p className="text-sm text-gray-400">Qualification: {item.qualification}</p>

        {item.skills.length > 0 && (
          <p className="text-sm text-gray-400">Skills: {item.skills.join(", ")}</p>
        )}

        {item.resumeLink && (
          <a
            href={item.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline mt-2 block"
          >
            View Resume
          </a>
        )}
      </div>

      {statusActions ? (
        <div className="flex gap-4">
          <button
            onClick={() => handleApplicationAction(item, "Accepted")}
            disabled={actionLoading}
            className={`py-2 px-6 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition ${
              actionLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            Accept
            <CheckIcon className="ml-2" />
          </button>

          <button
            onClick={() => handleApplicationAction(item, "Rejected")}
            disabled={actionLoading}
            className={`py-2 px-6 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition ${
              actionLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            Reject
            <CrossIcon className="ml-2" />
          </button>
        </div>
      ) : (
        <p
          className={`font-bold ${
            item.status === "Accepted" ? "text-green-400" : "text-red-400"
          }`}
        >
          {item.status}
        </p>
      )}
    </div>
  );

  const renderApplications = (title, applicationsList, showActions = false) => (
    <div className="mt-10">
      <h2 className="text-2xl font-extrabold text-white">{title}</h2>

      <div className="mt-6 flex flex-col gap-6">
        {isLoading ? (
          <p className="text-lg font-medium text-gray-400">Loading...</p>
        ) : applicationsList.length > 0 ? (
          applicationsList.map((item) =>
            renderApplicationCard(item, showActions)
          )
        ) : (
          <p className="text-lg font-medium text-gray-400">
            No applications available.
          </p>
        )}
      </div>
    </div>
  );

  if (isRecruiter) {
    return (
      <div className="my-10">
        {renderApplications("Pending Applications", pendingApplications, true)}
        {acceptedApplications.length > 0 &&
          renderApplications("Accepted Applications", acceptedApplications)}
        {rejectedApplications.length > 0 &&
          renderApplications("Rejected Applications", rejectedApplications)}
      </div>
    );
  }

  return (
    <div className="my-10">
      <h2 className="text-white text-2xl font-bold">Your Applications</h2>

      <div className="p-6 my-6 rounded-lg bg-gray-800 border border-gray-600 shadow-md">
        {renderApplications("All Applications", applications)}
      </div>
    </div>
  );
};

export default ApplicationsSection;
