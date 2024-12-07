const ApplicationsSection = () => {
    const applications = [
      {
        id: 1,
        position: "SWE - II",
        company: "Google",
        location: "Bengaluru, IN",
        status: "Pending",
      },
      {
        id: 2,
        position: "Tech Lead",
        company: "Zomato",
        location: "Pune, IN",
        status: "Interview Scheduled",
      },
    ];
    return (
      <div>
        <h1 className="text-white text-2xl font-bold">Your Applications</h1>
        <div className="p-4 my-4 border rounded-lg text-white">
          <div className="flex flex-col gap-2 divide-y divide-white/40">
            {applications.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3 px-4"
              >
                <div>
                  <p className="font-semibold">{item.position}</p>
                  <p>
                    {item.company}
                    <span className="ml-4 text-sm opacity-80">
                      @ {item.location}
                    </span>
                  </p>
                </div>
                <div>
                  <p>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  export default ApplicationsSection;