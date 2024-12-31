import { useParams } from "react-router-dom";

const Register = () => {
  const { type } = useParams();

  return (
    <div className="pt-40 px-32">
      {type === "recruiter" ? (
        <RecruiterRegisterForm />
      ) : (
        <CandidateRegisterForm />
      )}
    </div>
  );
};

export default Register;