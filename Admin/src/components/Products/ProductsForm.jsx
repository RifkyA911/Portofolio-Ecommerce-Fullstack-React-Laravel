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
import {
  TextInput,
  SelectInput,
  NumberInput,
  TextArea,
  FileInput,
} from "../Form";
import { ConfirmButton } from "../Button";

export const ProductsInsertForm = (props) => {
  const {
    data,
    formType,
    // react-hook-form
    getValues,
    register,
    setValue,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  } = useContext(ModalContext);
  //   const nameValue = getValues("barcode");
  //   console.log(nameValue);

  return (
    <>
      <div className="flex flex-row">
        {/* Images */}
        <div className="flex justify-center items-center w-6/12 p-12">
          <FileInput
            type="picture"
            // className={`flex gap-4 flex-col w-full`}
            label="Product Picture"
            name="pict"
          />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium">
          {/* {console.log(name, ":", getValues(name))}  {setValue("barcode", "HJAHAHA")} */}
          <TextInput
            className={`flex gap-4 flex-col w-full`}
            label="Barcode/No. Product"
            name="barcode"
            placeholder="Masukkan Kode Barcode/No. Product"
          />
          <TextInput
            className={`flex gap-4 flex-col w-full`}
            label="Product Name"
            name="name"
            placeholder="Masukkan Nama Product"
          />
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <SelectInput
              className={`w-full flex gap-4 flex-col `}
              label="Category"
              name="category"
              options={["Topi", "Baju"]}
              style="w-full h-[38px]"
            />
            <NumberInput
              className={`flex gap-4 flex-col `}
              prefix=""
              label="Stock"
              name="stock"
              limitDigits={1000}
              placeholder="Masukkan Harga"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <NumberInput
              className={`flex gap-4 flex-col `}
              prefix="Rp. "
              label="Price (IDR)"
              name="price"
              limitDigits={10000000000}
              placeholder="Masukkan Harga"
              style="w-full"
            />

            <NumberInput
              className={`flex gap-4 flex-col `}
              prefix="% "
              label="Discount %"
              name="discount"
              limitDigits={1000}
              decimalOptions={3}
              placeholder="Masukkan Harga"
              style="w-full"
            />
          </div>
          <TextArea
            className={`flex gap-4 flex-col w-full`}
            label="Description"
            name="description"
            placeholder="tamnbahkan deskripsi"
          />
        </div>
      </div>
      <ConfirmButton onClick={() => console.log(register)} confirmType="add" />
    </>
  );
};

export const ProductsAlterForm = (props) => {
  const {
    data,
    setData,
    formType,
    showPassword,
    setShowPassword,
    // react-hook-form
    newPasswordRef,
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
        <div>
          {/* ALTER */}
          {formType === "ALTER_BY_ID" && (
            <input
              type="hidden"
              {...register("adminsId", {
                required: "This Admin Credentials ID are required",
              })}
            />
          )}
        </div>
        {/* Images */}
        <div className="flex justify-center items-center w-6/12 p-12">
          <div className="relative w-96 rounded-full">
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
            // value={data.email}
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
            {errors.newPasswordRef && (
              <span className="absolute right-0 text-red-500">
                {errors.newPasswordRef.message}
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
                  message: "New Password must be at least 6 characters",
                },
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
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
                validate: (value) => {
                  if (watch("newPassword") != value) {
                    setError("newPassword_confirmation", {
                      type: "manual",
                      message: "New Passwords is not match",
                    });
                    return "The New passwords do no match";
                  }
                },
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
            >
              <MuiIcon
                iconName={
                  showPassword ? "VisibilityRounded" : "VisibilityOffRounded"
                }
              />
            </span>
          </div>

          <small className="flex flex-row gap-2">
            <div className="p">
              <span className="font-bold mr-2">Created at:</span>
              {convertISODateToJSDate(data.created_at).toLocaleString()}
            </div>
            |
            <div className="p">
              <span className="font-bold mr-2">Updated at:</span>
              {convertISODateToJSDate(data.updated_at).toLocaleString()}
            </div>
          </small>
        </div>
      </div>
      <ConfirmButton confirmType="alter" />
    </>
  );
};

export const ProductsDropForm = (props) => {
  // const { data, formType } = props;
  const { refresh, data, formType, clearData } = useContext(ModalContext);

  const id = useId();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {data !== undefined && data !== null && (
          <div className=" w-12/12 p-6">
            {/* Images */}
            {formType === "DROP_BY_ID" && (
              <>
                <img
                  src={
                    data.pict
                      ? `./src/assets/admin_avatar/${data.pict}`
                      : `./src/assets/admin_avatar/blank.jpg`
                  }
                  alt="Avatar Tailwind CSS Component"
                  className="w-72 rounded-full max-w-3xl shadow-lg m-auto"
                  loading="lazy"
                />
                <h1 className="text-xl text-center pt-8 pb-4 line-clamp-2">
                  Are you sure to delete{" "}
                  <span className="font-bold">{data.username}"</span> ?
                </h1>
              </>
            )}
            {formType === "DROP_BY_SELECTED" && (
              <div key={id}>
                <div
                  key={id}
                  className="relative flex flex-row items-center justify-center"
                >
                  {data.map((selected, index) => (
                    <>
                      <span
                        key={selected.id}
                        className="flex-col overflow-x-scroll overflow-y-hidden line-clamp-1 py-4"
                      >
                        <img
                          key={selected.id}
                          src={
                            selected.pict
                              ? `./src/assets/admin_avatar/${selected.pict}`
                              : `./src/assets/admin_avatar/blank.jpg`
                          }
                          alt="Avatar Tailwind CSS Component"
                          className={`w-36 rounded-full shadow-lg m-auto`}
                          loading="lazy"
                        />
                      </span>
                    </>
                  ))}
                </div>
                <div className="relative  text-xl text-center line-clamp-2 s">
                  <div className="flex gap-12 flex-row justify-center items-center font-semibold text-sm">
                    <table className="w-full bg-white">
                      <thead className={`bg-slate-300 font-roboto-regular`}>
                        <tr>
                          <th>No</th>
                          <th>Nama Admin</th>
                        </tr>
                      </thead>
                      <tbody className="font-roboto-regular max-h-20 overflow-y-scroll">
                        {data.map((selected, index) => (
                          <tr key={selected.id} className="divide-y p">
                            <td className="p-0 w-0 bg-slate-100">
                              {index + 1}
                            </td>
                            <td className="px-4 py-1 w-96">
                              <p key={selected.id}>{selected.username}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h1 className="my-4">
                    Are you sure to delete these selected admins?
                  </h1>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Confirm Button */}
        <div className="flex gap-12 py-2 justify-center shadow-inner shadow-slate-50 bg-slate-100">
          <ConfirmButton confirmType="drop" />
          <ConfirmButton
            confirmType="cancel"
            onClick={() => {
              refresh();
              clearData();
            }}
          />
        </div>
      </div>
    </>
  );
};
