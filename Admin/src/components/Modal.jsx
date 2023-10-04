import React, { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
// Components
// UTILS
import axios from "axios";
import { MuiIcon } from "../utils/RenderIcons";
import { DangerAlert } from "./Alert";
export const Modal = (props) => {
  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);
  return (
    <>
      <div>
        <div className="list-modal">
          <dialog id="ShowPict" className={`${textColor} modal `}>
            <div
              className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden`}
            >
              <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg ">This Admin Name</h3>
                <img
                  src="./src/assets/user_avatar/78949689_p3.jpg"
                  alt="Admin\src\assets\user_avatar\78949689_p6.jpg"
                  className="min-w-[470px] min-h-[470px] max-w-[470px] max-h-[470px] overflow-hidden"
                />
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="TipsGrantAccess" className={`${textColor} modal `}>
            <div
              className={`modal-box ${BgColor} max-w-[350px] max-h-[600px] overflow-hidden`}
            >
              <p className="font-roboto-bold pb-8">Toggle's Colors Guide</p>
              <div className="admins-tooltips text-black lg:flex-row flex flex-col justify-center lg:border-0 border-t-2 border-slate-500 bg-slate-50 rounded-xl">
                <span className="lg:border-r-2 lg:border-slate-500 lg:pr-2 text-xs font-roboto-bold">
                  <i className="text-info text-xs ">
                    {
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    }
                  </i>{" "}
                  Chat
                </span>
                <span className="lg:border-r-2 lg:border-slate-500 lg:px-2 text-xs font-roboto-bold">
                  <i className="text-success text-xs ">
                    {
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    }
                  </i>{" "}
                  Sort Warehouse
                </span>
                <span className="lg:pl-2 text-xs font-roboto-bold">
                  {" "}
                  <i className="text-warning text-xs ">
                    {
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    }
                  </i>{" "}
                  Alter Price
                </span>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </>
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ActionModalForm = (props) => {
  const { refresh, table, table_id, formType } = props;
  const [method, setMethod] = useState(null);
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [onWorking, setOnWorking] = useState(true);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useId();

  let URL;
  let URL_METHODS;
  if (table == "admins") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_ADMIN + "/" + table_id;
    URL_METHODS = import.meta.env.VITE_API_URL_PUT_ADMIN;
  } else if (table == "invoices") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_TRANSACTION + "/" + table_id;
  }

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (
      formType === "ALTER_BY_ID" ||
      formType === "DROP_BY_ID" ||
      formType === "DROP_BY_SELECTED"
    ) {
      if (table_id !== "") {
        axios
          .get(URL)
          .then((response) => {
            // console.table("fetching:", URL);
            setData({
              authority: "superAdmin",
              id: response.data.data.id,
              email: response.data.data.email,
              username: response.data.data.username,
              pict: response.data.data.pict,
              role: response.data.data.role,
              created_at: response.data.data.created_at,
              updated_at: response.data.data.updated_at,
            });
            setLoading(false);
            setErrorMessage(null);
            setMethod(formType);
          })

          .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrorMessage(error);
          });
      } else {
        setOnWorking(false);
        setLoading(false);
        setErrorMessage("invalid formType");
      }
    } else if (formType === "INSERT") {
      setData({
        authority: "superAdmin",
        email: "",
        username: "",
        role: "1",
        pict: "default.png",
        password: "",
        password_confirmation: "",
      });
    } else {
      setLoading(false); // Jika table_id null, atur loading menjadi false tanpa menjalankan Axios.
    }
  }, [table_id]); // Gunakan table_id sebagai dependency untuk useEffect.

  let modalWith;
  let initialFormValue;
  let password = useRef({});
  useEffect(() => {
    if (formType === "INSERT") {
      password.current = watch("password", "");

      initialFormValue = {
        authority: "superAdmin",
        adminsId: "",
        email: "",
        username: "",
        role: "1",
        pict: "default.png",
        password: "",
        password_confirmation: "",
      };
    } else if (formType === "ALTER_BY_ID") {
      password.current = watch("newPassword", "");

      initialFormValue = {
        authority: "superAdmin",
        adminsId: data.id,
        email: data.email,
        username: data.username,
        role: data.role,
        pict: data.pict,
        newPassword: "123456",
        newPassword_confirmation: "123456",
      };
    }
    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
    }
  }, [data]);
  // console.table(data);

  async function sendDataByMethod(form) {
    setSending(!sending);
    let response;
    // Lanjutkan dengan pengiriman data jika cocok
    try {
      if (formType === "INSERT") {
        response = await axios.post(URL_METHODS, data);
      } else if (formType === "ALTER_BY_ID") {
        response = await axios.put(URL_METHODS, data);
      } else if (formType === "DROP_BY_BY_ID") {
        response = await axios.delete(URL_METHODS, data);
      } else if (formType === "DROP_BY_SELECTED") {
        response = await axios.delete(URL_METHODS, data);
      }
      console.log("Data berhasil dikirim:", response.data);
      setSending(false);
      setErrorMessage(null);
      setLoading(false);
      setOnWorking(false);
      setData([]);
      refresh();
    } catch (error) {
      setSending(false);
      setErrorMessage(error.message);
      alert(JSON.stringify(error.response.data.data));
      console.error("Terjadi kesalahan:", error);
    }
  }

  const onSubmit = async (data) => {
    // alert("otw-sent data");
    // Lakukan validasi di sini jika diperlukan
    if (!data) {
      alert("there is no data to send");
    }
    if (formType === "INSERT") {
      if (data.password !== data.password_confirmation) {
        setError("password", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
    } else if (formType === "ALTER_BY_ID") {
      if (data.newPassword !== data.newPassword_confirmation) {
        setError("newPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
    }

    await sendDataByMethod(data);
  };

  return (
    <>
      <dialog id="AdminForm" className="modal">
        <div
          className={`modal-box h-auto w-12/12 ${
            formType === "ALTER_BY_ID" || formType === "INSERT"
              ? "max-w-6xl"
              : "max-w-3xl"
          } bg-gray-50 overflow-y-scroll cursor-auto`}
        >
          <form method="dialog">
            <button
              // onClick={refresh}
              onClick={() => setData([])}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="flex flex-row justify-between items-center gap-2 pr-8">
            <h3 className="font-bold text-lg p-0 text-left w-3/12">
              {formType === "INSERT" && `Add New Admin`}
              {formType === "ALTER_BY_ID" && `Edit Data Admin`}
              {formType === "DROP_BY_ID" && `Delete This Admin`}
              {formType === "DROP_BY_SELECTED" && `Delete Multiple Admin`}
            </h3>
            {errorMessage && (
              <>
                <h4
                  key={id}
                  className={`p-1 font-roboto-bold w-9/12 text-red-800 bg-red-300 rounded-md max-h-[28px] overflow-scroll`}
                >
                  {Object.keys(errors).map((fieldName) => (
                    <DangerAlert
                      key={fieldName}
                      message={errors[fieldName].message}
                      className={`p-2 font-roboto-bold`}
                    ></DangerAlert>
                  ))}
                  {errorMessage}
                </h4>
              </>
            )}
            {sending && (
              <span className="loading loading-dots loading-md"></span>
            )}
          </div>
          <div className="content">
            {!loading ? (
              <>
                {onWorking ? (
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    {(formType === "ALTER_BY_ID" || formType === "INSERT") && (
                      <>
                        <div className="flex flex-row">
                          <div>
                            <input
                              type="hidden"
                              {...register("authority", {
                                required:
                                  "Your Credentials Authority are required",
                                value: "superAdmin",
                              })}
                            />
                            <input
                              type="hidden"
                              {...register("adminsId", {
                                required:
                                  "This Admin Credentials ID are required",
                              })}
                            />
                          </div>

                          {/* Images */}
                          <div className="flex justify-center items-center w-6/12 p-12">
                            <img
                              src={
                                data.pict
                                  ? `./src/assets/admin_avatar/${data.pict}`
                                  : `./src/assets/admin_avatar/blank.jpg`
                              }
                              alt="Avatar Tailwind CSS Component"
                              className="w-96 rounded-full max-w-3xl shadow-lg"
                              loading="lazy"
                            />
                          </div>
                          {/* Form */}
                          <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium">
                            {formType === "INSERT" && (
                              <>
                                <label
                                  htmlFor="email"
                                  className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
                                >
                                  Email
                                  {errors.email && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.email.message}
                                    </span>
                                  )}
                                </label>
                                <input
                                  type="email"
                                  placeholder="Email"
                                  autoComplete={data.email}
                                  className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                  // disabled
                                  {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                    message: "Invalid email",
                                  })}
                                  onChange={(e) => {
                                    setValue("email", e.target.value);
                                    setData((prevData) => ({
                                      ...prevData,
                                      email: e.target.value,
                                    }));
                                  }}
                                  // value={data.email} <- error
                                />
                                {/* Password */}
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  New Password
                                  {errors.password && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.password.message}
                                    </span>
                                  )}
                                </label>
                                <div className="relative w-full">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                    {...register("password", {
                                      required: "New Password is required",
                                      minLength: {
                                        value: 6,
                                        message:
                                          "New Password must be at least 6 characters",
                                      },
                                    })}
                                  />

                                  <span
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute bg-transparent w-4 right-[20px] bottom-[8px] cursor-pointer"
                                  >
                                    <MuiIcon
                                      iconName={
                                        showPassword
                                          ? "VisibilityRounded"
                                          : "VisibilityOffRounded"
                                      }
                                    />
                                  </span>
                                </div>
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Confirm New Password
                                  {errors.password_confirmation && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.password_confirmation.message}
                                    </span>
                                  )}
                                </label>
                                <div className="relative w-full">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                    {...register("password_confirmation", {
                                      required: "Confirm Password is required",
                                      validate: (value) =>
                                        value === password.current ||
                                        "Passwords do not match",
                                    })}
                                  />
                                  <span
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
                                  >
                                    <MuiIcon
                                      iconName={
                                        showPassword
                                          ? "VisibilityRounded"
                                          : "VisibilityOffRounded"
                                      }
                                    />
                                  </span>
                                </div>
                              </>
                            )}
                            {formType === "ALTER_BY_ID" && (
                              <>
                                <label
                                  htmlFor="email"
                                  className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
                                >
                                  Email
                                  {errors.email && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.email.message}
                                    </span>
                                  )}
                                </label>
                                <input
                                  type="email"
                                  placeholder="Email"
                                  autoComplete={data.email}
                                  className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                  // disabled
                                  {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                    message: "Invalid email",
                                  })}
                                  onChange={(e) => {
                                    setValue("email", e.target.value);
                                    setData((prevData) => ({
                                      ...prevData,
                                      email: e.target.value,
                                    }));
                                  }}
                                  // value={data.email} <- error
                                />
                                {/* Username */}
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Username
                                  {errors.username && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.username.message}
                                    </span>
                                  )}
                                </label>
                                <input
                                  type="username"
                                  placeholder="Username"
                                  autoComplete={data.username}
                                  className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                  {...register("username", {
                                    required: true,
                                    maxLength: 80,
                                  })}
                                  onChange={(e) => {
                                    setValue("username", e.target.value);
                                    setData((prevData) => ({
                                      ...prevData,
                                      username: e.target.value,
                                    }));
                                  }}
                                  //value={data.username} <- error
                                />
                                {/* Role */}
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Role
                                  {errors.role && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.role.message}
                                    </span>
                                  )}
                                </label>
                                <Controller
                                  name="role"
                                  control={control}
                                  defaultValue="1" // Nilai default jika perlu
                                  render={({ field }) => (
                                    <select
                                      onChange={(e) => {
                                        field.onChange(e); // Menggunakan field.onChange untuk mengatur nilai di dalam Controller
                                        setData((prevData) => ({
                                          ...prevData,
                                          role: e.target.value,
                                        }));
                                        alert(
                                          "be carefull changing role grant access",
                                          e.target.value
                                        ); // Menggunakan e.target.value karena field.value mungkin belum diperbarui
                                      }}
                                      className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
                                      value={field.value} // Menggunakan field.value untuk nilai saat ini
                                    >
                                      <option value="1">Admin</option>
                                      <option value="0">Super Admin</option>
                                    </select>
                                  )}
                                />
                                {/* Password */}
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  New Password
                                  {errors.newPassword && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.newPassword.message}
                                    </span>
                                  )}
                                </label>
                                <div className="relative w-full">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                    {...register("newPassword", {
                                      required: "New Password is required",
                                      minLength: {
                                        value: 6,
                                        message:
                                          "New Password must be at least 6 characters",
                                      },
                                    })}
                                  />

                                  <span
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute bg-transparent w-4 right-[20px] bottom-[8px] cursor-pointer"
                                  >
                                    <MuiIcon
                                      iconName={
                                        showPassword
                                          ? "VisibilityRounded"
                                          : "VisibilityOffRounded"
                                      }
                                    />
                                  </span>
                                </div>
                                <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Confirm New Password
                                  {errors.newPassword_confirmation && (
                                    <span className="absolute right-0 text-red-500">
                                      {errors.newPassword_confirmation.message}
                                    </span>
                                  )}
                                </label>
                                <div className="relative w-full">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                                    {...register("newPassword_confirmation", {
                                      required: "Confirm Password is required",
                                      validate: (value) =>
                                        value === password.current ||
                                        "Passwords do not match",
                                    })}
                                  />
                                  <span
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
                                  >
                                    <MuiIcon
                                      iconName={
                                        showPassword
                                          ? "VisibilityRounded"
                                          : "VisibilityOffRounded"
                                      }
                                    />
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="py-2 shadow-inner shadow-slate-50 bg-slate-100">
                          <button
                            type="submit"
                            // onClick={handleSubmit(onSubmit)}
                            className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
                          >
                            <MuiIcon iconName="EditRounded" /> Save Changes
                          </button>
                        </div>
                      </>
                    )}
                    {(formType === "DROP_BY_ID" ||
                      formType === "DROP_BY_SELECTED") && (
                      <div>
                        <span className="loading loading-spinner text-primary"></span>
                        <span className="loading loading-spinner text-secondary"></span>
                        <span className="loading loading-spinner text-accent"></span>
                        <span className="loading loading-spinner text-neutral"></span>
                        <span className="loading loading-spinner text-info"></span>
                        <span className="loading loading-spinner text-success"></span>
                        <span className="loading loading-spinner text-warning"></span>
                        <span className="loading loading-spinner text-error"></span>
                        <h1 className="text-lg">
                          Are you sure to delete{" "}
                          <span className="font-bold">"Focalors"</span> ?{" "}
                        </h1>
                        <div className="flex gap-12 py-2 justify-center shadow-inner shadow-slate-50 bg-slate-100">
                          <button
                            type="submit"
                            // onClick={handleSubmit(onSubmit)}
                            className="btn bg-gradient-to-tr hover:from-red-500 hover:to-pink-500 transition-all duration-500 from-red-300 to-rose-400 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
                          >
                            <MuiIcon iconName="DeleteForeverRounded" /> Delete
                          </button>
                          <button
                            type="submit"
                            // onClick={handleSubmit(onSubmit)}
                            className="btn bg-gradient-to-tr hover:from-amber-500 hover:to-orange-400 transition-all duration-500 from-amber-400 to-orange-300 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
                          >
                            <MuiIcon iconName="ClearRounded" /> Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <>
                    <h1 className="font-roboto-bold py-8 text-xl">
                      Modal Logic Error !
                    </h1>
                  </>
                )}
                {/* end of onWorking */}
              </>
            ) : (
              <p>Loading...</p>
            )}
            {/* end of loading */}
          </div>
        </div>
      </dialog>
    </>
  );
};
