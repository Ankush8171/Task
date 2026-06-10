
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    id: "",
    user: "",
    email: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8000/api/user/users",
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8000/api/user/delete/${id}`,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };


 const updateUser = async () => {
    try {
      const token =localStorage.getItem("token");
      console.log(token);

      const response = await axios.put(
        `http://localhost:8000/api/user/update/${editUser.id}`,

        {
          user: editUser.user,
          email: editUser.email,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        alert("User Updated Successfully");

        setShowModal(false);

        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };  

  

  const openEditModal = (user) => {
    setEditUser({
      id: user._id,
      user: user.user,
      email: user.email,
    });

    setShowModal(true);
  };


const addUser = () => {
  alert("Add User Clicked");
  navigate("/add-user");
};


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage all registered users from one place
          </p>
        </div>

        <button
          onClick={addUser}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
        >
          <lord-icon
            src="https://cdn.lordicon.com/hqymfzvj.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "24px", height: "24px" }}
          ></lord-icon>

          Add User
        </button>
      </div>
      {/* User Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-blue-50 transition duration-300"
                >
                  <td className="p-4 font-medium text-gray-700">
                    {user.user || user.username}
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      {/* Edit Button */}
                      <button
                         onClick={()=>openEditModal(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg shadow-md transition"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        ></lord-icon>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow-md transition"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        ></lord-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-12 text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/msoeawqm.json"
                      trigger="loop"
                      delay="2000"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    ></lord-icon>

                    <p className="mt-3 text-lg">
                      No Users Found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
              {/* modal */}
  
       {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Edit User
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={editUser.user}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  user: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <input
              type="email"
              placeholder="Email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  email: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateUser}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;