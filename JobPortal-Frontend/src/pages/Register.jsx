import { useParams } from "react-router-dom";

import RecruiterRegisterForm from "../components/Auth/RecruiterRegisterForm";
import CandidateRegisterForm from "../components/Auth/CandidateRegisterForm";
import AdminRegisterForm from "../components/Auth/AdminRegisterForm"; // New Admin Register Form

const Register = () => {
  const { type } = useParams();

  return (
    <div className="pt-40 px-32">
      {type === "recruiter" ? (
        <RecruiterRegisterForm />
      ) : type === "admin" ? (
        <AdminRegisterForm />
      ) : (
        <CandidateRegisterForm />
      )}
    </div>
  );
};

export default Register;
