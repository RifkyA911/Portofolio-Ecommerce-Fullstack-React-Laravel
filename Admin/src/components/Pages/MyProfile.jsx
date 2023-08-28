import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Input } from "@mui/material/";
import LinearProgress from "@mui/material/LinearProgress";

export default function MyProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Cek data untuk pemeriksaan
        setUsers(data.users); // Menggunakan data.Users karena 'Users' adalah properti dalam objek
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
              <form action="post" className="font-base justify-start">
                <label className="block text-left">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="you@example.com"
                  />
                </label>
                <input
                  type="checkbox"
                  className="backdrop:w-96 backdrop:outline-0 hover:outline-4 ring-0 outline-0"
                />
              </form>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <table className="table-auto bg-slate-400 p-4 text-left">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>discountPercentage</th>
              <th>rating</th>
              <th>stock</th>
              <th>brand</th>
              <th>category</th>
              <th>Thumbnail</th>
              <th>img</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.slice(0, 1).map((user) => ( */}
            <tr>
              <td key={user.id}></td>
              <td key={user.id}>{user.username}</td>
              <td key={user.id}>{user.email}</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
        <ul></ul>
      </div>
    </>
  );
}
