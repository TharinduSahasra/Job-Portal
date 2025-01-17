import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";

import { addJobIdToRecruiter } from "../store/authSlice";
import api from "../api/axiosConfig";
import { skillOptions } from "../data/constants";

const PostJobForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  useEffect(() => {
    setCompany(userData?.company);
    setLocation(userData?.location);
  }, [userData]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login/recruiter");
    } else if (!isRecruiter) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isRecruiter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const skillsArray = skills.map((item) => item.value);
    const formData = {
      position,
      company,
      location,
      experience,
      description,
      skills: skillsArray,
      salaryRange: `${minSalary} - ${maxSalary} LKR`,
    };

    if (parseInt(minSalary) > parseInt(maxSalary)) {
      setError("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    setIsLoading(true);

    try {
      const jobResponse = await api.post("/api/v1/jobs", formData);

      if (jobResponse.status === 201) {
        const appendResponse = await api.post(
          `/api/v1/recruiters/${userData?.email}/appendjob`,
          { jobId: jobResponse.data.id }
        );

        if (appendResponse.status === 200) {
          dispatch(addJobIdToRecruiter({ jobId: jobResponse.data.id }));

          setIsLoading(false);
          navigate("/jobs");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 mb-24 bg-slate-800 w-full max-w-3xl 2xl:max-w-5xl rounded-lg flex flex-col gap-4 2xl:gap-10 mx-auto"
    >
      <h1 className="text-2xl 2xl:text-4xl font-bold text-white text-center mb-8 2xl:mb-12">
        Post New Job
      </h1>

      {/* Position */}
      <div>
        <input
          type="text"
          placeholder="Position (e.g. Software Engineer)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
      </div>

      {/* Company */}
      <div>
        <input
          type="text"
          value={company}
          readOnly
          className="w-full py-1 px-4 rounded-lg text-black font-semibold bg-white/75"
          required
        />
      </div>

      {/* Location */}
      <div>
        <input
          type="text"
          value={location}
          readOnly
          className="w-full py-1 px-4 rounded-lg text-black font-semibold bg-white/75"
          required
        />
      </div>

      {/* Experience */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Experience Required (e.g. 3+ years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
      </div>

      {/* Salary Range */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min Salary (LKR)"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
        <input
          type="number"
          placeholder="Max Salary (LKR)"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
      </div>

      {/* Description */}
      <div>
        <textarea
          cols="30"
          rows="5"
          placeholder="Job Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-2 px-4 rounded-lg text-black/80 font-medium"
          required
        ></textarea>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg text-white mb-2 font-medium">Skills Required</h3>
        <Creatable
          options={skillOptions}
          isMulti
          value={skills}
          onChange={(selectedOptions) => setSkills(selectedOptions)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-8 py-2 px-4 bg-green-500 hover:opacity-70 rounded-lg text-white text-lg font-bold transition-opacity ${
          isLoading && "opacity-30 hover:opacity-40"
        }`}
      >
        {isLoading ? "Posting..." : "Post Job"}
      </button>

      {/* Error Notification */}
      {error && <p className="text-red-500 text-center text-lg font-black">{error}</p>}
    </form>
  );
};

export default PostJobForm;
