
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
 const navigate = useNavigate();   
  const [data, setData] = useState({
    user: "",
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

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        data
      );

      if (response.data.success) {

      localStorage.setItem(
       "token",
      response.data.token
      );

  alert("User Registered Successfully");

  setData({
    user: "",
    email: "",
    password: "",
  });

  navigate("/login");
} else {
        alert(response.data.message);
      }
    } catch(err){
    console.log(err);

    response.json({
        success:false,
        message:"Error"
    })
}
  };


  return (
    <main className="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6">
          <h1 className="text-slate-900 text-center text-2xl font-bold">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">

            {/* Username */}
            <div>
              <label
                htmlFor="user"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
              >
                Username
              </label>

              <input
                type="text"
                id="user"
                name="user"
                value={data.user}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
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
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
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
                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3.5 text-sm rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-sm text-center">
            Already have an account?{" "}
             <Link
             to="/login"
            className="text-blue-600 font-medium"
             >
           Sign In
           </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;