import React, { useState } from "react";
import { useModalContext } from "./Modal";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const TextInput = (props) => {
  const { className, label, name, placeholder, type = name, onChange } = props;

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
    maxLength: {
      value: 200,
      message: label + " input must not exceed 200 characters",
    },
    minLength: {
      value: 4,
      message: label + " input must exceed 4 characters",
    },
  };
  return (
    <div className={className}>
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
    </div>
  );
};

export const NumberInput = (props) => {
  const {
    className,
    label,
    name,
    placeholder,
    type = name,
    decimalOptions = 0,
    limitDigits,
    prefix,
    style,
  } = props;
  const [formattedValue, setFormattedValue] = useState("");

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
    pattern: {
      value: /\d+/,
      message: label + " input is number only.",
    },
    maxLength: {
      value: 11,
      message: label + " input must exceed 16 digits",
    },
    minLength: {
      value: 3,
      message: label + " input min 3 digits",
    },
  };

  // console.table(props);
  return (
    <div className={className}>
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
      {/* <input
        type="number"
        placeholder={placeholder.toLowerCase()}
        className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
        {...register(name, validationRules)}
        onChange={(e) => {
          //   handleInputChange(e);
          console.log(e.target.value);
          setValue(name, e.target.value);
        }}
      /> */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, name, value } }) => (
          <NumericFormat
            name={name}
            value={value}
            className={`input input-bordered input-info input-md h-[38px] ${style} max-w-3xl focus:outline-none`}
            displayType={"input"}
            thousandSeparator
            prefix={prefix}
            allowNegative={false} // Untuk menghindari nilai negatif
            decimalScale={decimalOptions} // Untuk menghindari desimal
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < limitDigits;
            }}
            onValueChange={(values) => {
              setValue(name, values.floatValue || 0);
            }}
          />
        )}
      />
    </div>
  );
};

export const SelectInput = (props) => {
  const {
    className,
    style,
    label,
    name,
    options,
    type = name,
    onChange,
  } = props;

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
    <div className={className}>
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
      <select
        className={`${style} select select-info select-sm max-w-3xl focus:outline-none self-start font-roboto-medium`}
        {...register(name, { required: "select one" })}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* <Controller
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
      /> */}
    </div>
  );
};

export const TextArea = (props) => {
  const { className, label, name, placeholder, type = name, onChange } = props;

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
    maxLength: {
      value: 200,
      message: label + " input must not exceed 200 characters",
    },
    minLength: {
      value: 4,
      message: label + " input must exceed 4 characters",
    },
  };
  return (
    <div className={className}>
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
      {/* <input
        type={type}
        placeholder={placeholder.toLowerCase()}
        className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl focus:outline-none"
        {...register(name, validationRules)}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(name, e.target.value);
        }}
        // onClick={console.log(name, ":", getValues(name))}
      /> */}
      <textarea
        className="textarea textarea-info resize-y border rounded-md p-2 w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        {...register(name, validationRules)}
        onChange={(e) => {
          console.log(name, ":", e.target.value);
          setValue(name, e.target.value);
        }}
      >
        {/* {console.log(name, ":", getValues(name))} */}
      </textarea>
    </div>
  );
};

export const FileInput = (props) => {
  const {
    className,
    label,
    name,
    placeholder,
    type = name,
    decimalOptions = 0,
    limitDigits,
    prefix,
    style,
  } = props;
  const [formattedValue, setFormattedValue] = useState("");

  const {
    table,
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
    pattern: {
      value: /\d+/,
      message: label + " input is number only.",
    },
    maxLength: {
      value: 11,
      message: label + " input must exceed 16 digits",
    },
    minLength: {
      value: 3,
      message: label + " input min 3 digits",
    },
  };

  return (
    <>
      <div className="relative w-96 rounded-full">
        <img
          src={
            data.pict
              ? `./src/assets/${table}/${getValues("pict")}`
              : `./src/assets/${table}/default.jpg`
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
    </>
  );
};
