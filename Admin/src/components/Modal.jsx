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
import Barcode from "react-jsbarcode";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

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
import { ProductsInputForm, ProductsDropForm } from "./Products/ProductsForm";
import { ConfirmButton } from "./Button";
import { DownloadBtnReactPDF, LookReactPDF } from "./Print/Print";
import { GetDateTime } from "../utils/Formatter";

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;

export const ModalContext = createContext();

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
                <dialog id="ShowPict" className={`${textColor} modal `}>
                  <div
                    className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden p-0`}
                  >
                    {formType === "SHOW_ADMIN_PROFILE_PICTURE" && (
                      <>
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
                      </>
                    )}
                    {formType === "SHOW_PRODUCT_PICTURE" && (
                      <>
                        <div className="flex flex-col justify-center items-center">
                          <h3 className="font-bold text-xl py-4 line-clamp-2">
                            {table_id?.name || "This Product"}
                          </h3>
                          <img
                            src={`${ServerProductsImg}${
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
                      </>
                    )}
                    {formType === "SHOW_PRODUCT_BARCODE" && (
                      <>
                        <div className="flex flex-col justify-center items-center">
                          <h3 className="font-bold text-xl py-4 line-clamp-2">
                            {table_id?.name || "This Product"}
                          </h3>
                          <Barcode
                            className={`h-[150px] p-0 m-0 max-w-[300px]`}
                            value={table_id?.barcode}
                            // options={{ format: "EAN13" }}
                          />
                        </div>
                        <div className="py-4">
                          <small className="">
                            <span className="font-bold ">Updated At : </span>
                            {table_id?.updated_at || "NaN"}
                          </small>
                        </div>
                      </>
                    )}
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const ActionModalForm = (props) => {
  const { refresh, table, table_id, select, formType, clearData } = props;

  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [onWorking, setOnWorking] = useState(true);
  const [sending, setSending] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useId();
  // console.log(props);
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

  let URL_BY_ID;
  let URL_STORE;
  let URL_ALL; // UPDATE,PATCH,DROP

  if (table === "admins") {
    URL_BY_ID = import.meta.env.VITE_API_ID_ADMIN + "/" + table_id;
    URL_STORE = import.meta.env.VITE_API_STORE_ADMIN;
    URL_ALL = import.meta.env.VITE_API_ALL_ADMIN;
  } else if (table === "products") {
    URL_BY_ID = import.meta.env.VITE_API_ID_PRODUCT + "/" + table_id;
    URL_STORE = import.meta.env.VITE_API_STORE_PRODUCT;
    URL_ALL = import.meta.env.VITE_API_ALL_PRODUCT;
  } else if (table === "orders") {
    URL_BY_ID = import.meta.env.VITE_API_ID_TRANSACTION + "/" + table_id;
    URL_STORE = import.meta.env.VITE_API_STORE_TRANSACTION;
    URL_ALL = import.meta.env.VITE_API_ALL_TRANSACTION;
  }

  // ========================== Query Data ==========================

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
          .get(URL_BY_ID)
          .then((response) => {
            console.table("fetching:", URL_BY_ID);
            setData(response.data.data);
            setLoading(false);
            setErrorMessage(null);
          })
          .catch((error) => {
            if (error.response) {
              console.log("Response error:", error.response.data);
            } else if (error.request) {
              console.log("Request error:", error.request);
            } else {
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
        const dataArray = Object.values(table_id);
        const modifiedDataArray = dataArray.map((item) => ({
          ...item,
          superAuthorizationPassword: SuperAdminKey,
        }));
        setData(modifiedDataArray);
      }
      setLoading(false);
      setErrorMessage(null);
    } else {
      setLoading(false);
    }
  }, [table_id, formType]);

  // ========================== Config react-hook-form  ==========================
  // Define comp and defaultvalues data pada react-hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      superAuthorizationPassword: SuperAdminKey,
    },
  });

  // set values by state data
  let initialFormValue;
  let passwordRef = useRef({});
  useEffect(() => {
    // console.table(table);
    // console.log(data);
    if (formType === "INSERT") {
      switch (table) {
        case `admins`:
          passwordRef.current = watch("password", "");

          initialFormValue = {
            superAuthorizationPassword: SuperAdminKey,
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
            superAuthorizationPassword: SuperAdminKey,
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
            superAuthorizationPassword: SuperAdminKey,
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
            superAuthorizationPassword: SuperAdminKey,
            productId: data.id,
            barcode: data.barcode,
            name: data.name,
            price: parseInt(data.price),
            category_id: data.category.id,
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
            superAuthorizationPassword: SuperAdminKey,
            adminsId: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
            pict: data.pict,
          };
          break;
        case `products`:
          initialFormValue = {
            superAuthorizationPassword: SuperAdminKey,
            productsId: data.id,
            name: data.name,
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
    console.log(formType, table_id);
    try {
      if (formType === "INSERT") {
        axiosResponse = await axios.post(URL_STORE, form);
        console.log("Input data baru berhasil :", axiosResponse);
      } else if (formType === "ALTER_BY_ID") {
        axiosResponse = await axios.put(URL_ALL, form);
        console.log("Update data berhasil :", axiosResponse);
      } else if (formType === "DROP_BY_ID") {
        switch (table) {
          case `admins`:
            axiosResponse = await axios.delete(URL_ALL, {
              data: {
                adminsId: form.adminsId,
                superAuthorizationPassword: form.superAuthorizationPassword,
              },
            });
            break;
          case `products`:
            axiosResponse = await axios.delete(URL_ALL, {
              data: {
                productsId: form.productsId,
                superAuthorizationPassword: form.superAuthorizationPassword,
              },
            });
            break;
          default:
            break;
        }
        console.log("Data berhasil di drop:", axiosResponse);
      } else if (formType === "DROP_BY_SELECTED") {
        // Loop melalui data dan buat permintaan DELETE untuk setiap elemen
        const deleteRequests = []; // Deklarasikan sebagai array
        for (const item of data) {
          // Buat permintaan DELETE dengan axios
          let deleteRequest; // Deklarasikan sebagai let
          switch (table) {
            case `admins`:
              deleteRequest = axios.delete(URL_ALL, {
                data: {
                  superAuthorizationPassword: item.superAuthorizationPassword,
                  adminsId: item.id, // Sesuaikan dengan atribut yang sesuai
                },
              });
              break;
            case `products`:
              deleteRequest = axios.delete(URL_ALL, {
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
      setErrorMessage(error.response.data.message);
      console.info(error);
      console.error("Terjadi kesalahan:", error);
    }
  }

  // submit form handler
  const onSubmit = async (form) => {
    console.info("data form:", form);
    console.log("Kesalahan dalam formulir:", errors);
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
    setFocus,
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
              <div className="p-4 w-5/12 font-bold text-lg text-left capitalize ">
                {formType === "INSERT" && `Add New ${table}`}
                {formType === "ALTER_BY_ID" && `Edit Data ${table}`}
                {formType === "DROP_BY_ID" && `Delete This ${table}`}
                {formType === "DROP_BY_SELECTED" && `Delete Multiple ${table}`}
              </div>
              {errorMessage ? (
                <>
                  <div
                    key={id}
                    className={`p-1 font-roboto-bold w-7/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                  >
                    {/* {Object.keys(errors).map((fieldName) => (
                      <>
                        <span key={fieldName}>{errors[fieldName].message}</span>
                      </>
                    ))} */}
                    {console.log(errors)}
                    {errorMessage}
                  </div>
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
                        {setValue("superAuthorizationPassword", SuperAdminKey)}{" "}
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
                            {(formType === "INSERT" ||
                              formType === "ALTER_BY_ID") && (
                              <>
                                <ProductsInputForm />
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

export const PrintModal = (props) => {
  const { refresh, table, table_id, select, formType, clearData } = props;

  const [data, setData] = useState();
  const [onWorking, setOnWorking] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = useId();
  // useEffect(() => {
  //   console.log(props);
  // }, [table_id]);
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
  let URL_BY_ID;
  let URL_ALL;
  if (table === "admins") {
    URL_BY_ID = import.meta.env.VITE_API_ID_ADMIN + "/" + table_id;
    URL_ALL = import.meta.env.VITE_API_ALL_ADMIN + "/print";
  } else if (table === "products") {
    URL_BY_ID = import.meta.env.VITE_API_ID_PRODUCT + "/" + table_id;
    URL_ALL = import.meta.env.VITE_API_ALL_PRODUCT + "/print";
  } else if (table === "orders") {
    URL_BY_ID = import.meta.env.VITE_API_ID_TRANSACTION + "/" + table_id;
    URL_ALL = import.meta.env.VITE_API_ALL_TRANSACTION + "/print";
  }

  useEffect(() => {
    if (table_id !== "" && table_id !== null) {
      if (formType === "PRINT_BY_ID") {
        // temp method: ini perlu dilakukan untuk menampilkan update setiap ada data baru
        axios
          .get(URL_BY_ID)
          .then((response) => {
            console.table("fetching:", URL_BY_ID);
            setData(response.data.data);
            setLoading(false);
            setErrorMessage(null);
            setOnWorking(true);
          })
          .catch((error) => {
            if (error.response) {
              console.log("Response error:", error.response.data);
            } else if (error.request) {
              console.log("Request error:", error.request);
            } else {
              console.log("Error:", error.message);
            }
            setLoading(false);
            setErrorMessage(error.message || "An error occurred.");
          });
      } else if (formType === "PRINT_BATCH") {
        const dataArray = Object.values(table_id);
        // return console.log("dataArray", dataArray);
        // Ekstrak seluruh ID dari array dan letakkan dalam array terpisah
        const ids = dataArray.map((item) => item.id);
        //////////////////////////////////////////////////////////////////////////////////////
        axios
          .post(URL_ALL, { ids: ids })
          .then((response) => {
            // return console.log(response.data);
            console.table("fetching:", URL_ALL);
            // setData([response.data.data]);
            setData(response.data.data);
            setOnWorking(true);
            setLoading(false);
            setErrorMessage(null);
          })
          .catch((error) => {
            if (error.response) {
              console.log("Response error:", error.response.data);
            } else if (error.request) {
              console.log("Request error:", error.request);
            } else {
              console.log("Error:", error.message);
            }
            setLoading(false);
            setErrorMessage(error.message || "An error occurred.");
          });
      } else {
        setLoading(false); // Jika table_id null, atur loading menjadi false tanpa menjalankan Axios.
        setOnWorking(false);
      }
    }
  }, [table_id, formType]); // Gunakan table_id sebagai dependency untuk useEffect.

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  // useEffect(() => {
  //   console.log(errorMessage);
  // }, [errorMessage]);

  return (
    <>
      <dialog id="PrintModal" className="modal">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div
          className={`modal-box h-full w-11/12 max-w-7xl bg-transparent backdrop-blur-sm overflow-y-auto cursor-auto p-0`}
        >
          <div className="bg-white bg-opacity-40 backdrop-blur-xl">
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
              className={`bg-transparent sticky top-0 flex flex-row justify-between items-center gap-2 pr-16 max-h-[60px]`}
            >
              <div className="p-4 w-5/12 font-bold text-lg text-left capitalize">
                {formType === "PRINT_BATCH" && `Print Multiple ${table}`}
                {formType === "PRINT_BY_ID" && `Print a ${table}`}
              </div>
              {errorMessage ? (
                <>
                  <div
                    key={id}
                    className={`p-1 font-roboto-bold w-7/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                  >
                    {errorMessage}
                  </div>
                </>
              ) : (
                <div className="block p-4 bg-transparent font-roboto-bold w-8/12 overflow-scroll h-full z-[70]"></div>
              )}
            </div>
          </div>
          {data !== undefined && data !== null ? (
            <div className="content">
              {!loading ? (
                <>
                  {onWorking ? (
                    // =========================== Main Form ========================
                    <form autoComplete="off">
                      <div className="relative flex flex-row p-4">
                        <LookReactPDF inputData={data} table={table} />
                        <DownloadBtnReactPDF
                          formType={formType}
                          inputData={data}
                          table={table}
                        />
                      </div>
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
      {/* </ModalContext.Provider> */}
    </>
  );
};

export const CropperModal = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [modal, setModal] = useState(false);

  const {
    data,
    setData,
    formType,
    showPassword,
    setShowPassword,
    // react-hook-form
    newPasswordRef,
    register,
    getValues,
    setValue,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
  } = useContext(ModalContext);

  const cropperRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Maksimal ukuran file dalam byte (512KB)
    // const maxSize = 512 * 1024;
    const maxSize = 10000 * 1024;

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        alert("File terlalu besar. Maksimal 512KB diperbolehkan.");
        e.target.value = ""; // Menghapus pilihan file yang tidak valid
      } else {
        // Baca file gambar
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            // Maksimal lebar dan tinggi gambar
            // const maxWidth = 512;
            // const maxHeight = 512;
            const maxWidth = 5112;
            const maxHeight = 5112;

            if (img.width > maxWidth || img.height > maxHeight) {
              alert(
                "Dimensi gambar terlalu besar. Maksimal 512px x 512px diperbolehkan."
              );
              e.target.value = ""; // Menghapus pilihan file yang tidak valid
            } else {
              reader.onload = (event) => {
                setImage(event.target.result);
                setModal(true);
              };

              reader.readAsDataURL(selectedFile);
            }
          };
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  // useEffect(() => {
  //   console.log("pict values :", getValues("pict"));
  // }, [getValues("pict")]);

  const applyCroppedImage = () => {
    if (cropperRef.current) {
      // Pastikan gambar telah dimuat sepenuhnya
      if (cropperRef.current.cropper.getCroppedCanvas) {
        // Dapatkan data hasil pemangkasan
        const croppedDataUrl = cropperRef.current.cropper
          .getCroppedCanvas()
          .toDataURL();
        // console.log("Data gambar hasil pemangkasan:", croppedDataUrl);
        setCroppedImage(croppedDataUrl);
        setValue("pict", croppedDataUrl);

        // Kirim gambar hasil pemangkasan ke server Laravel
        // fetch("URL_SERVER_LARAVEL/uploadImage", {
        //   method: "POST",
        //   body: JSON.stringify({ image: croppedDataUrl }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const imagePath = data.imagePath;
        //     // Lakukan sesuatu dengan imagePath, seperti menampilkannya di komponen React
        //   });
      }
    }
  };

  return (
    <div>
      <input
        className="file-input file-input-bordered file-input-md w-64 text-sm mt-6"
        type="file"
        accept="image/*"
        {...register("pict", {
          required: "This pict are required",
        })}
        onChange={handleFileChange}
        onClick={() => document.getElementById("croppers").showModal()}
      />
      <dialog id="croppers" className="modal">
        {image && (
          <div className="modal-box w-12/12 max-w-3xl ">
            <form method="dialog">
              <button
                // onClick={() => setImage(null)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            <h3 className="font-bold text-lg">Hello!</h3>
            <div className={`p-4 `}>
              <Cropper
                ref={cropperRef}
                src={image}
                aspectRatio={8 / 8} // Sesuaikan dengan rasio aspek yang Anda inginkan
                guides={true}
                zoomable={false} // Mencegah zoom
              />
            </div>
            <ConfirmButton
              confirmType="confirm"
              onClick={() => {
                applyCroppedImage();
              }}
            />
            <div className="modal-action">
              <form method="dialog"></form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default ModalContext;
