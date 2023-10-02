import React, { useEffect, useRef, useState } from "react";
// Components
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { MuiIcon } from "../../utils/RenderIcons";

export const ShowAdminName = (props) => {
  const { data } = props;
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
      <div className="flex items-center space-x-3">
        <div
          className="avatar "
          onClick={() => document.getElementById("ShowPict").showModal()}
        >
          <div className="mask mask-squircle w-16 h-16 cursor-pointer ">
            <img
              src={`./src/assets/admin_avatar/${data.pict}`}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div className={`${textTable} pl-4 text-left`}>
          <div className="font-bold line-clamp-2 font-roboto-regular">
            {data.username}
          </div>
          <div className="mt-2 font-medium text-slate-500">{data.email}</div>
        </div>
      </div>
    </>
  );
};

export const ShowRole = (props) => {
  const { data } = props;
  return (
    <>
      <p className="font-semibold font-roboto-regular text-slate-800">
        {data.role == 0 ? "Super Admin" : "Admin"}
      </p>
    </>
  );
};

export const AuthorityToggle = (props) => {
  const { data } = props;
  const [authority, setAuthority] = useState({});

  useEffect(() => {
    const parsedAuthority = JSON.parse(data);
    setAuthority({
      chat: parsedAuthority.chat === "true",
      sort_warehouse: parsedAuthority.sort_warehouse === "true",
      alter_price: parsedAuthority.alter_price === "true",
    });
  }, [data]);

  const handleToggleChange = (toggleType) => {
    setAuthority((prevAuthority) => ({
      ...prevAuthority,
      [toggleType]: !prevAuthority[toggleType],
    }));
  };

  const toggleTypes = ["chat", "sort_warehouse", "alter_price"];
  const toggleColors = ["info", "success", "warning"];

  return (
    <div className="w-full flex lg:flex-row justify-around items-center">
      {toggleTypes.map((toggleType, index) => (
        <div key={toggleType}>
          <input
            type="checkbox"
            className={`toggle toggle-${toggleColors[index]} m-2`}
            onChange={() => handleToggleChange(toggleType)}
            // checked={authority[toggleType]}
            checked
          />
          {/* <label>{toggleType}</label> */}
        </div>
      ))}
    </div>
  );
};

export const ActionButton = (props) => {
  const { data, onClickDelete, onClickEdit } = props;
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
  const onSubmit = (editedData) => console.log(editedData);
  // console.log(errors);
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      <div className="w-full flex lg:flex-row justify-around items-center">
        <button
          onClick={onClickDelete}
          className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200"
        >
          <MuiIcon iconName={"DeleteForeverOutlined"} fontSize={26} />
        </button>
        <button
          onClick={() => document.getElementById("EditAdmin").showModal()}
          className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200"
        >
          <MuiIcon iconName={"AutoFixHighOutlined"} fontSize={26} />
        </button>
      </div>
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
                src={`./src/assets/admin_avatar/${data.pict}`}
                alt="Avatar Tailwind CSS Component"
                className="w-96 rounded-full max-w-3xl"
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 justify-center items-center w-6/12 py-4 px-6"
            >
              <label className="font-roboto-bold self-start">E-mail</label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-info w-full input-md h-[40px] max-w-3xl focus:outline-none"
                // disabled
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                value={data.email}
              />
              <label className="font-roboto-bold self-start">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered input-info w-full input-md h-[40px] max-w-3xl focus:outline-none"
                {...register("First name", {
                  required: true,
                  maxLength: 80,
                })}
                value={data.username}
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
                    className="select select-info select-md h-[40px] w-full max-w-3xl focus:outline-none self-start"
                    {...field}
                    // value={data.JSON.parse()}
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
                className="input input-bordered input-info w-full input-md h-[40px] max-w-3xl focus:outline-none"
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
                className="input input-bordered input-info w-full input-md h-[40px] max-w-3xl focus:outline-none"
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
          <button
            type="submit"
            className="bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 hover:transition-all hover:duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            Apply
          </button>
        </div>
      </dialog>
    </>
  );
};
