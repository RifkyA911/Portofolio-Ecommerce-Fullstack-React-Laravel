import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
// Components
// UTILS
import axios from "axios";
import { MuiIcon } from "../utils/RenderIcons";
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

export const ActionModalForm = (props) => {
  const { table, table_id, method } = props;
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  let URL;
  if (table == "admins") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_ADMIN + "/" + table_id;
  } else if (table == "invoices") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_TRANSACTION + "/" + table_id;
  }

  useEffect(() => {
    if (table_id !== undefined) {
      axios
        .get(URL)
        .then((response) => {
          console.table("fetching:", URL);
          setData({
            email: response.data.data.email,
            username: response.data.data.username,
            pict: response.data.data.pict,
            role: response.data.data.role,
            created_at: response.data.data.created_at,
            updated_at: response.data.data.updated_at,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Jika table_id null, atur loading menjadi false tanpa menjalankan Axios.
    }
  }, [table_id]); // Gunakan table_id sebagai dependency untuk useEffect.
  // console.table(data);

  async function alterTable() {
    axios
      .put(import.meta.env.VITE_API_URL_PUT_ADMIN, form)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });
  const password = useRef({});

  const onSubmit = async (data) => {
    console.log("yee");
    // Lakukan validasi di sini jika diperlukan
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    // Lanjutkan dengan pengiriman data jika cocok
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL_PUT_ADMIN,
        data
      );
      console.log("Data berhasil dikirim:", response.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      {/* <p>{data}</p> */}
      <dialog id="EditAdmin" className="modal">
        <div className="modal-box h-auto w-12/12 max-w-4xl bg-gray-50 overflow-y-scroll cursor-auto">
          <form method="dialog">
            <button
              onClick={() => {
                // setLoading(true);
                // setData([]);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg p-0 text-left">Edit Data Admin</h3>
          <div className="content">
            {!loading ? (
              <>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-row">
                    <div className="flex justify-center items-center w-6/12 p-12">
                      <img
                        src={`./src/assets/admin_avatar/${data.pict}`}
                        alt="Avatar Tailwind CSS Component"
                        className="w-96 rounded-full max-w-3xl shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium">
                      <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
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
                        className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                        // disabled
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        onChange={(e) => {
                          setValue("email", e.target.value);
                          setData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }));
                        }}
                        value={data.email}
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
                        value={data.username}
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
                            className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
                            {...field}
                          >
                            <option value="1">Admin</option>
                            <option value="0">Super Admin</option>
                          </select>
                        )}
                      />

                      <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
                        Password
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
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
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
                        Confirm Password
                        {errors.confirmPassword && (
                          <span className="absolute right-0 text-red-500">
                            {errors.confirmPassword.message}
                          </span>
                        )}
                      </label>
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                          {...register("confirmPassword", {
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
                  <div className="py-2">
                    <button
                      type="submit"
                      className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
                    >
                      <MuiIcon iconName="EditRounded" /> Save Changes
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
