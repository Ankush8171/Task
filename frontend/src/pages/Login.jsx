import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        data
      );

      console.log(response.data);

      if (response.data.success) {
        alert("Login Successful");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-sm">
          <h1 className="text-2xl font-bold text-center">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium inline-block"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium inline-block"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="********"
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
             to="/signup"
            className="text-blue-600 font-medium"
             >
           Sign up
           </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;