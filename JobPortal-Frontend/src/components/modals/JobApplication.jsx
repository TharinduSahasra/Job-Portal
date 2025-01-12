
import { useEffect, useState } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { useSelector } from "react-redux";
import { qualificationOptions, skillOptions } from "../../data/constants";  


const JobApplication = ({ isOpen, onClose, job, applyForJob }) => {
    const userData = useSelector((state) => state.auth.userData);
  
    const [applicationForm, setApplicationForm] = useState({
      jobId: "",
      name: "",
      qualification: "",
      skills: [],
      email: "",
      phone: "",
      resumeLink: "",
    });
  
    useEffect(() => {
      setApplicationForm({
        ...applicationForm,
        name: userData?.name,
        email: userData?.email,
        skills: userData?.skills?.map((item) => ({ value: item, label: item })),
      });
    }, [userData]);
  
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedForm = {
        ...applicationForm,
        jobId: job?.id,
        qualification: applicationForm.qualification?.value,
        skills: applicationForm.skills.map((item) => item.value),
        status: "Pending",
      };
  
      console.log(updatedForm);
      setIsLoading(true);
  
      await applyForJob(updatedForm);
  
      setApplicationForm({
        position: "",
        name: userData?.name,
        qualification: "",
        skills: userData?.skills?.map((item) => ({ value: item, label: item })),
        email: userData?.email,
        phone: "",
        resumeLink: "",
      });
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 h-full w-full flex items-center justify-center">
        <div className="mx-auto p-6 pb-36 md:p-8 lg:p-10 2xl:p-14 mt-40 md:mt-20 w-full overflow-y-auto max-w-72 md:max-w-lg lg:max-w-3xl 2xl:max-w-4xl max-h-[450px] 2xl:max-h-[700px] rounded-lg bg-blue-100 shadow-xl">
          <div className="mb-6 flex gap-6 items-center">
            <h2 className="font-bold text-2xl inline-block">{job?.position}</h2>
            <p className="text-sm opacity-80">
              ({job?.experience} of Experience required)
            </p>
          </div>
  
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{job?.company}</p>
              <p className="opacity-60">{job?.location}</p>
            </div>
  
            <div className="flex flex-wrap gap-2">
              {job?.skills.map((item, idx) => (
                <span
                  key={idx}
                  className="mr-2 py-1 px-2 bg-slate-400 text-xs border rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
  
          <div className="mt-8 mb-16">
            <p>{job?.description}</p>
          </div>
  
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-center">Apply for this job</h2>
  
            <div>
              <h3 className="ml-4 font-medium">Name</h3>
              <input
                type="text"
                value={applicationForm.name}
                readOnly={true}
                className="w-full py-1 px-4 rounded-lg text-black font-semibold bg-white/25"
                required={true}
              />
            </div>
  
            <div>
              <h3 className="ml-4 font-medium">Email</h3>
              <input
                type="email"
                value={applicationForm.email}
                readOnly={true}
                className="w-full py-1 px-4 rounded-lg text-black font-semibold bg-white/25"
                required={true}
              />
            </div>
  
            <div>
              <h3 className="ml-4 font-medium">Phone</h3>
              <input
                type="tel"
                value={applicationForm.phone}
                onChange={(e) =>
                  setApplicationForm({
                    ...applicationForm,
                    phone: e.target.value,
                  })
                }
                placeholder="(e.g. +91 84928 8**2*)"
                className="w-full py-1 px-4 rounded-lg text-black/80"
                required={true}
              />
            </div>
  
            <div>
              <h3 className="ml-4 font-medium">Skills</h3>
              <Creatable
                options={skillOptions}
                isMulti
                value={applicationForm.skills}
                onChange={(selectedOptions) =>
                  setApplicationForm({
                    ...applicationForm,
                    skills: selectedOptions,
                  })
                }
              />
            </div>
  
            <div>
              <h3 className="ml-4 font-medium">Qualification</h3>
              <Select
                options={qualificationOptions}
                value={applicationForm.qualification}
                onChange={(selectedOption) =>
                  setApplicationForm({
                    ...applicationForm,
                    qualification: selectedOption,
                  })
                }
              />
            </div>
  
            <div>
              <h3 className="ml-4 font-medium">Resume Link</h3>
              <input
                type="url"
                value={applicationForm.resumeLink}
                onChange={(e) =>
                  setApplicationForm({
                    ...applicationForm,
                    resumeLink: e.target.value,
                  })
                }
                placeholder="(e.g. https://drive.google.com/file/3232va3)"
                className="w-full py-1 px-4 rounded-lg text-black/80"
                required={true}
              />
            </div>
  
            <button
              type="submit"
              disabled={isLoading}
              className={`py-2 px-4 bg-green-500 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
                isLoading && "opacity-30 hover:opacity-40"
              }`}
            >
              Apply
            </button>
          </form>
  
          <div className="w-full text-center my-4">
            <button
              type="button"
              onClick={onClose}
              className="py-1 px-8 mx-auto border border-red-500 hover:bg-red-500 rounded hover:text-white text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default JobApplication;