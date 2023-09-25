import React, { useState, useEffect } from "react";
import axios from "axios";
// Layout and Components
import { Container, Content } from "../Layout";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSidebar } from "../Redux/Slices/NavigationSlice";

// Utils
import { getMuiIcon } from "./../utils/RenderIcons";
import { getUser } from "../utils/Session/Admin";
import { getCurrentEndpoint } from "./../utils/Navigation";
import { updateSession } from "../Redux/Slices/UserSlice";

export default function MyProfile() {
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

  const dispatch = useDispatch();
  dispatch(setCurrentSidebar(getCurrentEndpoint()));
  const userSession = getUser();

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData, //spread opreator object
      id: userSession.id,
      email: userSession.email,
      username: userSession.username,
      pict: userSession.pict,
    }));
  }, []);
  // console.log(formData); // Ini mungkin akan menunjukkan perubahan pada state, tetapi mungkin juga belum terpantau perubahannya.

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
      console.log("data send successfully:", response.data);
      // dispatch(updateSession(formData.username));
    } catch (error) {
      console.error("Error updating admin:", error);
    }
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

  return (
    <>
      <Container>
        {!formData.id ? (
          <div>
            <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <span>loading....</span>
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Content pageName="My Profile">
            <div className="MyProfile">
              <span className="bg-red-400">NUNGGU FIX VALIDATOR</span>
              <div className="font-bold justify-center lg:max-h-full">
                <div className="flex flex-wrap lg:flex-nowrap flex-row py-4">
                  <div className="flex flex-wrap w-full justify-center items-center">
                    <form
                      className="font-base flex flex-row justify-center p-4 bg-white rounded-xl shadow-sm text-black"
                      onSubmit={handleSubmit}
                    >
                      <ul className="flex flex-col lg:flex-row lg:justify-center w-full ">
                        <li className="flex flex-col w-96 py-16">
                          <div className="flex-col justify-center items-center form-control w-full ">
                            <img
                              src={`${filePath}${formData.pict}`}
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
                          <div className="flex flex-col divide-slate-700 w-[350px] justify-center px-4">
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
                            <input
                              type="hidden"
                              name="id"
                              value={formData.id}
                            />
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
                            <div className="pt-10">
                              <button
                                className="btn btn-warning font-bold outline-none border-none w-full"
                                type="submit"
                              >
                                {getMuiIcon("SettingsSuggest")}
                                Update Profile
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="flex flex-col"></li>
                      </ul>
                    </form>
                  </div>
                </div>
              </div>
              <div>
                <ul></ul>
              </div>
            </div>
          </Content>
        )}
      </Container>
    </>
  );
}
