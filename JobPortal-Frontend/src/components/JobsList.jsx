const JobsList = () =>{

    const jobs=[

        {
            id: 1,
            position: "Data Scientist",
            company: "Google",
            location: "Bengaluru, IN",
            skills: ["Python", "R", "Jupyter Notebook", "MATLAB"],
            experience: "0 - 2 Years",
          },
          {
            id: 2,
            position: "Lead Backend Engineer",
            company: "Spotify",
            location: "Mumbai, IN",
            skills: ["Java", "SpringBoot", "NGINX"],
            experience: "3 - 5 Years",
          },
        ];
        return (
          <div className="text-white">
            <h1 className="text-2xl font-bold">Available Jobs</h1>
            <div className="my-6 flex flex-col gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="my-4 p-4 flex justify-between items-center gap-4 border rounded-lg"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{job.position}</h2>
                    <p className="opacity-80 mb-4">
                      {job.experience} of Experience required
                    </p>
                    <h2 className="font-semibold">{job.company}</h2>
                    <p className="opacity-80">{job.location}</p>
                  </div>
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
                  <div>
                    <button className="py-4 px-8 bg-green-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };
      export default JobsList;
    