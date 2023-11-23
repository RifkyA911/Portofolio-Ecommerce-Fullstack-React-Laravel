import React, { useState, useEffect, createContext } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// Config
import RequestAPI from "../Config/API";
import { getUser } from "../Config/Session";
// Layout
import { Container, Content } from "../Layout";
// Components
import { SkeltonMyProfile } from "../components/Skelton";
import { DangerAlert } from "../components/Alert";
import { FilePictureInput, PasswordInput, TextInput } from "../components/Form";
import { MotionButton } from "../components/Button";
// Utils
import { ReactIcons } from "./../utils/RenderIcons";
import { IsThisAnImage } from "../utils/Solver";

const placeholder_password = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;

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
      pict: "default.png",
    },
  });

  const { id } = getUser();

  const fetchData = async () => {
    try {
      const request = await RequestAPI("admin", "GET", { id: id });
      const response = request.data;
      // console.log(response);
      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setStatusMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let initialFormValue;

  useEffect(() => {
    if (admin) {
      initialFormValue = {
        // PS: ganti nanti ambil dari redux
        // superAuthorizationPassword: SuperAdminKey,
        id: admin.id,
        adminsId: admin.id,
        email: admin.email,
        username: admin.username,
        pict: admin.pict,
        password: placeholder_password,
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
    if (!IsThisAnImage(form.pict)) {
      form.pict = "noChange";
    }
    try {
      const request = await RequestAPI("admins/update", "PUT", form);
      // const response = request.data;
      // console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setStatusMessage(error.message);
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
          <Content pageName="My Profile">
            {loading ? (
              <SkeltonMyProfile />
            ) : (
              <>
                {/* <WarningAlert message="Proceed Forms and Drag Pict" /> */}
                {errors?.adminsId?.message && (
                  <>
                    {console.log(getValues("adminsId"))}
                    <DangerAlert message={errors.adminsId.message} />
                  </>
                )}
                <div
                  className={`${BgColor} ${textColor}  flex flex-wrap lg:flex-nowrap flex-row font-bold justify-center lg:max-h-full py-4`}
                >
                  <form
                    className="font-base w-full"
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
                      <li className="flex flex-col md:w-7/12">
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
                      <li className="relative flex flex-col md:w-5/12 justify-start items-center">
                        <div className="flex flex-col text-left gap-4  divide-slate-700 w-[350px] px-4 lg:px-0">
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
              </>
            )}
          </Content>
        </MyProfileContext.Provider>
      </Container>
    </>
  );
}
