import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { DangerAlert, WarningAlert } from "../components/Alert";
import { useForm } from "react-hook-form";
import { PasswordInput, TextInput } from "../components/Form";
import Tooltips from "../components/Tooltips";
import jwtDecode from "jwt-decode";

const URL_ADMIN = import.meta.env.VITE_API_ALL_ADMIN;
const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;

export const LoginContext = createContext();

function Login() {
  // states
  const [ready, setReady] = useState(true);

  // redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      superAuthorizationPassword: SuperAdminKey,
      pict: "default.png",
    },
  });

  useEffect(() => {
    sessionStorage.clear();
    setValue("email", import.meta.env.VITE_SUPER_ADMIN_EMAIL);
    setValue("password", import.meta.env.VITE_SUPER_ADMIN_PASSWORD);
  }, []);

  const onSubmit = async (form) => {
    // console.log(getValues());
    dispatch(loginUser(getValues())).then((result) => {
      if (result.payload) {
        // console.log("result.payload", result.payload);
        const decodeResult = jwtDecode(result.payload.access_token);
        if (decodeResult) {
          //// JWT ACCESS VALIDATOR
          setValue("email", "");
          setValue("password", "");
          navigate("/"); // temporary view dashborad in <LoginRouter />
          window.location.reload(); // ganti router
        } else {
          navigate("/login"); // temporary view dashborad in <LoginRouter />
          window.location.reload(); // ganti router
        }
      }
    });
  };

  const LoginContextValue = {
    table: "admins",
    data: getValues(),
    ready: ready,
    setReady: setReady,
    //react-hook-form
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  };

  // Konten komponen
  return (
    <>
      <LoginContext.Provider value={LoginContextValue}>
        <main className="bg-gradient-to-b from-violet-400 to-blue-400 w-full h-full min-h-screen static m-auto ">
          <div className="flex w-full h-full justify-center min-h-screen xmin-h-[500px]">
            <div className="p-4 flex-col h-full duration-300 xmt-10 my-[4%]">
              {error ? (
                <DangerAlert className="my-2 p-2" message={`${error}`} />
              ) : (
                <div className="p-[30px]"></div>
              )}
              <div className="m-auto w-96 bg-gradient-to-b from-white to-white rounded-xl relative shadow-sm text-slate-800 font-semibold">
                <div className="header relative">
                  <h1 className="p-4 text-2xl font-semibold">Login</h1>
                  {loading ? (
                    <span className="absolute right-6 top-6 loading loading-dots loading-md"></span>
                  ) : (
                    ""
                  )}
                </div>
                <form
                  method="post"
                  className="flex flex-col text-left px-2 py-6 justify-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="relative flex flex-col gap-4 px-4 h-60">
                    <TextInput
                      className={`flex gap-2 flex-col w-full`}
                      labelClassName={`block text-sm text-gray-700`}
                      inputClassName={`peer mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1`}
                      label="E-mail"
                      name="email"
                      placeholder="Masukkan E-Mail"
                      formContext={LoginContext}
                    />
                    <PasswordInput
                      className={`flex gap-2 flex-col w-full`}
                      labelClassName={`block text-sm text-gray-700`}
                      inputClassName="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      label="Password"
                      name="password"
                      placeholder="Masukkan Password"
                      formContext={LoginContext}
                    />
                    <Tooltips text="Contact Super Admin">
                      <a className="mb-8 link link-info text-xs">
                        Forgot Password?
                      </a>
                    </Tooltips>
                  </div>

                  <button className="btn flex-none w-48 mx-auto self-center py-2 px-6 text-center bg-sky-400 hover:bg-blue-400 transition-colors duration-200 rounded-md">
                    {loading ? (
                      <>
                        Loading
                        <span className="loading loading-dots loading-sm"></span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </LoginContext.Provider>
    </>
  );
}
export default Login;
