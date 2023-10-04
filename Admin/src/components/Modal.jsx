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
          <dialog id="AddAdmin" className={`${textColor} modal`}>
            <div className={`modal-box ${BgColor}`}>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Add Admin</h3>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </div>
          </dialog>
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
                  Sort
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
                  Price
                </span>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="ConfirmDelete" className={`${textColor} modal `}>
            <div
              className={`modal-box ${BgColor} max-w-[350px] max-h-[600px] overflow-hidden`}
            >
              <div className="admins-tooltips text-black lg:flex-row flex flex-col justify-center lg:border-0 border-t-2 border-slate-500 bg-slate-50 rounded-xl">
                <span className="lg:border-r-2 lg:border-slate-500 lg:pr-2 text-xs font-roboto-bold">
                  <i className="text-error text-xs ">
                    {
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    }
                  </i>{" "}
                  Are You Sure Want Delete This Account ?
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
  const { refresh, table, table_id, form } = props;
  const [method, setMethod] = useState(null);
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [onWorking, setOnWorking] = useState(true);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useId();

  let URL;
  let URL_ALTER;
  if (table == "admins") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_ADMIN + "/" + table_id;
    URL_ALTER = import.meta.env.VITE_API_URL_PUT_ADMIN;
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
  //   {
  //   defaultValues: {
  //     example: "",
  //     exampleRequired: "",
  //   },
  // }
  const password = useRef({});
  password.current = watch("newPassword", "");

  useEffect(() => {
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
        })

        .catch((error) => {
          console.log(error);
          setLoading(false);
          setErrorMessage(error);
        });
    } else {
      setLoading(false); // Jika table_id null, atur loading menjadi false tanpa menjalankan Axios.
    }
  }, [table_id]); // Gunakan table_id sebagai dependency untuk useEffect.

  useEffect(() => {
    const initialFormValue = {
      authority: "superAdmin",
      adminsId: data.id,
      email: data.email,
      username: data.username,
      role: data.role,
      pict: data.pict,
      newPassword: "123456",
      newPassword_confirmation: "123456",
    };

    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
    }
  }, [data]);
  // console.table(data);

  async function alterTable(form) {
    // Lanjutkan dengan pengiriman data jika cocok
    try {
      const response = await axios.put(URL_ALTER, data);
      console.log("Data berhasil dikirim:", response.data);
      setSending(false);
      setErrorMessage(null);
      setLoading(false);
      setOnWorking(false);
      refresh();
    } catch (error) {
      setSending(false);
      setErrorMessage(error.message);
      alert(JSON.stringify(error.response.data.data));
      console.error("Terjadi kesalahan:", error);
    }
  }

  const onSubmit = async (data) => {
    setSending(!sending);
    // alert("otw-sent data");
    // Lakukan validasi di sini jika diperlukan
    if (!data) {
      alert("there is no data to send");
    }
    if (data.newPassword !== data.newPassword_confirmation) {
      setError("newPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    await alterTable(data);
  };

  return (
    <>
      <dialog id="UpdateAdmin" className="modal">
        <div className="modal-box h-auto w-12/12 max-w-4xl bg-gray-50 overflow-y-scroll cursor-auto">
          <form method="dialog">
            <button
              // onClick={refresh}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="flex flex-row justify-between items-center gap-2 pr-8">
            <h3 className="font-bold text-lg p-0 text-left w-3/12">
              Edit Data Admin
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
                    <div className="flex flex-row">
                      <div className="">
                        <input
                          type="hidden"
                          {...register("authority", {
                            required: "Your Credentials Authority are required",
                            value: "superAdmin",
                          })}
                        />
                        <input
                          type="hidden"
                          {...register("adminsId", {
                            required: "This Admin Credentials ID are required",
                          })}
                        />
                      </div>
                      {/* Images */}
                      <div className="flex justify-center items-center w-6/12 p-12">
                        <img
                          src={`./src/assets/admin_avatar/${data.pict}`}
                          alt="Avatar Tailwind CSS Component"
                          className="w-96 rounded-full max-w-3xl shadow-lg"
                          loading="lazy"
                        />
                      </div>
                      {/* Form */}
                      <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium">
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
                            onClick={() => setShowPassword(!showPassword)}
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
                            onClick={() => setShowPassword(!showPassword)}
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
                  </form>
                ) : (
                  <>Berhasil Edit Data</>
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
