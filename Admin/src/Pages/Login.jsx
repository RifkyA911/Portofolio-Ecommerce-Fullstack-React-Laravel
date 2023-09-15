import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  //states
  const [auth_key, setAuth_key] = useState("cikidaw");
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
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        // Arahkan pengguna ke halaman utama setelah login berhasil
        navigate("/");
      }
    });
  };

  // Konten komponen
  return (
    <>
      <main className="bg-gradient-to-b  flex w-full static justify-center">
        <div className={`p-4 my-4 h-full shadow-lg flex-shrink-0 duration-300`}>
          <p className="bg-yellow-400 mb-4">Progress Return Wrong Response</p>
          <div className="w-96 bg-gradient-to-b from-violet-400 to-blue-400 rounded-xl shadow-sm text-white font-semibold">
            <h1 className="p-4 text-2xl">Login</h1>
            <form
              action="http://127.0.0.1:8000/api/admins/login"
              method="post"
              className="flex flex-col text-left py-6 justify-center"
              onSubmit={handleLogin}
            >
              <label className="block px-4 mb-2 text-black">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email/Username
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
              <label className="block px-4 mb-8 text-black">
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
              <input type="hidden" name="auth_key" id="" value={auth_key} />
              <button className="flex-none w-48 mx-auto self-center py-2 px-6 text-center bg-blue-500 hover:bg-sky-700 rounded-md">
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
          {error ? (
            <div className="alert alert-error rounded-none">
              <span>{error}</span>
            </div>
          ) : (
            ""
          )}
          <a
            href="/logout"
            className="flex-none w-48 mx-auto self-center py-2 px-6 text-center bg-blue-500 hover:bg-sky-700 rounded-md"
          >
            Logout
          </a>
        </div>
      </main>
    </>
  );
}
export default Login;
