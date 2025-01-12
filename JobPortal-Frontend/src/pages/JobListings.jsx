import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import api from "../api/axiosConfig";
import JobsList from "../components/JobsList";
import JobApplication from "../components/modals/JobApplication";
import Confirmation from "../components/modals/Confirmation";

const JobListings = () => {
  const userData = useSelector((state) => state.auth.userData);

  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [isJobApplicationModalOpen, setIsJobApplicationModalOpen] =
    useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const jobsResponse = await api.get("/api/v1/jobs");
      setJobs(jobsResponse.data);
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  const openApplicationModal = () => {
    setIsJobApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsJobApplicationModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const applyForJob = async (formData) => {
    try {
      const applyResponse = await api.post("/api/v1/applications", formData);

      if (applyResponse.status === 201) {
        closeApplicationModal();

        setConfirmationMessage(
          `Successfully applied to the job: ${selectedJob?.position} at ${selectedJob?.company}`
        );

        openConfirmationModal();
      }
    } catch (error) {
      console.log(error);
      closeApplicationModal();

      setConfirmationMessage(
        "Some error occurred while applying for the job. Kindly try again!"
      );

      openConfirmationModal();
    }
  };

  const deleteJob = async (job) => {
    setActionLoading(true);

    try {
      const deleteResponse = await api.delete(`/api/v1/jobs/${job.id}`);

      if (deleteResponse.status === 204) {
        const removeResponse = await api.post(
          `/api/v1/recruiters/${userData.email}/removejob`,
          job.id
        );

        if (removeResponse.status === 200) {
          setJobs(jobs.filter((item) => item.id !== job.id));

          setConfirmationMessage(
            `Successfully deleted the job: ${job?.position} at ${job?.company}`
          );

          openConfirmationModal();
        }

        setActionLoading(false);
      }
    } catch (error) {
      console.log(error);
      setActionLoading(false);

      setConfirmationMessage(
        "Some error occurred while deleting the job. Kindly try again!"
      );

      openConfirmationModal();
    }
  };

  return (
    <div className="pt-40 px-32">
      {isLoading ? (
        <div>
          <p className="text-white text-lg font-bold">Loading...</p>
        </div>
      ) : jobs.length > 0 ? (
        <JobsList
          actionLoading={actionLoading}
          jobs={jobs}
          onApply={openApplicationModal}
          onDelete={deleteJob}
          setSelectedJob={setSelectedJob}
        />
      ) : (
        <div>
          <p className="text-white text-lg font-bold">
            No available jobs to show! Kindly check later
          </p>
        </div>
      )}

      <JobApplication
        isOpen={isJobApplicationModalOpen}
        onClose={closeApplicationModal}
        job={selectedJob}
        applyForJob={applyForJob}
      />

      <Confirmation
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        message={confirmationMessage}
      />
    </div>
  );
};

export default JobListings;