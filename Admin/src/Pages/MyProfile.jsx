import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// Layout and Components
import { Container, Content } from "../Layout";
import { DangerAlert, SuccessAlert } from "../components/Alert";
import { FilePictureInput, PasswordInput, TextInput } from "../components/Form";
import { MotionButton } from "../components/Button";
// Utils
import { ReactIcons } from "./../utils/RenderIcons";
import { getAccessToken, getUser, refreshAccessToken } from "../Config/Session";
import { updateCredentials } from "../Redux/Slices/UserSlice";
import { useForm } from "react-hook-form";
import { SkeltonForm } from "../components/Skelton/SkeltonForm";
import { debounce } from "lodash";
import { refreshToken } from "../Redux/Slices/RefreshSlice";
import RequestAPI from "../Config/API";
import { IsThisAnImage } from "../utils/Solver";

const URL_ADMIN = import.meta.env.VITE_API_ALL_ADMINS;
const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;

export const MyProfileContext = createContext();

export default function MyProfile() {
  const [ready, setReady] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [toggleForm, setToggleForm] = useState({
    inputChange: null,
    passwordChange: false,
    btnChange: false,
  });
  const [change, setChange] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
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
      pict: "default.png",
    },
  });

  const { id } = getUser();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/" + id, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setAdmin(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  let initialFormValue;

  useEffect(() => {
    if (admin) {
      initialFormValue = {
        // PS: ganti nanti ambil dari redux
        superAuthorizationPassword: SuperAdminKey,
        id: admin.id,
        adminsId: admin.id,
        email: admin.email,
        username: admin.username,
        pict: admin.pict,
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
    }
  }, [admin, statusMessage, errorMessage]);

  useEffect(() => {
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

  const onSubmit = async (form) => {
    // console.log(form);
    try {
      let access_token = getAccessToken();
      if (!IsThisAnImage(form.pict)) {
        form.pict = "noChange";
      }
      // console.log(access_token);
      const response = await axios.put(URL_ADMIN, {
        ...form,
        token: access_token,
      });
      // console.log(response);
      // setStatusMessage(response.data.message);
      refreshAccessToken();
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  // const debouncedOnChange = debounce(, 1000);

  const MyProfileContextValue = {
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
                {errors?.adminsId?.message && (
                  <>
                    {console.log(getValues("adminsId"))}
                    <DangerAlert message={errors.adminsId.message} />
                  </>
                )}
                <div className="flex flex-wrap lg:flex-nowrap flex-row font-bold justify-center lg:max-h-full py-4">
                  <form
                    className="font-base w-full text-black"
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
                      <li className="flex flex-col md:w-1/2">
                        <div className="flex-col justify-start items-center form-control w-full">
                          <FilePictureInput
                            formContext={MyProfileContext}
                            type="picture"
                            label="Product Picture"
                            name="pict"
                          />
                        </div>
                      </li>
                      <div className="divider divider-horizontal"></div>
                      <li className="relative flex flex-col md:w-1/2justify-start items-center">
                        <div className="flex flex-col gap-4 divide-slate-700 w-[350px] px-4 lg:px-0">
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
                          <div className="relative flex flex-col gap-4 min-h-[280px]">
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
                            <div className="absolute top-0 right-0">
                              <MotionButton
                                type="button"
                                onClick={() =>
                                  setToggleForm({
                                    ...toggleForm, // Menyalin nilai properti yang ada
                                    passwordChange: !toggleForm.passwordChange, // Mengubah properti btnChange
                                  })
                                }
                                className={`outline-none border-none transition-all duration-300
                            ${
                              !toggleForm.passwordChange
                                ? "bg-amber-500 "
                                : "bg-gray-500 "
                            }
                             rounded-md text-white`}
                                icon="BiRefresh"
                                disabled={!ready}
                              >
                                <ReactIcons
                                  iconName="BiRefresh"
                                  fontSize={24}
                                />
                              </MotionButton>
                            </div>
                          </div>

                          {toggleForm.btnChange && (
                            <MotionButton formType="alter" disabled={!ready} />
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
