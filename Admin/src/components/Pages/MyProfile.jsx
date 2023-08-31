import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyProfile() {
  const [formData, setFormData] = useState({
    id: 1,
    email: "super.duper@gmail.com",
    username: "Palalo sini gw genjreng",
    password: "superadmin",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admins/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Cek data untuk pemeriksaan
        setUsers(data.users); // Menggunakan data.Users karena 'Users' adalah properti dalam objek
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/admins",
        formData
      );
      console.log("Admin updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <>
      {/* baris-1 */}
      <div className="font-bold justify-center lg:max-h-64">
        <div className="flex flex-wrap lg:flex-nowrap flex-row">
          <div className="flex flex-col lg:flex-row lg:justify-center py-4 lg:py-5 px-3 lg:px-4 w-full ">
            <ul className="flex w-full bg-white">
              <li className="shadow-md w-96">
                <img
                  src="./src/assets/user_avatar/84719630_p1.jpg"
                  className="w-60 h-60 "
                />
              </li>
              <li></li>
            </ul>
            <ul className="flex w-full bg-white">
              <form className="font-base justify-start" onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={formData.id} />
                <label className="block text-left">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </label>
                <label className="block text-left">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Username
                  </span>
                  <input
                    type="username"
                    name="username"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                </label>
                <label className="block text-left">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Username
                  </span>
                  <input
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </label>
                <button className="btn btn-warning mt-4" type="submit">
                  Update Admin
                </button>
              </form>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <ul></ul>
      </div>
    </>
  );
}
