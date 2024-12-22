import { useParams } from "react-router-dom";

const Login = () => {
  const { type } = useParams();

  return (
    <div className="pt-40 px-32">
      <LoginForm userType={type} />
    </div>
  );
};

export default Login;