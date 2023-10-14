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
import {
  AdminsAlterForm,
  AdminsDropForm,
  AdminsInsertForm,
} from "./Admins/AdminsForm";
import {
  ProductsAlterForm,
  ProductsDropForm,
  ProductsInsertForm,
} from "./Products/ProductsForm";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const TipsModal = (props) => {
  const { table_id, formType } = props;
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
    if (table_id !== null && formType) {
      const dialogElement = document.getElementById("TipsGrantAccess");
      if (dialogElement) {
        dialogElement.showModal();
      }
    }
  }, [table_id, formType]);

  return (
    <>
      {table_id !== null && (
        <div className="modal-list">
          <div className="list-modal">
            {formType === "SHOW_GRANT_ACCESS_TIPS" && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const InfoModal = (props) => {
  const { showModal, setShowModal, table_id, formType } = props;

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
    if (table_id !== null && formType) {
      const dialogElement = document.getElementById("ShowPict");
      if (dialogElement) {
        dialogElement.showModal();
      }
    }
  }, [table_id, formType]);

  // useEffect(() => {
  //   console.table(props);
  // }, [table_id, formType, showModal]);

  return (
    <>
      {table_id !== null && (
        <>
          {showModal && (
            <div className="modal-list">
              <div className="list-modal">
                {formType === "SHOW_ADMIN_PROFILE_PICTURE" && (
                  <dialog id="ShowPict" className={`${textColor} modal `}>
                    <div
                      className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden p-0`}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl py-4 line-clamp-2">
                          {table_id?.username || "username?"}
                        </h3>
                        <img
                          src={`./src/assets/admin_avatar/${
                            table_id?.pict || "default.png"
                          }`}
                          alt={`Profile Picture ${
                            table_id?.username || "username?"
                          }`}
                          className="min-w-[470px] min-h-[470px] max-w-[470px] max-h-[470px] overflow-hidden rounded-lg border-4 border-gray-200"
                        />
                      </div>
                      <div className="py-4">
                        <small className="">
                          <span className="font-bold ">Updated At : </span>
                          {table_id?.updated_at || "NaN"}
                        </small>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                )}
                {formType === "SHOW_PRODUCT_PICTURE" && (
                  <dialog id="ShowPict" className={`${textColor} modal `}>
                    <div
                      className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden p-0`}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-xl py-4 line-clamp-2">
                          {table_id?.name || "This Product"}
                        </h3>
                        <img
                          src={`./src/assets/products/${
                            table_id?.pict || "default.png"
                          }`}
                          alt={`Profile Picture ${
                            table_id?.name || "username?"
                          }`}
                          className="min-w-[470px] min-h-[470px] max-w-[470px] max-h-[470px] overflow-hidden rounded-lg border-4 border-gray-200"
                        />
                      </div>
                      <div className="py-4">
                        <small className="">
                          <span className="font-bold ">Updated At : </span>
                          {table_id?.updated_at || "NaN"}
                        </small>
                      </div>
                    </div>
                    <form
                      method="dialog"
                      className="modal-backdrop"
                      onClick={setShowModal}
                    >
                      <button>close</button>
                    </form>
                  </dialog>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

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
  const { refresh, table, table_id, select, formType, clearData } = props;
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

  // Fungsi untuk mengganti halaman
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  let URL;
  let URL_METHODS;

  if (table === "admins") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_ADMIN + "/" + table_id;
    URL_METHODS = import.meta.env.VITE_API_URL_PUT_ADMIN;
  } else if (table === "products") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_PRODUCT + "/" + table_id;
    URL_METHODS = import.meta.env.VITE_API_URL_PUT_PRODUCT;
  } else if (table === "orders") {
    URL = import.meta.env.VITE_API_URL_GET_BY_ID_TRANSACTION + "/" + table_id;
    URL_METHODS = import.meta.env.VITE_API_URL_PUT_TRANSACTION;
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
    },
  });

  useEffect(() => {
    if (formType === "INSERT") {
      setData({
        pict: "default.png",
        email: "",
      });
    } else if (formType === "ALTER_BY_ID" || formType === "DROP_BY_ID") {
      // temp method: ini perlu dilakukan untuk menampilkan update setiap ada data baru
      if (table_id !== "" && table_id !== null) {
        axios
          .get(URL)
          .then((response) => {
            console.table("fetching:", URL);
            switch (table) {
              case `admins`:
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
                break;
              case `products`:
                setData({
                  superAuthorizationPassword: "superAdmin",
                  id: response.data.data.id,
                  name: response.data.data.name,
                  price: response.data.data.price,
                  category: response.data.data.category,
                  stock: response.data.data.stock,
                  discount: response.data.data.discount,
                  pict: response.data.data.pict,
                  description: response.data.data.description,
                  created_at: response.data.data.created_at,
                  updated_at: response.data.data.updated_at,
                });
                break;
              default:
                break;
            }
            setLoading(false);
            setErrorMessage(null);
            setMethod(formType);
          })
          .catch((error) => {
            if (error.response) {
              // Tangani kesalahan respons dari server
              console.log("Response error:", error.response.data);
            } else if (error.request) {
              // Tangani kesalahan permintaan (misalnya tidak ada koneksi)
              console.log("Request error:", error.request);
            } else {
              // Kesalahan lainnya
              console.log("Error:", error.message);
            }
            setLoading(false);
            setErrorMessage(error.message || "An error occurred.");
          });
      } else {
        setOnWorking(false);
        setLoading(false);
        setErrorMessage(
          "Invalid table_id. It should not be an empty string or null."
        );
      }
    } else if (formType === "DROP_BY_SELECTED") {
      if (table_id !== null && table !== null) {
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
  }, [table_id, formType]); // Gunakan table_id sebagai dependency untuk useEffect.

  // Config value for react-hook-form
  let initialFormValue;
  let passwordRef = useRef({});

  useEffect(() => {
    console.table(table);
    if (formType === "INSERT") {
      switch (table) {
        case `admins`:
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
          break;
        case `products`:
          initialFormValue = {
            superAuthorizationPassword: "superAdmin",
            pict: "default.jpg",
          };
          break;
        default:
          break;
      }
    } else if (formType === "ALTER_BY_ID") {
      switch (table) {
        case `admins`:
          initialFormValue = {
            superAuthorizationPassword: "superAdmin",
            adminsId: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
            pict: data.pict,
            newPassword: "123456FF",
            newPassword_confirmation: "123456FF",
            p: "p",
          };
          break;
        case `products`:
          initialFormValue = {
            superAuthorizationPassword: "superAdmin",
            productId: data.id,
            name: data.name,
            price: parseInt(data.price),
            category: data.category,
            stock: parseInt(data.stock),
            discount: parseFloat(data.discount),
            pict: data.pict,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };

          break;
        default:
          break;
      }
    } else if (formType === "DROP_BY_ID") {
      switch (table) {
        case `admins`:
          initialFormValue = {
            superAuthorizationPassword: "superAdmin",
            adminsId: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
            pict: data.pict,
          };
          break;
        case `products`:
          initialFormValue = {
            superAuthorizationPassword: "superAdmin",
            id: data.id,
            name: data.name,
            category: data.category,
            stock: parseInt(data.stock),
            discount: parseFloat(data.discount),
            pict: data.pict,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
          break;
        default:
          break;
      }
    }
    for (const key in initialFormValue) {
      setValue(key, initialFormValue[key]);
    }
    initialFormValue = null;
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
        // Loop melalui data dan buat permintaan DELETE untuk setiap elemen
        const deleteRequests = []; // Deklarasikan sebagai array
        for (const item of data) {
          // Buat permintaan DELETE dengan axios
          let deleteRequest; // Deklarasikan sebagai let
          switch (table) {
            case `admins`:
              deleteRequest = axios.delete(URL_METHODS, {
                data: {
                  superAuthorizationPassword: item.superAuthorizationPassword,
                  adminsId: item.id, // Sesuaikan dengan atribut yang sesuai
                },
              });
              break;
            case `products`:
              deleteRequest = axios.delete(URL_METHODS, {
                data: {
                  superAuthorizationPassword: item.superAuthorizationPassword,
                  productsId: item.id, // Sesuaikan dengan atribut yang sesuai
                },
              });
              break;
            default:
              break;
          }

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
    console.table("data:", data);
    if (!form) {
      alert("there is no form to send");
    }

    await sendFormDataByMethod(form);
  };

  const ModalContextValue = {
    // MyTable
    table,
    refresh,
    clearData,
    // Modal
    data,
    setData,
    select,
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
        <dialog id="ModalForms" className="modal">
          <div
            className={`modal-box h-auto w-12/12 ${
              formType === "ALTER_BY_ID" || formType === "INSERT"
                ? "max-w-6xl"
                : "max-w-3xl"
            } bg-gray-50 overflow-y-scroll cursor-auto p-0`}
          >
            <form method="dialog" className={` sticky top-0 z-10`}>
              <button
                onClick={() => {
                  refresh();
                  clearData();
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3 hover:bg-red-300"
              >
                <MuiIcon iconName="CloseRounded" />
              </button>
            </form>
            <div
              className={`bg-slate-50 sticky top-0 flex flex-row justify-between items-center gap-2 pr-16 max-h-[60px]`}
            >
              <h3 className="p-4 w-4/12 font-bold text-lg text-left capitalize">
                {formType === "INSERT" && `Add New ${table}`}
                {formType === "ALTER_BY_ID" && `Edit Data ${table}`}
                {formType === "DROP_BY_ID" && `Delete This ${table}`}
                {formType === "DROP_BY_SELECTED" && `Delete Multiple ${table}`}
              </h3>
              {errorMessage ? (
                <>
                  <h4
                    key={id}
                    className={`p-1 font-roboto-bold w-8/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                  >
                    {/* {Object.keys(errors).map((fieldName) => (
                      <>
                        <span key={fieldName}>{errors[fieldName].message}</span>
                      </>
                    ))} */}
                    {console.log(errors)}
                    {errorMessage}
                  </h4>
                </>
              ) : (
                <div className="block p-4 bg-slate-50 font-roboto-bold w-8/12 overflow-scroll h-full z-[70]"></div>
              )}
              {sending && (
                <>
                  <span className="loading loading-dots loading-md"></span>
                </>
              )}
            </div>
            {data !== undefined && data !== null ? (
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
                          })}
                        />
                        {setValue("superAuthorizationPassword", "superAdmin")}{" "}
                        {/* Panggilan setValue diluar input */}
                        {table === "admins" && (
                          <>
                            {formType === "INSERT" && (
                              <>
                                <AdminsInsertForm />
                              </>
                            )}
                            {formType === "ALTER_BY_ID" && (
                              <>
                                <AdminsAlterForm />
                              </>
                            )}
                            {(formType === "DROP_BY_ID" ||
                              formType === "DROP_BY_SELECTED") && (
                              <>
                                <AdminsDropForm />
                              </>
                            )}
                          </>
                        )}
                        {table === "products" && (
                          <>
                            {formType === "INSERT" && (
                              <>
                                <ProductsInsertForm />
                              </>
                            )}
                            {formType === "ALTER_BY_ID" && (
                              <>
                                <ProductsAlterForm />
                              </>
                            )}
                            {(formType === "DROP_BY_ID" ||
                              formType === "DROP_BY_SELECTED") && (
                              <>
                                <ProductsDropForm />
                              </>
                            )}
                          </>
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
                  <>
                    <p>Loading...</p>
                  </>
                )}
                {/* end of loading */}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-8 flex-col min-h-[500px]">
                <h1 className="font-poppins-medium text-xl">
                  Loading Render Form...
                </h1>
                <div className="flex-row">
                  <span className="loading loading-bars loading-lg"></span>
                </div>
              </div>
            )}
            {/* end of data */}
          </div>
        </dialog>
      </ModalContext.Provider>
    </>
  );
};

export default ModalContext;
