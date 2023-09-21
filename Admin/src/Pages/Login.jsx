import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { WarningAlert } from "../components/Alert";

function Login() {
  //states
  const [auth_key, setAuth_key] = useState(import.meta.env.VITE_ADMIN_AUTH_KEY);
  const [email, setEmail] = useState("super.duper@gmail.com");
  const [password, setPassword] = useState("superadmin");

  // redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
      auth_key,
    };
    const requestBody = JSON.stringify(userCredentials);

    // fetch("http://127.0.0.1:8000/api/admins/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Mengatur header Content-Type
    //   },
    //   body: requestBody, // Mengatur body dengan data JSON yang telah diubah
    // })
    //   .then((response) => {
    //     console.table(response);

    //     return response.json();
    //   })
    //   .then((data) => {
    //     // Menangani data yang diterima dari respons (jika ada)
    //   })
    //   .catch((error) => {
    //     // Menangani kesalahan jika permintaan gagal
    //     console.error("Error:", error);
    //   });

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        // Arahkan pengguna ke halaman utama setelah login berhasil dan refresh
        navigate("/"); // temporary view dashborad in <LoginRouter />
        window.location.reload();
      }
    });
  };

  // Konten komponen
  return (
    <>
      <main className="bg-gradient-to-b from-violet-400 to-blue-400 w-full h-full min-h-screen static mx-auto ">
        <div className="flex w-full h-full justify-center min-h-[500px]">
          <div className="p-4 flex-col h-full duration-300 mt-10">
            <WarningAlert message="Progressing JWT AUTH TOKEN" />
            <div className="w-96 bg-gradient-to-b from-white to-white rounded-xl relative shadow-sm text-slate-800 font-semibold">
              <h1 className="p-4 text-2xl font-semibold">Login</h1>
              <form
                action="http://127.0.0.1:8000/api/admins/login"
                method="post"
                className="flex flex-col text-left py-6 justify-center"
                onSubmit={handleLogin}
              >
                <label className="block px-4 mb-2 text-black">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="peer mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
                <label className="block px-4 mb-2 text-black">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <a className="px-4 mb-8 link link-info text-xs">
                  Forgot Password?
                </a>
                <button className="flex-none w-48 mx-auto self-center py-2 px-6 text-center bg-sky-400 hover:bg-blue-400 transition-colors duration-200 rounded-md">
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
              {error ? (
                <div className="p-1 bg-red-400 text-center font-semibold rounded-b-xl">
                  <span>{error}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Login;
