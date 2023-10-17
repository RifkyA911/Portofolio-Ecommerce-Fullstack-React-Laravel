import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

// REDUX
import { useDispatch, useSelector } from "react-redux";
// Layout and Components
import { Container, Content } from "../Layout";
import {
  Alert,
  DangerAlert,
  SuccessAlert,
  WarningAlert,
} from "../components/Alert";
import { PasswordInput, TextInput } from "../components/Form";
import { ConfirmButton } from "../components/Button";
// Utils
import { MuiIcon } from "./../utils/RenderIcons";
import { getUser } from "../utils/Session/Admin";
import { updateCredentials, updateSession } from "../Redux/Slices/UserSlice";
import { useForm, Controller } from "react-hook-form";
import { SkeltonForm } from "../components/Skelton/SkeltonForm";
import { CropperModal } from "../components/Modal";

const URL_ADMIN = import.meta.env.VITE_API_ALL_ADMIN;
const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;

export const MyProfileContext = createContext();

export default function MyProfile() {
  const [toggleForm, setToggleForm] = useState({
    inputChange: null,
    passwordChange: false,
    btnChange: false,
  });
  const [change, setChange] = useState(null);
  const [fileUpload, setFileUpload] = useState(false);
  const [filePath, setFilePath] = useState("./src/assets/admin_avatar/");
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // REDUX
  const { BgColor, textColor, screenHeigth, screenWidth } = useSelector(
    (state) => state.UI
  );

  const { logged, adminsId, id, email, username, pict } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

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

  const userSession = getUser();

  let initialFormValue;
  useEffect(() => {
    initialFormValue = {
      // PS: ganti nanti ambil dari redux
      superAuthorizationPassword: SuperAdminKey,
      id: id,
      adminsId: adminsId,
      email: email,
      username: username,
      pict: pict,
      password: "superadmin",
      password_confirmation: null,
      newPassword: null,
      newPassword_confirmation: null,
    };
    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
      setLoading(false);
    }
    initialFormValue = null;
    // console.log(getValues());
  }, [statusMessage, errorMessage]);

  useEffect(() => {
    // console.log("sd");
    setToggleForm({ ...toggleForm, btnChange: (toggleForm.btnChange = true) });
  }, [change]);

  useEffect(() => {
    if (toggleForm) {
      setValue("newPassword", null);
      setValue("newPassword_confirmation", null);
    } else {
      setValue("password", null);
    }
  }, [toggleForm.passwordChange]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  function uploadPicture(e) {
    const file = e.target.files[0];
    setFileUpload(true);
    setFilePath("./../assets/temp/");
    setFormData((prevFormData) => ({
      ...prevFormData, //spread opreator object
      pict: file.name,
    }));
  }

  const onSubmit = async (form) => {
    // console.log(form);
    try {
      const response = await axios.put(URL_ADMIN, form);
      setStatusMessage(response.data.message);
      // console.log("data send successfully:", response.data);
      // dispatch(updateSession(formData.username));
    } catch (error) {
      // console.error("Error updating admin:", error);
      setErrorMessage(error.response.data.message);
    }
    // finally {}
    dispatch(updateCredentials({ user: form }));
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
          {loading ? (
            <SkeltonForm />
          ) : (
            <>
              {/* <WarningAlert message="Proceed Forms and Drag Pict" /> */}
              <Content pageName="My Profile">
                {errorMessage && <DangerAlert message={errorMessage} />}
                {statusMessage && <SuccessAlert message={statusMessage} />}
                {/* {console.log(errors.adminsId.message)} */}
                {errors?.adminsId?.message && (
                  <>
                    {console.log(getValues("adminsId"))}
                    <DangerAlert message={errors.adminsId.message} />
                  </>
                )}
                <div className="flex flex-wrap lg:flex-nowrap flex-row font-bold justify-center lg:max-h-full py-4">
                  <form
                    className="font-base flex flex-row justify-center p-4 bg-white rounded-xl shadow-md text-black"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      type="hidden"
                      {...register("adminsId", {
                        required: `adminsId value not exist`,
                      })}
                    />
                    <ul className="flex flex-col lg:flex-row lg:justify-center w-full ">
                      <li className="flex flex-col w-96 py-16">
                        <div className="flex-col justify-center items-center form-control w-full ">
                          <img
                            src={`${filePath}${getValues("pict")}`}
                            className="w-60 h-60 rounded-[7rem] shadow-md shadow-slate-400"
                          />
                          {/* <input
                            type="file"
                            name="pict"
                            className="file-input file-input-bordered file-input-md w-64 text-sm mt-6"
                            onChange={uploadPicture}
                          /> */}
                          <CropperModal />
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
                          {!toggleForm.passwordChange ? (
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
                          <div>
                            <button
                              onClick={() =>
                                setToggleForm({
                                  ...toggleForm, // Menyalin nilai properti yang ada
                                  passwordChange: !toggleForm.passwordChange, // Mengubah properti btnChange
                                })
                              }
                              className={`btn btn-sm outline-none border-none transition-all duration-300
                            ${
                              !toggleForm.passwordChange
                                ? "bg-amber-500 "
                                : "bg-gray-500 "
                            }
                             rounded-lg text-white font-roboto-bold font-bold capitalize`}
                              type="button"
                            >
                              {<MuiIcon iconName="AutorenewRounded" />}
                              {!toggleForm.passwordChange
                                ? "New Password"
                                : "Cancel"}
                            </button>
                          </div>
                          {toggleForm.btnChange && (
                            <div className="pt-10">
                              <ConfirmButton
                                onClick={() => console.log("s")}
                                confirmType="alter"
                              />
                            </div>
                          )}
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
