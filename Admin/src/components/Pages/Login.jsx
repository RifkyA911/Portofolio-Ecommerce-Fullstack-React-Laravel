import React, { useState } from "react";

function Login() {
  const [login, setLogin] = useState();

  // Konten komponen
  return (
    <>
      <main className="bg-gradient-to-b  flex w-full static justify-center">
        <div className={`p-4 my-4 h-full shadow-lg flex-shrink-0 duration-300`}>
          <div className="w-96 bg-gradient-to-b from-violet-400 to-blue-400 rounded-xl shadow-sm text-white font-semibold">
            <h1 className="p-4 text-2xl">Login</h1>
            <form
              action="http://127.0.0.1:8000/api/admins/login"
              method="post"
              className="flex flex-col text-left py-6 justify-center"
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
                  value="haha@gmail.com"
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
                  name="pw"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="your password"
                  value="cikidaw"
                />
              </label>
              <input type="hidden" name="auth_key" id="" value="cikidaw" />
              <button className="flex-none w-48 mx-auto self-center py-2 px-6 text-center bg-blue-500 hover:bg-sky-700 rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
export default Login;
