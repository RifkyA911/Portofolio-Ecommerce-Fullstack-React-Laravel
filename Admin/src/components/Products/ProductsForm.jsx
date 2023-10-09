import React, {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
// Components
import Skeleton from "@mui/material/Skeleton";
import ModalContext from "../Modal";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import { MuiIcon } from "../../utils/RenderIcons";
import { convertISODateToJSDate } from "../../utils/DateFormatter";

export const InsertForm = (props) => {
  const {
    data,
    formType,
    showPassword,
    setShowPassword,
    // react-hook-form
    passwordRef,
    register,
    setValue,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  } = useContext(ModalContext);

  return (
    <>
      <div className="flex flex-row">
        {/* Images */}
        <div className="flex justify-center items-center w-6/12 p-12">
          <div className="relative w-96 rounded-full">
            {console.log(data)}
            <img
              src={
                data.pict
                  ? `./src/assets/admin_avatar/${data.pict}`
                  : `./src/assets/admin_avatar/default.jpg`
              }
              alt="Avatar Tailwind CSS Component"
              className=" w-96 rounded-full max-w-3xl shadow-lg"
              loading="lazy"
            />
            <input
              type="file"
              className="absolute w-full h-full hover:block hover:bg-gray-600 hover:bg-opacity-10 m-auto top-0 left-0 rounded-full transition-all duration-300 cursor-pointer"
            />
          </div>
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
            className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
              message: "Invalid email",
            })}
            onChange={(e) => {
              setValue("email", e.target.value);
            }}
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
            className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
            {...register("username", {
              required: true,
              maxLength: 80,
            })}
            onChange={(e) => {
              setValue("username", e.target.value);
            }}
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
              ref={(e) => {
                field.ref(e);
                passwordRef.current = e;
              }}
              {...register("password", {
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "New Password must be at least 6 characters",
                },
                validate: (value) => {
                  value <= 6 || "Passwords kurnag";
                },
              })}
            />
            <span
              onClick={setShowPassword}
              className="absolute bg-transparent w-4 right-[20px] bottom-[8px] cursor-pointer"
            >
              <MuiIcon
                iconName={
                  showPassword ? "VisibilityRounded" : "VisibilityOffRounded"
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
              ref={passwordRef} // Referensi input password
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: (value) => {
                  value === passwordRef.current || "Passwords do not match f";
                  console.log(
                    "this-passwordRef.current value",
                    passwordRef.current
                  );
                  console.log("this-confirm-password value", value);
                },
              })}
            />
            <span
              onClick={setShowPassword}
              className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
            >
              <MuiIcon
                iconName={
                  showPassword ? "VisibilityRounded" : "VisibilityOffRounded"
                }
              />
            </span>
          </div>
        </div>
      </div>
      <div className="py-2 shadow-inner shadow-slate-50 bg-slate-100">
        <button
          type="submit"
          className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
        >
          <MuiIcon iconName="EditRounded" /> Save Changes
        </button>
      </div>
    </>
  );
};
