import React, { useState } from "react";
import toastService from "../utils/toastService";
const { showSuccess, showError } = toastService;
const defaultAvatar = "../../public/assets/defaultAvatar.jpeg";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    accepted: "",
    avatar: null,
  });
  const { name, username, accepted, avatar } = form;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarUpload = async (e) => {
    return new Promise((res, rej) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setForm((prev) => ({ ...prev, avatar: reader.result }));
        res();
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && username && accepted) {
      showSuccess(`Login successfull ! Welcome, ${name.split(" ")[0]}`, {
        autoClose: 2000,
      });
      setUser({
        name,
        username,
        avatar: avatar ? avatar : defaultAvatar,
      });
    } else {
      showError("Please fill in all fields and accept the terms.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className=" bg-gray-800 p-6 rounded-lg shadow-md w-full space-y-4"
      >
        <h1 className=" text-2xl font-bold text-center">Login</h1>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            value={form.name}
            onChange={handleChange}
            type="text"
            name="name"
            className=" w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masoud Naderi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
            className=" w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="masoudnaderi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Choose Avatar
          </label>
          <div className="flex space-x-2 mb-2">
            {/* Choose between 2 default avatar */}
          </div>
        </div>

        <div>
          <label
            htmlFor="avatar"
            className=" inline-block bg-blue-600 text-white outline outline-blue-600 hover:text-white hover:bg-blue-700 transition-all px-4 py-2 rounded-sm cursor-pointer"
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>

        <div className="flex items-center">
          <input
            value={form.accepted}
            onChange={handleChange}
            type="checkbox"
            name="accepted"
            id="accepted"
            className=" mr-2 cursor-pointer"
          />
          <label className="text-sm cursor-pointer" htmlFor="accepted">
            I agree to the{" "}
            <span className=" text-blue-400 underline">
              terms and conditions
            </span>
            .
          </label>
        </div>

        <button
          type="submit"
          className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Login;
