import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/user/add",
        {
          user,
          email,
        },
        {
          headers: {
            token,
          },
        }
      );

      console.log(response.data);
       if (response.data.success) {
      alert("User added successfully!");

      navigate("/list");
    }


      setUser("");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      
      <h2 className="text-3xl font-bold text-center mb-6">
        Add User
      </h2>

      <form onSubmit={submitHandler} className="space-y-5">
        
        {/* Username */}
        <div>
          <label
            htmlFor="user"
            className="block mb-2 text-sm font-medium"
          >
            Username
          </label>

          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@gmail.com"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add User
        </button>

      </form>
    </div>
  </div>
);

};

export default AddUser;