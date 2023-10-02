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
  const { inputData, table, table_id = 1, method } = props;
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  console.table(props);
  // let URL;
  // if (table == "admin" && table_id) {
  //   console.log("s");
  // } else {
  //   console.info("no data", props);
  // }

  // useEffect(() => {
  //   axios
  //     .get(URL)
  //     .then((response) => setData(response.data))
  //     .catch((error) => console.log(error));
  // });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });
  const onSubmit = (editedData) => {
    console.log(editedData);
    console.log("sdsd");
  };
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      {/* <p>{data}</p> */}
      <dialog id="EditAdmin" className="modal">
        <div className="modal-box h-auto w-12/12 max-w-4xl bg-gray-50 overflow-y-scroll cursor-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg p-0 text-left">Edit Data Admin</h3>
          <div className="flex flex-row">
            <div className="flex justify-center items-center w-6/12 p-12">
              <img
                src={`./src/assets/admin_avatar/${inputData.pict}`}
                alt="Avatar Tailwind CSS Component"
                className="w-96 rounded-full max-w-3xl shadow-lg"
                loading="lazy"
              />
            </div>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium"
            >
              <label className="font-roboto-bold self-start">E-mail</label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                // disabled
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                value={inputData.email}
              />
              <label className="font-roboto-bold self-start">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                {...register("First name", {
                  required: true,
                  maxLength: 80,
                })}
                value={inputData.username}
              />
              {errors.exampleRequired && <p>This field is required</p>}
              <label className="font-roboto-bold self-start">Role</label>
              <Controller
                name="role"
                control={control}
                defaultValue="" // Nilai default jika perlu
                rules={{ required: "Role is required" }} // Aturan validasi jika diperlukan
                render={({ field }) => (
                  <select
                    className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
                    {...field}
                    // value={inputData.JSON.parse()}
                  >
                    <option value="1">Admin</option>
                    <option value="0">Super Admin</option>
                  </select>
                )}
              />
              {errors.role && <p>{errors.role.message}</p>}
              <label className="font-roboto-bold self-start">
                New Password
              </label>
              <input
                type="password"
                className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <label className="font-roboto-bold self-start">
                Confirm Password
              </label>
              <input
                type="password"
                className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password.current || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </form>
          </div>
          <div className="py-2">
            <button
              type="submit"
              onSubmit={onSubmit}
              className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
            >
              <MuiIcon iconName="EditRounded" /> Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
