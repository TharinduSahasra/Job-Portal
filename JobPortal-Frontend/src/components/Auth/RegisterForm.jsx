import { useState } from "react";


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, password };
    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 mb-24 bg-slate-700 w-full max-w-md 2xl:max-w-xl rounded-lg flex flex-col gap-4 2xl:gap-10 mx-auto"
    >
      <h1 className="text-3xl 2xl:text-5xl font-bold text-white text-center mb-8 2xl:mb-12">
        Register
      </h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required={true}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required={true}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required={true}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold ${
            password === confirmPassword
              ? "border-green-500 outline-green-500"
              : confirmPassword && "border-red-500 outline-red-500"
          }`}
          required={true}
        />
      </div>
      <button
        type="submit"
        disabled={
          !name ||
          !email ||
          !password ||
          !confirmPassword ||
          password !== confirmPassword
        }
        className={`py-2 px-4 my-10 bg-green-500 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
          (!name ||
            !email ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword) &&
          "opacity-30 hover:opacity-40"
        }`}
      >
        Register
      </button>
    </form>
  );
};
export default RegisterForm;