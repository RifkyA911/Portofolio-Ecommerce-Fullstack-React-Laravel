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

// export const BackupForm = (props) => {
//   return (
//     <>
//       <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="hidden"
//           {...register("superAuthorizationPassword", {
//             required:
//               "Your Credentials superAuthorizationPassword are required",
//             value: "superAdmin",
//           })}
//         />
//         {(formType === "ALTER_BY_ID" || formType === "INSERT") && (
//           <>
//             <div className="flex flex-row">
//               <div>
//                 {/* ALTER */}
//                 {formType === "ALTER_BY_ID" && (
//                   <input
//                     type="hidden"
//                     {...register("adminsId", {
//                       required: "This Admin Credentials ID are required",
//                     })}
//                   />
//                 )}
//               </div>

//               {/* Images */}
//               <div className="flex justify-center items-center w-6/12 p-12">
//                 <div className="relative w-96 rounded-full">
//                   <img
//                     src={
//                       formType !== "INSERT"
//                         ? data.pict
//                           ? `./src/assets/admin_avatar/${data.pict}`
//                           : `./src/assets/admin_avatar/blank.jpg`
//                         : `./src/assets/admin_avatar/default.png`
//                     }
//                     alt="Avatar Tailwind CSS Component"
//                     className=" w-96 rounded-full max-w-3xl shadow-lg"
//                     loading="lazy"
//                   />
//                   <input
//                     type="file"
//                     className="absolute w-full h-full hover:block hover:bg-gray-600 hover:bg-opacity-10 m-auto top-0 left-0 rounded-full transition-all duration-300 cursor-pointer"
//                   />
//                 </div>
//               </div>
//               {/* Form */}
//               <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-6 px-6 font-roboto-medium">
//                 {formType === "INSERT" && (
//                   <>
//                     <label
//                       htmlFor="email"
//                       className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
//                     >
//                       Email
//                       {errors.email && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.email.message}
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                       {...register("email", {
//                         required: true,
//                         pattern: /^\S+@\S+$/i,
//                         message: "Invalid email",
//                       })}
//                       onChange={(e) => {
//                         setValue("email", e.target.value);
//                       }}
//                     />
//                     {/* Username */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Username
//                       {errors.username && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.username.message}
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="username"
//                       placeholder="Username"
//                       className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                       {...register("username", {
//                         required: true,
//                         maxLength: 80,
//                       })}
//                       onChange={(e) => {
//                         setValue("username", e.target.value);
//                       }}
//                     />
//                     {/* Role */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Role
//                       {errors.role && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.role.message}
//                         </span>
//                       )}
//                     </label>
//                     <Controller
//                       name="role"
//                       control={control}
//                       defaultValue="1" // Nilai default jika perlu
//                       render={({ field }) => (
//                         <select
//                           onChange={(e) => {
//                             field.onChange(e); // Menggunakan field.onChange untuk mengatur nilai di dalam Controller
//                             alert(
//                               "be carefull changing role grant access",
//                               e.target.value
//                             ); // Menggunakan e.target.value karena field.value mungkin belum diperbarui
//                           }}
//                           className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
//                           value={field.value} // Menggunakan field.value untuk nilai saat ini
//                         >
//                           <option value="1">Admin</option>
//                           <option value="0">Super Admin</option>
//                         </select>
//                       )}
//                     />
//                     {/* Password */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       New Password
//                       {errors.password && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.password.message}
//                         </span>
//                       )}
//                     </label>
//                     <div className="relative w-full">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                         ref={(e) => {
//                           field.ref(e);
//                           passwordRef.current = e;
//                         }}
//                         {...register("password", {
//                           required: "New Password is required",
//                           minLength: {
//                             value: 6,
//                             message:
//                               "New Password must be at least 6 characters",
//                           },
//                         })}
//                       />
//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute bg-transparent w-4 right-[20px] bottom-[8px] cursor-pointer"
//                       >
//                         <MuiIcon
//                           iconName={
//                             showPassword
//                               ? "VisibilityRounded"
//                               : "VisibilityOffRounded"
//                           }
//                         />
//                       </span>
//                     </div>
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Confirm New Password
//                       {errors.password_confirmation && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.password_confirmation.message}
//                         </span>
//                       )}
//                     </label>
//                     <div className="relative w-full">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                         ref={passwordRef} // Referensi input password
//                         {...register("password_confirmation", {
//                           required: "Confirm Password is required",
//                           validate: (value) =>
//                             value === passwordRef.current ||
//                             "Passwords do not match f",
//                         })}
//                       />
//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
//                       >
//                         <MuiIcon
//                           iconName={
//                             showPassword
//                               ? "VisibilityRounded"
//                               : "VisibilityOffRounded"
//                           }
//                         />
//                       </span>
//                     </div>
//                   </>
//                 )}
//                 {formType === "ALTER_BY_ID" && (
//                   <>
//                     <label
//                       htmlFor="email"
//                       className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
//                     >
//                       Email
//                       {errors.email && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.email.message}
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       autoComplete={data.email}
//                       className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                       // disabled
//                       {...register("email", {
//                         required: true,
//                         pattern: /^\S+@\S+$/i,
//                         message: "Invalid email",
//                       })}
//                       onChange={(e) => {
//                         setValue("email", e.target.value);
//                         setData((prevData) => ({
//                           ...prevData,
//                           email: e.target.value,
//                         }));
//                       }}
//                       // value={data.email}
//                     />
//                     {/* Username */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Username
//                       {errors.username && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.username.message}
//                         </span>
//                       )}
//                     </label>
//                     <input
//                       type="username"
//                       placeholder="Username"
//                       autoComplete={data.username}
//                       className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                       {...register("username", {
//                         required: true,
//                         maxLength: 80,
//                       })}
//                       onChange={(e) => {
//                         setValue("username", e.target.value);
//                         setData((prevData) => ({
//                           ...prevData,
//                           username: e.target.value,
//                         }));
//                       }}
//                       //value={data.username} <- error
//                     />
//                     {/* Role */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Role
//                       {errors.role && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.role.message}
//                         </span>
//                       )}
//                     </label>
//                     <Controller
//                       name="role"
//                       control={control}
//                       defaultValue="1" // Nilai default jika perlu
//                       render={({ field }) => (
//                         <select
//                           onChange={(e) => {
//                             field.onChange(e); // Menggunakan field.onChange untuk mengatur nilai di dalam Controller
//                             setData((prevData) => ({
//                               ...prevData,
//                               role: e.target.value,
//                             }));
//                             alert(
//                               "be carefull changing role grant access",
//                               e.target.value
//                             ); // Menggunakan e.target.value karena field.value mungkin belum diperbarui
//                           }}
//                           className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
//                           value={field.value} // Menggunakan field.value untuk nilai saat ini
//                         >
//                           <option value="1">Admin</option>
//                           <option value="0">Super Admin</option>
//                         </select>
//                       )}
//                     />
//                     {/* Password */}
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       New Password
//                       {errors.newPassword && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.newPassword.message}
//                         </span>
//                       )}
//                     </label>
//                     <div className="relative w-full">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                         {...register("newPassword", {
//                           required: "New Password is required",
//                           minLength: {
//                             value: 6,
//                             message:
//                               "New Password must be at least 6 characters",
//                           },
//                         })}
//                       />

//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute bg-transparent w-4 right-[20px] bottom-[8px] cursor-pointer"
//                       >
//                         <MuiIcon
//                           iconName={
//                             showPassword
//                               ? "VisibilityRounded"
//                               : "VisibilityOffRounded"
//                           }
//                         />
//                       </span>
//                     </div>
//                     <label className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500">
//                       Confirm New Password
//                       {errors.newPassword_confirmation && (
//                         <span className="absolute right-0 text-red-500">
//                           {errors.newPassword_confirmation.message}
//                         </span>
//                       )}
//                     </label>
//                     <div className="relative w-full">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
//                         {...register("newPassword_confirmation", {
//                           required: "Confirm Password is required",
//                           validate: (value) =>
//                             value === newPassword.current ||
//                             "Passwords do not match (2)",
//                         })}
//                       />
//                       <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute bg-transparent w-4 right-[20px] bottom-[8px]  cursor-pointer"
//                       >
//                         <MuiIcon
//                           iconName={
//                             showPassword
//                               ? "VisibilityRounded"
//                               : "VisibilityOffRounded"
//                           }
//                         />
//                       </span>
//                     </div>

//                     <small className="flex flex-row gap-2">
//                       <div className="p">
//                         <span className="font-bold mr-2">Created at:</span>
//                         {data.created_at}
//                       </div>
//                       |
//                       <div className="p">
//                         <span className="font-bold mr-2">Updated at:</span>
//                         {data.updated_at}
//                       </div>
//                     </small>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="py-2 shadow-inner shadow-slate-50 bg-slate-100">
//               <button
//                 type="submit"
//                 // onClick={handleSubmit(onSubmit)}
//                 className="btn bg-gradient-to-tr hover:from-indigo-500 hover:to-teal-500 transition-all duration-500 from-blue-500 to-sky-500 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
//               >
//                 <MuiIcon iconName="EditRounded" /> Save Changes
//               </button>
//             </div>
//           </>
//         )}
//         {(formType === "DROP_BY_ID" || formType === "DROP_BY_SELECTED") && (
//           <div className="flex flex-col justify-center items-center">
//             {/* <div className="flex-row">
//                           <span className="loading loading-spinner text-primary"></span>
//                           <span className="loading loading-spinner text-secondary"></span>
//                           <span className="loading loading-spinner text-accent"></span>
//                           <span className="loading loading-spinner text-neutral"></span>
//                           <span className="loading loading-spinner text-info"></span>
//                           <span className="loading loading-spinner text-success"></span>
//                           <span className="loading loading-spinner text-warning"></span>
//                           <span className="loading loading-spinner text-error"></span>
//                         </div> */}
//             {data !== undefined && data !== null && (
//               <div className=" w-12/12 p-6">
//                 {/* Images */}
//                 {formType === "DROP_BY_ID" && (
//                   <>
//                     <img
//                       src={
//                         data.pict
//                           ? `./src/assets/admin_avatar/${data.pict}`
//                           : `./src/assets/admin_avatar/blank.jpg`
//                       }
//                       alt="Avatar Tailwind CSS Component"
//                       className="w-72 rounded-full max-w-3xl shadow-lg m-auto"
//                       loading="lazy"
//                     />
//                     <h1 className="text-xl text-center pt-8 pb-4 line-clamp-2">
//                       Are you sure to delete{" "}
//                       <span className="font-bold">{data.username}"</span> ?
//                     </h1>
//                   </>
//                 )}
//                 {formType === "DROP_BY_SELECTED" && (
//                   <div key={id}>
//                     <div key={id} className="relative flex flex-row items-end">
//                       {data.map((selected, index) => (
//                         <>
//                           <span
//                             key={selected.id}
//                             className="flex-col overflow-x-scroll overflow-y-hidden line-clamp-1 py-4"
//                           >
//                             <img
//                               key={selected.id}
//                               src={
//                                 selected.pict
//                                   ? `./src/assets/admin_avatar/${selected.pict}`
//                                   : `./src/assets/admin_avatar/blank.jpg`
//                               }
//                               alt="Avatar Tailwind CSS Component"
//                               className={`w-36 rounded-full shadow-lg m-auto`}
//                               loading="lazy"
//                             />
//                           </span>
//                         </>
//                       ))}
//                     </div>
//                     <div className="relative  text-xl text-center line-clamp-2 s">
//                       <div className="flex gap-12 flex-row justify-center items-center font-semibold text-sm">
//                         <table className="w-full bg-white">
//                           <thead className={`bg-slate-300 font-roboto-regular`}>
//                             <tr>
//                               <th>No</th>
//                               <th>Nama Admin</th>
//                             </tr>
//                           </thead>
//                           <tbody className="font-roboto-regular max-h-20 overflow-y-scroll">
//                             {data.map((selected, index) => (
//                               <tr key={selected.id} className="divide-y p">
//                                 <td className="p-0 w-0 bg-slate-100">
//                                   {index + 1}
//                                 </td>
//                                 <td className="px-4 py-1 w-96">
//                                   <p key={selected.id}>{selected.username}</p>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                       <h1 className="my-4">
//                         Are you sure to delete these selected admins?
//                       </h1>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             <div className="flex gap-12 py-2 justify-center shadow-inner shadow-slate-50 bg-slate-100">
//               <button
//                 type="submit"
//                 // onClick={handleSubmit(onSubmit)}
//                 className="btn transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-red-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
//               >
//                 <span id="showDelete" className="options px-[4px]">
//                   <i className="font-xs">
//                     <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
//                   </i>
//                 </span>
//                 <span className="font-bold pr-2">Delete</span>
//               </button>
//               <button
//                 type="button"
//                 // onClick={refresh}
//                 onClick={() => {
//                   refresh();
//                   clearData();
//                 }}
//                 className="btn transition-all duration-500 bg-gradient-to-tl from-amber-500 via-orange-500 to-amber-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
//               >
//                 <span className="options px-[4px]">
//                   <i className="font-xs ">
//                     <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
//                   </i>
//                   <span className="font-bold pr-2">Cancel</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </>
//   );
// };

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

export const AlterForm = (props) => {
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

export const DropForm = (props) => {
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
                <div key={id} className="relative flex flex-row items-end">
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
          <button
            type="submit"
            // onClick={handleSubmit(onSubmit)}
            className="btn transition-all duration-500 bg-gradient-to-tl from-pink-500 via-red-500 to-red-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <span id="showDelete" className="options px-[4px]">
              <i className="font-xs">
                <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
              </i>
            </span>
            <span className="font-bold pr-2">Delete</span>
          </button>
          <button
            type="button"
            // onClick={refresh}
            onClick={() => {
              refresh();
              clearData();
            }}
            className="btn transition-all duration-500 bg-gradient-to-tl from-amber-500 via-orange-500 to-amber-400 bg-size-200 bg-pos-0 hover:bg-pos-100 px-6 py-3 rounded-lg text-white font-roboto-bold font-bold"
          >
            <span className="options px-[4px]">
              <i className="font-xs ">
                <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
              </i>
              <span className="font-bold pr-2">Cancel</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
