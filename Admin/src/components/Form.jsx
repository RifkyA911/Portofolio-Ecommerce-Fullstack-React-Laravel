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
    required: `This ${label} field is required`,
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
          console.log(name, ":", e.target.value);
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
    suffix,
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
    required: `This ${label} field is required`,
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
            suffix={suffix}
            allowNegative={false} // Untuk menghindari nilai negatif
            decimalScale={decimalOptions} // Untuk menghindari desimal
            isAllowed={(values) => {
              console.log(values);
              const { floatValue } = values;
              return floatValue < limitDigits;
            }}
            onValueChange={(values) => {
              setValue(name, values.floatValue || 0);
            }}
          />
        )}
      />
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
    select,
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
    required: `This ${label} field is required`,
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
        defaultValue={getValues(name)}
      >
        {select.map((option, index) => (
          <option
            className="capitalize indent-5 text-lg cursor-pointer"
            key={index}
            value={option}
            // selected={getValues(name) !== null && true}
          >
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
    required: `This ${label} field is required`,
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

export const DropByIdForm = (props) => {
  const { tableId, productsId, location, thisName, pict } = props;

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
  return (
    <>
      <input
        type="hidden"
        {...register(tableId, {
          required: `This ${tableId} Credentials ID are required`,
        })}
        defaultValue={getValues(tableId)}
      />
      {/* Images */}
      <img
        src={
          pict
            ? `./src/assets/${location}/${pict}`
            : `./src/assets/${location}/blank.jpg`
        }
        alt="Avatar Tailwind CSS Component"
        className="w-72 rounded-full max-w-3xl shadow-lg m-auto"
        loading="lazy"
      />
      <h1 className="text-xl text-center pt-8 pb-4 line-clamp-2">
        Are you sure to delete <span className="font-bold">"{thisName}"</span> ?
      </h1>
    </>
  );
};

export const DropBySelectedForm = (props) => {
  const { table, data, location } = props;
  const id = useId();

  return (
    <>
      <div key={id}>
        {/* <input
        type="hidden"
        {...register(tableId, {
          required: `This ${tableId} Credentials ID are required`,
        })}
        defaultValue={getValues(tableId)}
      /> */}
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
                      ? `./src/assets/${location}/${selected.pict}`
                      : `./src/assets/${location}/blank.jpg`
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
                  <th>Nama {table}</th>
                </tr>
              </thead>
              <tbody className="font-roboto-regular max-h-20 overflow-y-scroll">
                {data.map((selected, index) => (
                  <tr key={selected.id} className="divide-y p">
                    <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                    <td className="px-4 py-1 w-96">
                      <p key={selected.id}>{selected.username}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1 className="my-4">
            Are you sure to delete these selected {table}s?
          </h1>
        </div>
      </div>
    </>
  );
};
