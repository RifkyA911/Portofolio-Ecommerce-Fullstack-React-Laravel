import React from "react";
import { useModalContext } from "./Modal";
import { Controller } from "react-hook-form";

export const InputField = (props) => {
  const { label, name, placeholder, type = name, onChange } = props;

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
  } = useModalContext();

  const validationRules = {
    required: true,
    maxLength: 4,
  };
  return (
    <>
      {/* <p>{watch("product")}</p> */}
      <label
        htmlFor={name}
        className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {label}
        {errors[name] && (
          <span className="absolute right-0 text-red-500">
            {errors[name].message}
          </span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder.toLowerCase()}
        className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
        {...register(name, validationRules)}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(name, e.target.value);
        }}
        // onClick={console.log(name, ":", getValues(name))}
      />
    </>
  );
};

export const SelectInput = (props) => {
  const { label, name, options, type = name, onChange } = props;

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
  } = useModalContext();

  const validationRules = {
    required: true,
    maxLength: 4,
  };

  return (
    <>
      {/* Role */}
      <label
        htmlFor={name}
        className="relative w-full font-roboto-bold text-left after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {label}
        {errors[name] && (
          <span className="absolute right-0 text-red-500">
            {errors[name].message}
          </span>
        )}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue="1" // Nilai default jika perlu
        render={({ field }) => (
          <select
            onChange={(e) => {
              field.onChange(e); // Menggunakan field.onChange untuk mengatur nilai di dalam Controller
              alert(
                "be carefull changing category grant access",
                e.target.value
              ); // Menggunakan e.target.value karena field.value mungkin belum diperbarui
            }}
            className="select select-info select-sm w-full max-w-3xl focus:outline-none self-start font-roboto-medium"
            value={field.value} // Menggunakan field.value untuk nilai saat ini
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
    </>
  );
};
