import React, {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Select from "react-select";

import { CropperModal, Dropzone, ModalContext } from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { MuiIcon } from "../utils/RenderIcons";
import { debounce } from "lodash";
import { IsThisAnImage } from "../utils/Solver";
import { useSelector } from "react-redux";
import { LoadingDaisyUI } from "./Loading";

const ServerPublicProductImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
const ServerPublicAdminImg = import.meta.env.VITE_SERVER_PUBLIC_ADMIN;
const ServerPublicUserImg = import.meta.env.VITE_SERVER_PUBLIC_USER;

export const SearchInput = (props) => {
  const { func } = props;
  const [loading, setLoading] = useState(false);
  // const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const searchInput = useRef(null);

  const debouncedOnChange = debounce(func, 1000);
  return (
    <>
      <input
        ref={searchInput}
        name="search"
        type="text"
        placeholder="Find inputData in this pagination"
        className="input input-bordered input-sm input-info lg:w-[512px] max-w-lg focus:outline-none"
        // value={setSearchTerm} this is useless
        onChange={debouncedOnChange}
      />
      {loading && (
        <span className="absolute right-12 bottom-2 loading loading-dots loading-sm"></span>
      )}
    </>
  );
};

export const TextInput = (props) => {
  const {
    className,
    label,
    labelSize = "text-sm",
    name,
    autoFocus = false,
    placeholder,
    type = name,
    formContext,
    onChange,
    // register,
    // setValue,
    // setFocus,
    // errors,
  } = props;

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

  // parent context react-hook-form
  const {
    // data,
    // formType,
    getValues,
    register,
    setValue,
    setFocus,
    errors,
    setError,
    control,
    isValid,
    dirtyFields,
    watch,
  } = useContext(formContext);

  const id = useId();

  const validationRules = {
    required: `This ${label} field is required `,
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
    <>
      {(name != "password" ||
        name != "password_confirmation" ||
        name != "newPassword" ||
        name != "newPassword_confirmation") && (
        <div
          onClick={() => {
            setFocus(name);
          }}
          className={className}
        >
          {/* <p>{watch("product")}</p> */}
          <label
            className={`relative w-full font-roboto-bold ${labelSize} text-left ${
              validationRules.required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
                : ""
            }`}
          >
            {label}
            {errors[name] && (
              <span
                className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
              >
                {errors[name].message}
              </span>
            )}
          </label>
          <input
            id={id}
            autoFocus={autoFocus}
            type={type}
            placeholder={placeholder.toLowerCase()}
            className={`input input-bordered input-info w-full input-md h-[38px] max-w-3xl text-gray-900 focus:outline-none ${
              errors[name] ? "border-pink-500" : "border-sky-500"
            }`}
            {...register(name, validationRules)}
            onChange={(e) => {
              // console.log(name, ":", e.target.value);
              setValue(name, e.target.value);
            }}
            // onClick={console.log(name, ":", getValues(name))}
          />
        </div>
      )}
    </>
  );
};

export const NumberInput = (props) => {
  const {
    inputRef,
    className,
    label,
    labelSize = "text-sm",
    name,
    placeholder,
    type = name,
    decimalOptions = 0,
    limitDigits,
    prefix,
    suffix,
    style,
    onInputChange = null,
    formContext,
  } = props;

  // react-hook-form
  const {
    // data,
    // formType,
    getValues,
    register,
    setValue,
    setFocus,
    errors,
    setError,
    control,
    isValid,
    dirtyFields,
    watch,
  } = useContext(formContext);

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
  const ref = useRef();

  return (
    <div
      onClick={() => {
        setFocus(name);
      }}
      className={className}
    >
      <label
        className={`relative w-full font-roboto-bold ${labelSize} text-left ${
          validationRules.required
            ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
            : ""
        }`}
      >
        {label}
        {errors[name] && (
          <span
            className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
          >
            {errors[name].message}
          </span>
        )}
      </label>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field: { onChange, name, value, ref } }) => (
          <NumericFormat
            name={name}
            value={value}
            className={`input input-bordered input-info input-md h-[38px] ${style} max-w-3xl text-gray-900 focus:outline-none ${
              errors[name] ? "border-pink-500" : "border-sky-500"
            }`}
            displayType={"input"}
            thousandSeparator
            getInputRef={ref}
            prefix={prefix}
            suffix={suffix}
            allowNegative={false} // Untuk menghindari nilai negatif
            decimalScale={decimalOptions} // Untuk menghindari desimal
            isAllowed={(values) => {
              // console.log(values);
              const { floatValue } = values;
              return floatValue < limitDigits;
            }}
            onValueChange={(values) => {
              setValue(name, values.floatValue || 0);
              // console.log(name, values);
              if (onInputChange) {
                onInputChange(values.floatValue);
              }
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
    labelSize = "text-sm",
    name,
    options,
    type = name,
    onChange,
  } = props;
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [optionsList, setOptionsList] = useState([]);

  const {
    data,
    select,
    formType,
    // react-hook-form
    getValues,
    register,
    setValue,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  } = useContext(ModalContext);

  const validationRules = {
    required: `This ${label} field is required`,
    maxLength: 4,
  };

  const selectOptions = (select) => {
    if (Array.isArray(select)) {
      const newOptions = select.map((option, index) => ({
        value: option.id,
        label: option.name,
        color: "#00B8D9",
        isFixed: true,
      }));
      setOptionsList(newOptions);
    }
  };

  useEffect(() => {
    selectOptions(select);
    // console.log(optionsList);
  }, [name]);

  return (
    <>
      {optionsList !== null && (
        <div
          onClick={() => {
            setFocus(name);
          }}
          className={className}
        >
          <label
            className={`relative w-full font-roboto-bold ${labelSize} text-left ${
              validationRules.required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
                : ""
            }`}
          >
            {label}
            {errors[name] && (
              <span
                className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
              >
                {errors[name].message}
              </span>
            )}
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, name, value, ref } }) => (
              <Select
                ref={ref}
                options={optionsList}
                value={optionsList.find((c) => c.value === value)}
                onChange={(select) => onChange(select.value)}
                className={`${style} max-w-3xl focus:outline-none text-left ${labelSize}  font-roboto-medium basic-single capitalize ${
                  errors[name] ? "border-pink-500" : "border-sky-500"
                }`}
                classNamePrefix="select"
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    text: "blue", // Change text color to blue
                    primary25: "skyblue", // Change the background color of the selected option to skyblue
                    primary: "skyblue", // Change the border color to blue
                  },
                })}
              />
            )}
            rules={{ required: "select one" }}
          />
        </div>
      )}
    </>
  );
};

export const PasswordInput = (props) => {
  const {
    inputRef,
    className,
    label,
    labelSize = "text-sm",
    name,
    autoFocus = false,
    placeholder,
    type = name,
    formContext,
    onChange,
    // register,
    // setValue,
    // setFocus,
    // errors,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

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

  // react-hook-form
  const {
    // data,
    // formType,
    getValues,
    register,
    setValue,
    setFocus,
    errors,
    setError,
    control,
    isValid,
    dirtyFields,
    watch,
  } = useContext(formContext);

  const id = useId();

  const validationRules = {
    required: `This ${label} field is required`,
    maxLength: {
      value: 22,
      message: label + " input must not exceed 22 characters",
    },
    minLength: {
      value: 6,
      message: label + " input must exceed 6 characters",
    },
    validate: (value) => {
      value <= 6 || "Passwords kurang";
    },
  };
  return (
    <>
      {(name == "password" ||
        name == "password_confirmation" ||
        name == "newPassword" ||
        name == "newPassword_confirmation") && (
        <div
          onClick={() => {
            setFocus(name);
          }}
          className={`relative ${className}`}
        >
          <label
            className={`relative w-full font-roboto-bold ${labelSize} text-left ${
              validationRules.required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
                : ""
            }`}
          >
            {label}
            {errors[name] && (
              <span
                className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
              >
                {errors[name].message}
              </span>
            )}
          </label>
          <input
            type={showPassword ? "text" : name}
            placeholder={placeholder}
            className="input input-bordered input-info w-full input-md h-[38px] max-w-3xl text-gray-900 focus:outline-none"
            {...register(name, validationRules)}
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
      )}
    </>
  );
};

export const ToggleInput = (props) => {
  const {
    inputRef,
    className,
    label,
    name,
    autoFocus = false,
    placeholder,
    type = name,
    formContext,
    onChange,
    // register,
    // setValue,
    // setFocus,
    // errors,
  } = props;

  // react-hook-form
  const {
    // data,
    // formType,
    getValues,
    register,
    setValue,
    setFocus,
    errors,
    setError,
    control,
    isValid,
    dirtyFields,
    watch,
  } = useContext(formContext);

  const [thisAdmin, setThisAdmin] = useState({
    superAuthorizationPassword: null,
    adminsId: null,
    authority: {
      chat: false,
      sort_warehouse: false,
      alter_price: false,
    },
  });
  const [toggleTypes, setToggleTypes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const id = useId();

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

  const isComponentMounted = useRef(true);

  useEffect(() => {
    // Hanya jalankan jika komponen sudah dimuat
    if (data.authority) {
      if (!isComponentMounted.current) {
        // console.log(Object.keys(thisAdmin.authority));
        setToggleTypes(Object.keys(thisAdmin.authority));
        const parsedAuthority = JSON.parse(data.authority);
        setThisAdmin((prevAdmin) => ({
          ...prevAdmin,
          superAuthorizationPassword: "superAdmin",
          adminsId: data.id,
          authority: {
            chat: parsedAuthority.chat,
            sort_warehouse: parsedAuthority.sort_warehouse,
            alter_price: parsedAuthority.alter_price,
          },
        }));
      }
    }
  }, [data]);

  const handleToggleChange = (toggleType) => {
    setThisAdmin((prevAdmin) => ({
      ...prevAdmin,
      authority: {
        ...prevAdmin.authority, // Tetapkan properti authority sebelumnya
        [toggleType]: !prevAdmin.authority[toggleType], // Perbarui properti sesuai dengan toggleType
      },
    }));
    setToggle(!toggle);
    setIsUpdated(true);
  };

  const updateAdminsAuthority = async (data) => {
    await axios
      .patch(URL_PUT, data)
      .then((data) => {
        console.info(data.data);
      })
      .catch((error) => {
        setToggle(!toggle);
        setErrorMessage(error.response.data.message);
        console.error(error);
      });
  };

  useEffect(() => {
    // Ketika komponen selesai dimuat, set ref ke false
    isComponentMounted.current = false;

    if (
      thisAdmin.superAuthorizationPassword &&
      thisAdmin.adminsId &&
      isUpdated // Hanya jalankan jika belum diupdate
    ) {
      console.info(data.username + " => " + data.authority);
      setToggle(!toggle);
      setIsUpdated(false); // Set state isUpdated ke true agar tidak dijalankan lagi
      updateAdminsAuthority(thisAdmin);
    }
  }, [thisAdmin]);

  return (
    <div className="w-full flex lg:flex-row justify-around items-center">
      <div className="bg-red-400 rounded-lg line-clamp-6 font-semibold text-red-900">
        {errorMessage}
      </div>
      {thisAdmin && (
        <>
          {toggleTypes.map((toggleType, index) => (
            <div key={toggleType}>
              <input
                // name="authority"
                type="checkbox"
                className={`toggle ${toggleColors[index]} m-2`}
                onChange={() => handleToggleChange(toggleType)}
                checked={thisAdmin?.authority?.[toggleType] || false}
              />
              <label htmlFor={toggleType}>
                {/* {console.info(thisAdmin.authority)} */}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export const TextArea = (props) => {
  const {
    inputRef,
    className,
    label,
    labelSize = "text-sm",
    name,
    placeholder,
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
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  } = useContext(ModalContext);

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

  const validationRules = {
    required: `This ${label} field is required`,
    maxLength: {
      value: 3000,
      message: label + " input must not exceed 3000 characters",
    },
    minLength: {
      value: 4,
      message: label + " input must exceed 4 characters",
    },
  };
  return (
    <div
      onClick={() => {
        setFocus(name);
      }}
      className={className}
    >
      {/* <p>{watch("product")}</p> */}
      <label
        className={`relative w-full font-roboto-bold ${labelSize} text-left ${
          validationRules.required
            ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
            : ""
        }`}
      >
        {label}
        {errors[name] && (
          <span
            className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
          >
            {errors[name].message}
          </span>
        )}
      </label>
      <div className="relative">
        <textarea
          ref={inputRef}
          className={`textarea textarea-info resize-y border rounded-md p-2 w-full h-60 text-gray-900 focus:outline-none 
        ${errors[name] ? "border-pink-500" : "border-sky-500"}`}
          placeholder={placeholder}
          {...register(name, validationRules)}
          onChange={(e) => {
            // console.log(name, ":", e.target.value);
            setValue(name, e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export const FilePictureInput = (props) => {
  const {
    inputRef,
    className,
    label,
    labelSize = "text-sm",
    name,
    placeholder,
    type = name,
    decimalOptions = 0,
    limitDigits,
    prefix,
    style,
  } = props;

  const [onDrag, setOnDrag] = useState(false);
  const [formattedValue, setFormattedValue] = useState(null);
  const [base64, setBase64] = useState(null);

  const [working, setWorking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const inputFileRef = useRef(null);

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

  const {
    table,
    data,
    formType,
    ready,
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

  const validationRules = {
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
  const pictValue = getValues("pict");

  useEffect(() => {
    // console.log("pictValue", getValues("pict"));
    if (!pictValue) {
      setValue("pict", "noChange");
    }
    // if (IsThisAnImage(pictValue)) {
    //   setFormattedValue("base64");
    // } else {
    //   setFormattedValue(null);
    // }
  }, [pictValue]);

  const hoverImpact = () => {
    return (
      <div
        onClick={() => {
          if (inputFileRef.current) {
            inputFileRef.current.click();
          }
        }}
        id="holder-upload"
        className="absolute rounded-lg flex flex-col items-center justify-center bg-black w-full h-full opacity-0 group-hover:opacity-50 transition-all delay-100 cursor-pointer"
      >
        <MuiIcon
          iconName="AddAPhotoRounded"
          className="text-white"
          fontSize={48}
        />
        <span className=" capitalize font-roboto-bold text-gray-100">
          Upload new Picture
        </span>
      </div>
    );
  };

  return (
    <>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setOnDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setOnDrag(true);
        }}
        onDragLeave={() => {
          setOnDrag(false);
        }}
        onDrop={() => {
          setOnDrag(false);
        }}
        className="relative flex flex-col justify-start items-center w-full xbg-indigo-300 min-h-[560px]"
      >
        <label
          className={`relative w-full font-roboto-bold ${labelSize} text-center ${
            validationRules.required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500 "
              : ""
          }`}
        >
          {label}
          {errors[name] && (
            <span
              className={`absolute right-0 top-0 text-red-500 ${BgColor} line-clamp-1`}
            >
              {errors[name].message}
            </span>
          )}
        </label>
        {!onDrag ? (
          <div className="relative pt-4">
            {working ? (
              <div className="relative group">
                {hoverImpact()}
                {base64 && (
                  <img
                    src={`${base64}`}
                    alt="Avatar Tailwind CSS Component"
                    className="w-96 rounded-md max-w-3xl shadow-lg"
                  />
                )}
              </div>
            ) : (
              <div className="relative group">
                {hoverImpact()}
                <img
                  src={
                    data.pict
                      ? table === "products"
                        ? `${ServerPublicProductImg}${data.pict}`
                        : table === "admins"
                        ? `${ServerPublicAdminImg}${data.pict}`
                        : table === "users"
                        ? `${ServerPublicUserImg}${data.pict}`
                        : `${ServerPublicProductImg}default.jpg`
                      : `${ServerPublicProductImg}default.jpg`
                  }
                  alt="Avatar Tailwind CSS Component"
                  className="object-contain min-w-[300px] min-h-[320px] h-[420px] w-[420px] max-w-[500px] max-h-[520px] rounded-md shadow-lg"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ) : (
          <>{/* <LoadingDaisyUI /> */}</>
        )}
        <CropperModal
          inputFileRef={inputFileRef}
          onDrag={onDrag}
          setOnDrag={(value) => setOnDrag(value)}
          onFileDrop={(file) => {
            setWorking(true);
            setBase64(null);
            // console.log("File yang diunggah:", file);
          }}
          // setLoading={(value) => {
          //   setBase64(null);
          //   setLoading(value);
          // }}
          setWorking={(value) => {
            setWorking(value);
          }}
          setBase64={(value) => {
            setBase64(value);
          }}
          setConfirm={(value) => {
            setConfirm(value);
          }}
          // setFormattedValue={(value) => {
          //   setFormattedValue(value);
          // }}
          setPict={(form) => {
            setValue("pict", form);
            if (IsThisAnImage(form)) {
              setBase64(form);
            } else {
              setBase64(null);
            }
          }}
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
  } = useContext(ModalContext);
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
          data.pict
            ? table === "products"
              ? `${ServerPublicProductImg}${data.pict}`
              : table === "admins"
              ? `${ServerPublicAdminImg}${data.pict}`
              : table === "users"
              ? `${ServerPublicUserImg}${data.pict}`
              : `${ServerPublicProductImg}default.jpg`
            : `${ServerPublicProductImg}default.jpg`
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
  const { data } = props;
  const { table } = useContext(ModalContext);
  const id = useId();

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div
        key={id}
        className="relative flex flex-row items-center justify-center"
      >
        {data.map((selected, index) => (
          <div
            key={selected.id}
            className="flex-col overflow-x-scroll overflow-y-hidden line-clamp-1 py-4 p-[2%]"
          >
            <img
              key={selected.id}
              src={
                selected.pict
                  ? table === "products"
                    ? `${ServerPublicProductImg}${selected.pict}`
                    : table === "admins"
                    ? `${ServerPublicAdminImg}${selected.pict}`
                    : table === "users"
                    ? `${ServerPublicUserImg}${selected.pict}`
                    : `${ServerPublicProductImg}default.jpg`
                  : `${ServerPublicProductImg}default.jpg`
              }
              alt="Avatar Tailwind CSS Component"
              className={`w-36 h-36 object-cover border-2 border-slate-500 `}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="relative  text-xl text-center line-clamp-2 s">
        <div className="flex gap-12 flex-row justify-center items-center font-semibold text-sm">
          <table className="w-full bg-white">
            <thead className={`bg-gray-200 font-roboto-regular`}>
              <tr>
                <th>No</th>
                <th>Nama {table}</th>
              </tr>
            </thead>
            <tbody className="font-roboto-medium max-h-20 overflow-y-scroll">
              {data.map((selected, index) => (
                <tr key={selected.id} className="divide-y p">
                  <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                  <td className="px-4 py-1 w-96 font-roboto-light">
                    <p key={selected.id}>
                      {table === "admins" && selected.username}
                      {table === "products" && selected.name}
                    </p>
                    <p></p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="my-4">Are you sure to delete these selected {table}?</h1>
      </div>
    </>
  );
};
