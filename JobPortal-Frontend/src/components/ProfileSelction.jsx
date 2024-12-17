const ProfileSection = () => {
    const skills = ["Next.js", "React", "Node.js", "Java"];
    const isRecruiter = true;
  const renderSkillsSection = () => (
    <div className="my-3">
      {skills.map((item, idx) => (
        <span
          key={idx}
          className="mr-2 py-1 px-2 bg-slate-700 text-xs border rounded-md"
        >
          {item}
        </span>
      ))}
    </div>
  );
  const renderRecruiterSection = () => (
    <div className="my-3">
      <h3>
        Recruiter @ <span className="font-semibold">Google</span>
        <span className="ml-3 opacity-80 text-sm">Bengaluru, IN</span>
      </h3>
    </div>
  );
    return (
      <div>
        <h1 className="text-white text-2xl font-bold">Your Profile</h1>
        <div className="p-4 my-4 border rounded-lg text-white">
          <div className="flex justify-between font-semibold">
            <h2 className="text-lg">Tharindu Senevirathne</h2>
            <h2 className="opacity-80">test@gmail.com</h2>
          </div>
          {isRecruiter ? renderRecruiterSection() : renderSkillsSection()}
        </div>
      </div>
    );
  };
  export default ProfileSection;