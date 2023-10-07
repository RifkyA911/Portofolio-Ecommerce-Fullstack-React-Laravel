import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
// Components
// UTILS
import axios from "axios";
import { MuiIcon } from "../utils/RenderIcons";
import { DangerAlert } from "./Alert";
import { AlterForm, DropForm, InsertForm } from "./Admins/AdminsForm";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const InfoModal = (props) => {
  const { thisAdmin, formType } = props;
  const [showModal, setShowModal] = useState(false);

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

  useLayoutEffect(() => {
    setShowModal(true);
  }, [thisAdmin, formType]);
  return (
    <>
      {/* {thisAdmin !== null && (
        <>
          {showModal && ( */}
      <div className="modal-list">
        <div className="list-modal">
          {/* {formType === "SHOW_PROFILE_PICTURE" && ( */}
          <dialog id="ShowPict" className={`${textColor} modal `}>
            <div
              className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden p-0`}
            >
              <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold text-xl py-4 line-clamp-2">
                  {thisAdmin?.username || "username?"}
                </h3>
                <img
                  src={`./src/assets/admin_avatar/${
                    thisAdmin?.pict || "default.png"
                  }`}
                  alt={`Profile Picture ${thisAdmin?.username || "username?"}`}
                  className="min-w-[470px] min-h-[470px] max-w-[470px] max-h-[470px] overflow-hidden rounded-lg border-4 border-gray-200"
                />
              </div>
              <div className="py-4">
                <small className="">
                  <span className="font-bold ">Updated At : </span>
                  {thisAdmin?.updated_at || "NaN"}
                </small>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* )} */}
          {/* {formType === "SHOW_GRANT_ACCESS_INFO" && ( */}
          <dialog id="TipsGrantAccess" className={`${textColor} modal `}>
            <div
              className={`modal-box ${BgColor} max-w-[350px] max-h-[600px] overflow-hidden`}
            >
              <p className="font-roboto-bold pb-8">
                Toggle's Colors Guide{" "}
                <i className="m-0 lg:mx-2 text-gray-400">
                  <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                </i>
              </p>
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
                  Sort Warehouse
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
                  Alter Price
                </span>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* )} */}
        </div>
      </div>
      {/* )}
        </>
      )} */}
    </>
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// setData({
//   superAuthorizationPassword: "superAdmin",
//   id: null,
//   email: null,
//   username: null,
//   pict: null,
//   role: null,
//   created_at: null,s
//   updated_at: null,
// });
export const ActionModalForm = (props) => {
  const { refresh, table, table_id, formType, clearData } = props;
  const [method, setMethod] = useState(null);
  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [page, setPage] = useState(0); // Halaman yang ingin ditampilkan (0 untuk halaman pertama)
  const pageSize = 10; // Jumlah data per halaman

  const [onWorking, setOnWorking] = useState(true);
  const [sending, setSending] = useState(false);
  // const [fetch, setFetch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useId();
  // Menghitung indeks awal dan akhir untuk slice
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  // Fungsi untuk mengganti halaman
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  let URL;
  let URL_METHODS;

  if (table == "admins") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_ADMIN + "/" + table_id;
    URL_METHODS = import.meta.env.VITE_API_URL_PUT_ADMIN;
  }

  // Define comp and defaultvalues data pada react-hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      superAuthorizationPassword: "superAdmin",
      email: "",
      username: "",
      role: 1,
      pict: "default.png",
      password: "123456",
      password_confirmation: "123456",
    },
  });

  useEffect(() => {
    if (formType === "INSERT") {
      setData({
        pict: "default.png",
        email: "",
      });
    } else if (formType === "ALTER_BY_ID" || formType === "DROP_BY_ID") {
      if (table_id !== "" || table_id !== null) {
        axios
          .get(URL)
          .then((response) => {
            console.table("fetching:", URL);
            setData({
              superAuthorizationPassword: "superAdmin",
              id: response.data.data.id,
              email: response.data.data.email,
              username: response.data.data.username,
              pict: response.data.data.pict,
              role: response.data.data.role,
              created_at: response.data.data.created_at,
              updated_at: response.data.data.updated_at,
            });
            setLoading(false);
            setErrorMessage(null);
            setMethod(formType);
          })

          .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrorMessage(error);
          });
      } else {
        setOnWorking(false);
        setLoading(false);
        setErrorMessage("invalid formType");
      }
    } else if (formType === "DROP_BY_SELECTED") {
      if (table_id !== null) {
        // Mengonversi objek "table_id" menjadi array dari objek-objek
        const dataArray = Object.values(table_id);

        // Mengubah struktur objek-objek dalam array
        const modifiedDataArray = dataArray.map((item) => ({
          ...item,
          superAuthorizationPassword: "superAdmin",
        }));

        // Set data dengan array yang sudah diubah strukturnya
        setData(modifiedDataArray);
      }
      // throw new Error(data);
      setLoading(false);
      setErrorMessage(null);
      setMethod(formType);
    } else {
      setLoading(false); // Jika table_id null, atur loading menjadi false tanpa menjalankan Axios.
    }
  }, [table_id]); // Gunakan table_id sebagai dependency untuk useEffect.

  // Config value for react-hook-form
  let initialFormValue;
  let passwordRef = useRef({});
  let newPasswordRef = useRef({});

  useEffect(() => {
    // if (data !== null) {
    //   const dataArray = Object.values(data).filter(
    //     (item) => typeof item === "object"
    //   );
    // }
    if (formType === "INSERT") {
      passwordRef.current = watch("password", "");

      initialFormValue = {
        superAuthorizationPassword: "superAdmin",
        email: "",
        username: "",
        role: 1,
        pict: "default.png",
        password: "123456f",
        password_confirmation: "123456f",
      };
    } else if (formType === "ALTER_BY_ID") {
      newPasswordRef.current = watch("newPassword", "");

      initialFormValue = {
        superAuthorizationPassword: "superAdmin",
        adminsId: data.id,
        email: data.email,
        username: data.username,
        role: data.role,
        pict: data.pict,
        newPassword: "123456",
        newPassword_confirmation: "123456",
      };
    } else if (formType === "DROP_BY_ID") {
      initialFormValue = {
        superAuthorizationPassword: "superAdmin",
        adminsId: data.id,
        email: data.email,
        username: data.username,
        role: data.role,
        pict: data.pict,
      };
    }
    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
    }
  }, [data]);

  // jika submit, lakukan req ke server
  let axiosResponse;

  async function sendFormDataByMethod(form) {
    setSending(!sending);
    try {
      if (formType === "INSERT") {
        axiosResponse = await axios.post(URL_METHODS, form);
        console.log("Input data baru berhasil :", axiosResponse);
      } else if (formType === "ALTER_BY_ID") {
        axiosResponse = await axios.put(URL_METHODS, form);
        console.log("Update data berhasil :", axiosResponse);
      } else if (formType === "DROP_BY_ID") {
        axiosResponse = await axios.delete(URL_METHODS, {
          data: {
            adminsId: form.adminsId,
            superAuthorizationPassword: form.superAuthorizationPassword,
          },
        });
        console.log("Data berhasil di drop:", axiosResponse);
      } else if (formType === "DROP_BY_SELECTED") {
        const deleteRequests = [];

        // Loop melalui data dan buat permintaan DELETE untuk setiap elemen
        for (const item of data) {
          // Buat permintaan DELETE dengan axios
          const deleteRequest = axios.delete(URL_METHODS, {
            data: {
              superAuthorizationPassword: item.superAuthorizationPassword,
              adminsId: item.id, // Sesuaikan dengan atribut yang sesuai
            },
          });

          deleteRequests.push(deleteRequest);
        }

        try {
          // Kirim semua permintaan DELETE secara bersamaan
          const responses = await axios.all(deleteRequests);
          console.log("Batch data berhasil dihapus:", responses);
          setData([]);
        } catch (error) {
          setData([]);
          console.error("Terjadi kesalahan saat menghapus batch data:", error);
        }
      }
      setData([]);
      // console.table(data);
      setSending(false);
      setErrorMessage(null);
      setLoading(false);
      setOnWorking(false);
      clearData(); // parent props
      refresh(); // parent props
    } catch (error) {
      setSending(false);
      setErrorMessage(error.message);
      console.info(error);
      console.error("Terjadi kesalahan:", error);
    }
  }

  // submit form handler
  const onSubmit = async (form) => {
    // console.table("data:", data);
    console.table("form:", form);
    if (!form) {
      alert("there is no form to send");
    }
    if (formType === "INSERT") {
      if (form.password !== form.password_confirmation) {
        setError("password", {
          type: "manual",
          message: "Passwords is not match with password_confirmation",
        });
        return;
      }
    } else if (formType === "ALTER_BY_ID") {
      if (form.newPasswordRef !== form.newPassword_confirmation) {
        setError("newPassword", {
          type: "manual",
          message: "Passwords is not match with new_password_confirmation",
        });
        return;
      }
    }

    await sendFormDataByMethod(form);
  };

  const ModalContextValue = {
    // MyTable
    refresh,
    clearData,
    // Modal
    data,
    formType,
    showPassword,
    setShowPassword: () => setShowPassword(!showPassword),
    //react-hook-form
    passwordRef,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  };

  return (
    <>
      <ModalContext.Provider value={ModalContextValue}>
        <dialog id="AdminForm" className="modal">
          <div
            className={`modal-box h-auto w-12/12 ${
              formType === "ALTER_BY_ID" || formType === "INSERT"
                ? "max-w-6xl"
                : "max-w-3xl"
            } bg-gray-50 overflow-y-scroll cursor-auto`}
          >
            <form method="dialog">
              <button
                onClick={() => {
                  refresh();
                  clearData();
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-200"
              >
                <MuiIcon iconName="CloseRounded" />
              </button>
            </form>
            <div className="flex flex-row justify-between items-center gap-2 pr-8">
              <h3 className="font-bold text-lg p-0 text-left w-4/12">
                {formType === "INSERT" && `Add New Admin`}
                {formType === "ALTER_BY_ID" && `Edit Data Admin`}
                {formType === "DROP_BY_ID" && `Delete This Admin`}
                {formType === "DROP_BY_SELECTED" && `Delete Multiple Admin`}
              </h3>
              {errorMessage ? (
                <>
                  <h4
                    key={id}
                    className={`p-1 font-roboto-bold w-8/12 text-red-800 bg-red-300 rounded-md max-h-[28px] overflow-scroll`}
                  >
                    {Object.keys(errors).map((fieldName) => (
                      <DangerAlert
                        key={fieldName}
                        message={errors[fieldName].message}
                        className={`p-2 font-roboto-bold`}
                      ></DangerAlert>
                    ))}
                    {errorMessage}
                  </h4>
                </>
              ) : (
                <small>
                  <span className="font-bold"></span>
                </small>
              )}
              {sending && (
                <span className="loading loading-dots loading-md"></span>
              )}
            </div>
            {data !== undefined && data !== null && (
              <div className="content">
                {!loading ? (
                  <>
                    {onWorking ? (
                      // =========================== Main Form ========================
                      <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <input
                          type="hidden"
                          {...register("superAuthorizationPassword", {
                            required:
                              "Your Credentials superAuthorizationPassword are required",
                            value: "superAdmin",
                          })}
                        />
                        {/* =================== INSERT====================== */}
                        {formType === "INSERT" && (
                          <>
                            <InsertForm />
                          </>
                        )}
                        {/* =================== ALTER ====================== */}
                        {formType === "ALTER_BY_ID" && (
                          <>
                            <AlterForm />
                          </>
                        )}
                        {/* =================== DROP ====================== */}
                        {(formType === "DROP_BY_ID" ||
                          formType === "DROP_BY_SELECTED") && (
                          <DropForm formType={formType} data={data} />
                        )}
                      </form>
                    ) : (
                      <>
                        <h1 className="font-roboto-bold py-8 text-xl">
                          Modal Logic Error !
                        </h1>
                      </>
                    )}
                    {/* end of onWorking */}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
                {/* end of loading */}
              </div>
            )}
          </div>
        </dialog>
      </ModalContext.Provider>
    </>
  );
};

export default ModalContext;
