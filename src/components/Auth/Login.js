import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    var u_email = localStorage.getItem("email");
    if (u_email) {
      navigate("/test", { replace: true });
    }
  });

  const loginauth = async (data) => {
    try {
      const url = "http://localhost:4000/users/auth";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        console.log("Looks like there was a problem.", err);
        setLoginMsg(err.msg);
        alert("Incorrect password");
        return;
      } else {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify({ token: data.token }));
        localStorage.setItem("username", data.name);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("email", data.email);
        alert("login successful");
        setTimeout(() => {
          navigate("/test", { replace: true });
        }, 300);

        return <div>Redirecting...</div>;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col w-auto h-screen justify-center items-center font-Montserrat">
      <form
        onSubmit={handleSubmit(loginauth)}
        className="bg-white border-4 border-black p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3"
      >
        <h2 className="text-4xl font-Montserrat font-extrabold">Login.</h2>
        <h2 className="text-lg font-Montserrat font-light mb-4">
          Welcome back to Notenique.
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border-2 border-black p-2 rounded-lg focus:outline-none focus:border-indigo-500"
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
            required
          />
          <label>Show password </label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePassword}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <button
              type="submit"
              className="group mr-2 relative hover:text-blue-400 inline-block text-sm font-medium text-black outline-none active:text-black"
            >
              <span class="absolute  rounded-lg inset-0 translate-x-0 translate-y-0 bg-black outline-none transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
              <span class="relative  rounded-lg block border-2 outline-none border-current bg-white px-8 py-3">
                Login
              </span>
            </button>
            <button className="group relative inline-block text-sm font-medium text-black outline-none active:text-black">
              <Link className="hover:text-red-400" to="/Register">
                <span class="absolute  rounded-lg inset-0 translate-x-0 translate-y-0 bg-black outline-none transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
                <span class="relative  rounded-lg block border-2 outline-none border-current bg-white px-8 py-3">
                  Signup
                </span>
              </Link>
            </button>
          </div>
          <button className="group relative inline-block text-sm font-medium text-black outline-none active:text-black">
            <Link className="hover:text-yellow-400" to="/notenique">
              <span class="absolute  rounded-lg inset-0 translate-x-0 translate-y-0 bg-black outline-none transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5"></span>
              <span class="relative  rounded-lg block border-2 outline-none border-current bg-white px-8 py-3">
                Home
              </span>
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
