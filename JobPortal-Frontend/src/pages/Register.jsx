import { useParams } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
const Register = () => {
  const { type } = useParams();

  return (
    <div className="pt-40 px-32">
      <RegisterForm />
    </div>
  );
};

export default Register;