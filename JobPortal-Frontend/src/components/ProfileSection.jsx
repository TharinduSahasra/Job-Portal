import { useSelector } from "react-redux";

const ProfileSection = () => {
  const userData = useSelector((state) => state.auth.userData);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);

  const renderSkillsSection = () => (
    <div className="flex flex-wrap gap-3 mt-4">
      {userData.skills?.map((item, idx) => (
        <span
          key={idx}
          className="py-1 px-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-xs text-white rounded-full shadow-md"
        >
          {item}
        </span>
      ))}
    </div>
  );

  const renderRecruiterSection = () => (
    <div className="mt-4">
      <h3 className="text-xl font-medium text-white">
        Recruiter @ <span className="font-semibold text-purple-300">{userData.company}</span>
      </h3>
      <p className="text-sm opacity-80">{userData.location}</p>
    </div>
  );

  if (!userData) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-white text-3xl font-extrabold mb-6">Your Profile</h1>

      <div className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        {/* User Info */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="opacity-80 text-lg">{userData.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${userData.name}&background=6b7280&color=fff`}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Conditional Section */}
        {isRecruiter ? renderRecruiterSection() : renderSkillsSection()}
      </div>
    </div>
  );
};

export default ProfileSection;
