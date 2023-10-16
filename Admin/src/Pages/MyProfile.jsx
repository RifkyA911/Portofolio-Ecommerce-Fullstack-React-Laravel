import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// Layout and Components
import { Container, Content } from "../Layout";
import { Alert, WarningAlert } from "../components/Alert";
import { PasswordInput, TextInput } from "../components/Form";
import { ConfirmButton } from "../components/Button";
// Utils
import { MuiIcon } from "./../utils/RenderIcons";
import { getUser } from "../utils/Session/Admin";
import { updateSession } from "../Redux/Slices/UserSlice";
import { useForm, Controller } from "react-hook-form";
import { SkeltonForm } from "../components/Skelton/SkeltonForm";

const URL_ADMIN = import.meta.env.VITE_API_ALL_ADMIN;
const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;

export const MyProfileContext = createContext();

export default function MyProfile() {
  const [toggleForm, setToggleForm] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [filePath, setFilePath] = useState("./src/assets/admin_avatar/");
  const [formData, setFormData] = useState({
    id: null,
    email: "",
    username: "",
    pict: "",
    newPassword: null,
    newPassword_confirmation: null,
  });
  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );

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
    },
  });

  const userSession = getUser();

  let initialFormValue;
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData, //spread opreator object
      id: userSession.id,
      email: userSession.email,
      username: userSession.username,
      pict: userSession.pict,
    }));
    initialFormValue = {
      // PS: ganti nanti ambil dari redux
      superAuthorizationPassword: SuperAdminKey,
      adminsId: userSession.id,
      email: userSession.email,
      username: userSession.username,
      pict: userSession.pict,
    };
    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
    }
    initialFormValue = null;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  function uploadPicture(e) {
    const file = e.target.files[0];
    setFileUpload(true);
    setFilePath("./../assets/temp/");
    setFormData((prevFormData) => ({
      ...prevFormData, //spread opreator object
      pict: file.name,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(URL_ADMIN, formData);
      console.log("data send successfully:", response.data);
      // dispatch(updateSession(formData.username));
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const MyProfileContextValue = {
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

  return (
    <>
      <Container>
        <MyProfileContext.Provider value={MyProfileContextValue}>
          {!formData.id ? (
            <SkeltonForm />
          ) : (
            <>
              <Content pageName="My Profile">
                <WarningAlert message="Proceed Forms and Drag Pict" />
                <div className="flex flex-wrap lg:flex-nowrap flex-row font-bold justify-center lg:max-h-full py-4">
                  <form
                    className="font-base flex flex-row justify-center p-4 bg-white rounded-xl shadow-sm text-black"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      type="hidden"
                      {...register("adminsId", {
                        required: `not allowed`,
                      })}
                    />
                    <ul className="flex flex-col lg:flex-row lg:justify-center w-full ">
                      <li className="flex flex-col w-96 py-16">
                        <div className="flex-col justify-center items-center form-control w-full ">
                          <img
                            src={`${filePath}${
                              getValues("pict")
                                ? getValues("pict")
                                : "default.png"
                            }`}
                            className="w-60 h-60 rounded-[7rem] shadow-md shadow-slate-400"
                          />
                          <input
                            type="file"
                            name="pict"
                            className="file-input file-input-bordered file-input-md w-64 text-sm mt-6"
                            onChange={uploadPicture}
                          />
                        </div>
                      </li>
                      <div className="divider divider-horizontal"></div>
                      <li className="flex flex-col w-96 justify-center items-center py-10">
                        <div className="flex flex-col gap-4 divide-slate-700 w-[350px] justify-center px-4">
                          <TextInput
                            className={`flex gap-4 flex-col w-full`}
                            label="Email"
                            name="email"
                            placeholder="Masukkan Email"
                            formContext={MyProfileContext}
                          />
                          <TextInput
                            className={`flex gap-4 flex-col w-full`}
                            label="Username"
                            name="username"
                            placeholder="Masukkan Username"
                            formContext={MyProfileContext}
                          />
                          {!toggleForm ? (
                            <>
                              <PasswordInput
                                className={`flex gap-4 flex-col w-full`}
                                label="Password"
                                name="password"
                                placeholder="Masukkan Password"
                                formContext={MyProfileContext}
                              />
                            </>
                          ) : (
                            <>
                              <PasswordInput
                                className={`flex gap-4 flex-col w-full`}
                                label="New Password"
                                name="newPassword"
                                placeholder="Masukkan Password Baru"
                                formContext={MyProfileContext}
                              />
                              <PasswordInput
                                className={`flex gap-4 flex-col w-full`}
                                label="Confirm New Password"
                                name="newPassword_confirmation"
                                placeholder="Confirm Password Baru"
                                formContext={MyProfileContext}
                              />
                            </>
                          )}

                          {/* DDFDFDF */}
                          {/* <div className="hidden">
                                  <label className="mb-4 spr-4 block text-left">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                      Email
                                    </span>
                                    <input
                                      type="email"
                                      name="email"
                                      className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                      value={formData.email}
                                      onChange={handleChange}
                                      placeholder="Email"
                                    />
                                  </label>
                                  <label className="mb-4 spr-4 block text-left">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                      Username
                                    </span>
                                    <input
                                      type="username"
                                      name="username"
                                      className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                      value={formData.username}
                                      onChange={handleChange}
                                      placeholder="Username"
                                    />
                                  </label>
                                  <label className="mb-4 spr-4 block text-left">
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                      Password "superadmin"
                                    </span>
                                    <input
                                      className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                      type="password"
                                      name="password"
                                      onChange={handleChange}
                                      placeholder="Password"
                                    />
                                  </label>
                                  <label className="mb-4 spr-4 block text-left">
                                    <span className="after:content-[''] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-slate-700">
                                      New Password
                                    </span>
                                    <input
                                      className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                      type="password"
                                      name="newPassword"
                                      onChange={handleChange}
                                      placeholder="New Password"
                                    />
                                  </label>
                                  <label className="mb-4 spr-4 block text-left">
                                    <span className="after:content-[''] after:ml-0.5 after:text-blue-500 block text-sm font-medium text-slate-700">
                                      Confirm New Password
                                    </span>
                                    <input
                                      className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                      type="password"
                                      name="newPassword_confirmation"
                                      onChange={handleChange}
                                      placeholder="Confirm New Password"
                                    />
                                  </label>
                                </div> */}
                          <div className="pt-10">
                            <button
                              onClick={() => setToggleForm(!toggleForm)}
                              className="btn transition-all duration-500 bg-gradient-to-tl from-amber-500 via-yellow-500 to-amber-500 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
                              type="submit"
                            >
                              {<MuiIcon iconName="SettingsSuggest" />}
                              New Password
                            </button>
                            <ConfirmButton
                              onClick={() => console.log("s")}
                              confirmType="alter"
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
              </Content>
            </>
          )}
        </MyProfileContext.Provider>
      </Container>
    </>
  );
}
