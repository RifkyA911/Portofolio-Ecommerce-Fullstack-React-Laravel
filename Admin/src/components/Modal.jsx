import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Barcode from "react-jsbarcode";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadBtnReactPDF, LookReactPDF } from "./Print/Print";
import { Dialog, Transition } from "@headlessui/react";
// Components
import { DateRecord } from "./Span";
import { AdminsDropForm, AdminsInputForm } from "./Admins/AdminsForm";
import { ProductsInputForm, ProductsDropForm } from "./Products/ProductsForm";
import { MotionButton } from "./Button";
// UTILS
import { MuiIcon } from "../utils/RenderIcons";
import { PrintDummies } from "../utils/PlaceHolder";
import { DateFormatter } from "../utils/Formatter";
//CONFIG
import { motionProps } from "../Config/MotionProps";
import { AreaDropZone } from "./Area";
import RequestAPI from "../Config/API";

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerAPIAdminsImg = import.meta.env.VITE_API_ID_ADMIN + "/image/";
const ServerAPIProductsImg = import.meta.env.VITE_API_ID_PRODUCT + "/image/";
const ServerPublicProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
const ServerPublicAdminsImg = import.meta.env.VITE_SERVER_PUBLIC_ADMIN;

export const ModalContext = createContext();

export const MainModalHandler = (props) => {
  const {
    table,
    table_id,
    showModal,
    setShowModal,
    modalType,
    formType,
    clearData,
    setResultStatus,
    select,
    refresh,
  } = props;

  const [data, setData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [onWorking, setOnWorking] = useState(true);
  const [sending, setSending] = useState(false);

  const [ready, setReady] = useState(true);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const id = useId();

  const tableMappings = {
    admins: { URL_BY_ID: "admin", URL_ALL: "admins" },
    products: { URL_BY_ID: "product", URL_ALL: "products" },
    orders: { URL_BY_ID: "order", URL_ALL: "orders" },
  };

  const { URL_BY_ID, URL_ALL } = tableMappings[table] || {}; // Jika table tidak sesuai dengan kunci di dalam objek, URL_BY_ID dan URL_ALL akan menjadi undefined.

  // ========================== Initial Query Data ==========================
  const fetchData = async (endpoint, method, table, form) => {
    // console.table("fetching:", endpoint, form);
    try {
      const { data } = await RequestAPI(endpoint, method, form);
      // console.log("response:", data);
      setData(data.data);
      setLoading(false);
      setErrorMessage(null);
      setOnWorking(true);
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setLoading(false);
      setErrorMessage(error.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (formType === "INSERT") {
      setData({
        pict: "default.jpg",
      });
    } else if (
      formType === "ALTER_BY_ID" ||
      formType === "DROP_BY_ID" ||
      formType === "PRINT_BY_ID" ||
      formType === "SHOW_PRODUCT_BARCODE" ||
      formType === "SHOW_PRODUCT_PICTURE" ||
      formType === "SHOW_ADMIN_PROFILE_PICTURE" ||
      formType === "TEST_BULK"
    ) {
      if (table_id !== "" && table_id !== null) {
        fetchData(URL_BY_ID, "GET", table, { id: table_id });
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
        // const modifiedDataArray = dataArray.map((item) => ({
        //   ...item,
        //   superAuthorizationPassword: SuperAdminKey,
        // }));
        setData(dataArray);
      }
      setLoading(false);
      setErrorMessage(null);
    } else if (formType === "PRINT_BATCH") {
      // Ekstrak seluruh ID dari array dan letakkan dalam array terpisah
      const dataArray = Object.values(table_id);
      const ids = dataArray.map((item) => item.id);

      fetchData(URL_ALL + "/print", "POST", table, { ids: ids });
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
    // defaultValues: {
    //   table: table,
    // },
  });

  // set values by state data
  let initialFormValue;
  let passwordRef = useRef({});
  useEffect(() => {
    // console.table(table);
    // console.log(data);
    // if (formType === "INSERT") {
    //   switch (table) {
    //     case `admins`:
    //       passwordRef.current = watch("password", "");
    //       initialFormValue = {
    //         email: "",
    //         username: "",
    //         role: 1,
    //         pict: "default.jpg",
    //       };
    //       break;
    //     case `products`:
    //       initialFormValue = {
    //         pict: "default.jpg",
    //       };
    //       break;
    //     default:
    //       break;
    //   }
    // } else if (formType === "ALTER_BY_ID") {
    //   switch (table) {
    //     case `admins`:
    //       initialFormValue = {
    //         id: data.id,
    //         email: data.email,
    //         username: data.username,
    //         role: data.role,
    //         pict: data.pict,
    //       };
    //       break;
    //     case `products`:
    //       // console.log(data);
    //       initialFormValue = {
    //         id: data.id,
    //         barcode: data.barcode,
    //         name: data.name,
    //         price: parseInt(data.price),
    //         category_id: data.category.id,
    //         stock: parseInt(data.stock),
    //         discount: parseFloat(data.discount),
    //         pict: data.pict,
    //         description: data.description,
    //       };
    //       break;
    //     default:
    //       break;
    //   }
    // } else if (formType === "DROP_BY_ID") {
    //   switch (table) {
    //     case `admins`:
    //       initialFormValue = {
    //         id: data.id,
    //         email: data.email,
    //         username: data.username,
    //         pict: data.pict,
    //       };
    //       break;
    //     case `products`:
    //       initialFormValue = {
    //         id: data.id,
    //         name: data.name,
    //       };
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // for (const key in initialFormValue) {
    //   setValue(key, initialFormValue[key]);
    // }
    for (const key in data) {
      setValue(key, data[key]);
    }
    initialFormValue = null;
  }, [data]);

  // ============================================ Execute Backend QUERY ============================================
  async function sendFormDataByMethod(form) {
    // console.log(form);
    setSending(!sending);
    try {
      if (formType === "INSERT") {
        await fetchData(URL_BY_ID + "/store", "POST", table, form);
        setResultStatus("insert", true, `Input ${table} berhasil !`); // DELETE AFTER FIX BROADCAST
      } else if (formType === "ALTER_BY_ID") {
        await fetchData(URL_ALL + "/update", "PUT", table, form);
        setResultStatus("alter", true, `Update ${table} berhasil !`); // DELETE AFTER FIX BROADCAST
      } else if (formType === "DROP_BY_ID") {
        await fetchData(URL_ALL + "/delete", "DELETE", table, {
          id: form.id,
        });
        setResultStatus("drop", true, `Drop ${table} berhasil !`); // DELETE AFTER FIX BROADCAST
      } else if (formType === "DROP_BY_SELECTED") {
        const deleteRequests = [];
        for (const item of data) {
          deleteRequests.push(item.id);
        }
        try {
          await fetchData(URL_ALL + "/delete", "DELETE", table, {
            id: deleteRequests,
          });
          setResultStatus("drop", true, `Drop Batch ${table} berhasil !`); // DELETE AFTER FIX BROADCAST
          setData([]);
        } catch (error) {
          setData([]);
          console.error("Terjadi kesalahan saat menghapus batch data:", error);
        }
      } else {
        console.warning("no formtype");
      }
      // ------------------------- if success send data to server
      setData([]);
      // console.table(data);
      setSending(false);
      setErrorMessage(null);
      setLoading(false);
      setOnWorking(false);
      setShowModal(false);
      clearData(); // parent props
      refresh(); // parent props
    } catch (error) {
      setResultStatus("error", false, error.response.data.message);
      setSending(false);
      setErrorMessage(error.response.data.message);
      console.info(error);
      console.error("Terjadi kesalahan:", error);
    }
  }

  const ModalContextValue = {
    id,
    // MyTable
    table,
    refresh,
    clearData,
    // Modal
    showModal,
    setShowModal,
    data,
    setData,
    onWorking,
    sending,
    errorMessage,
    loading,
    ready,
    setReady: (value) => {
      setReady(value);
    },
    setResultStatus,
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
    onSubmit: async (form) => {
      // console.info("data form:", form);
      if (errors) {
        Object.keys(errors).map((fieldName) => {
          console.log("Kesalahan dalam formulir:", errors[fieldName].message);
        });
      }
      if (!form) {
        alert("there is no form to send");
      }

      await sendFormDataByMethod(form);
    },
  };

  return (
    <>
      <ModalContext.Provider value={ModalContextValue}>
        <>
          <AnimatePresence>
            {showModal && (
              <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                as="div"
                className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-hidden"
              >
                <div className="flex flex-col items-center justify-center min-h-screen w-full">
                  <Dialog.Overlay />
                  <div
                    onClick={() => {
                      setShowModal(false);
                      refresh();
                      clearData();
                    }}
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div
                      onClick={() => setResultStatus(null, false, null)}
                      className="absolute inset-0 bg-gray-950 opacity-40"
                    ></div>
                  </div>

                  <motion.div {...motionProps.modal}>
                    {modalType == "form" && <FormModal />}
                    {modalType == "print" && <PrintModal />}
                    {modalType == "info" && <InfoModal />}
                  </motion.div>
                </div>
              </Dialog>
            )}
          </AnimatePresence>
        </>
      </ModalContext.Provider>
    </>
  );
};

export const FormModal = (props) => {
  const [proceed, setProceed] = useState(false);

  const {
    id,
    // MyTable
    table,
    refresh,
    clearData,
    // Modal
    showModal,
    setShowModal,
    data,
    setData,
    onWorking,
    sending,
    ready,
    setReady,
    errorMessage,
    loading,
    setResultStatus,
    select,
    formType,
    showPassword,
    setShowPassword,
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
    onSubmit,
  } = useContext(ModalContext);

  // REDUX
  const { BgColor, ContainerBgColor, textColor, screenWidth, screenHeight } =
    useSelector((state) => state.UI);

  useEffect(() => {
    if (ready) {
      setProceed(false);
    } else {
      setProceed(true);
    }
  }, [ready]);

  return (
    <>
      <Dialog.Panel
        as="div"
        sd=""
        className={` ${BgColor ?? "bg-white"} ${textColor} 
        flex flex-col inset-0 my-8 justify-center rounded-lg overflow-hidden shadow-xl transform transition-all 
        w-[400px] lg:w-[1200px] md:max-w-[200vh] sm:w-[80vh] md:w-[110vh] h-full xmax-h-[95vh]`}
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`${BgColor} py-2 card-header pb-4 px-4 flex flex-row justify-between w-full items-center shadow-md`}
          >
            <div className="w-5/12 font-bold text-lg text-left capitalize ">
              <Dialog.Title>
                {formType === "INSERT" && `Add New ${table}`}
                {formType === "ALTER_BY_ID" && `Edit Data ${table}`}
                {formType === "DROP_BY_ID" && `Delete This ${table}`}
                {formType === "DROP_BY_SELECTED" && `Delete Multiple ${table}`}
              </Dialog.Title>
            </div>
            <div className="w-6/12 flex flex-col md:flex-row justify-end items-center">
              {errorMessage ? (
                <>
                  <Dialog.Description
                    key={id}
                    className={`px-2 py-1 font-roboto-bold w-7/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                    as="small"
                  >
                    {console.log(errors)}
                    {errorMessage}
                  </Dialog.Description>
                </>
              ) : (
                <>
                  {formType === "ALTER_BY_ID" && (
                    <DateRecord className="" data={data} />
                  )}
                </>
              )}
              <div className="w-12 text-right text-indigo-500">
                {sending && (
                  <>
                    <span className="self-end loading loading-dots loading-md"></span>
                  </>
                )}
              </div>
            </div>
            <div className="w-1/12 text-right">
              <button
                className="btn btn-sm btn-circle btn-ghost hover:bg-red-300"
                onClick={() => {
                  setShowModal(false);
                  refresh();
                  clearData();
                }}
              >
                <MuiIcon iconName="CloseRounded" />
              </button>
            </div>
          </div>
          <div className="card-body py-2 px-2 max-h-[80vh] xmax-h-[560px] overflow-y-scroll">
            {data !== undefined && data !== null ? (
              <>
                {!loading ? (
                  <>
                    {onWorking ? (
                      // =========================== Main Form ========================
                      <>
                        {/* Panggilan setValue diluar input */}
                        {table === "admins" && (
                          <>
                            {(formType === "INSERT" ||
                              formType === "ALTER_BY_ID") && (
                              <>
                                <AdminsInputForm />
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
                      </>
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
              </>
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
          </div>
          <div
            className={`${BgColor} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse shadow-inner`}
          >
            {formType === "INSERT" && (
              <MotionButton formType="insert" disabled={proceed} />
            )}
            {formType === "ALTER_BY_ID" && (
              <MotionButton formType="alter" disabled={proceed} />
            )}
            {(formType === "DROP_BY_ID" || formType === "DROP_BY_SELECTED") && (
              <MotionButton formType="delete" disabled={proceed} />
            )}
            <MotionButton
              formType="cancel"
              onClick={() => {
                setShowModal(false);
                refresh();
                clearData();
              }}
            />
          </div>
        </form>
      </Dialog.Panel>
    </>
  );
};

export const PrintModal = (props) => {
  const {
    id,
    // MyTable
    table,
    refresh,
    clearData,
    // Modal
    showModal,
    setShowModal,
    data,
    setData,
    onWorking,
    sending,
    errorMessage,
    loading,
    select,
    formType,
    showPassword,
    setShowPassword,
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
    onSubmit,
  } = useContext(ModalContext);

  // REDUX
  const {
    BgColor,
    ContainerBgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  return (
    <>
      <Dialog.Panel
        as="div"
        className={`flex flex-col w-[400px] md:w-[1200px] h-full justify-center ${BgColor} ${textColor} rounded-lg overflow-hidden shadow-xl transform transition-all`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 py-2">
            <div className="card-header pb-4 flex flex-row justify-between w-full items-center">
              <div className="w-5/12 font-bold text-lg text-left capitalize ">
                <Dialog.Title>
                  {formType === "PRINT_BATCH" && `Print Multiple ${table}`}
                  {formType === "PRINT_BY_ID" && `Print a ${table}`}
                </Dialog.Title>
              </div>
              <div className="w-6/12">
                {errorMessage && (
                  <>
                    <Dialog.Description
                      key={id}
                      className={`px-2 py-1 font-roboto-bold w-7/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                      as="small"
                    >
                      {console.log(errors)}
                      {errorMessage}
                    </Dialog.Description>
                  </>
                )}
                {sending && (
                  <>
                    <span className="loading loading-dots loading-md"></span>
                  </>
                )}
              </div>
              <div className="w-1/12 text-right">
                <button
                  className="btn btn-sm btn-circle btn-ghost hover:bg-red-300"
                  onClick={() => {
                    setShowModal(false);
                    refresh();
                    clearData();
                  }}
                >
                  <MuiIcon iconName="CloseRounded" />
                </button>
              </div>
            </div>
            <div className="card-body p-0 max-h-[560px] overflow-y-scroll">
              {data !== undefined && data !== null ? (
                <div className="content over">
                  {!loading ? (
                    <>
                      {onWorking ? (
                        // =========================== Main Form ========================
                        <div className="">
                          <LookReactPDF inputData={data} table={table} />
                        </div>
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
            </div>
          </div>
          <div className={`${BgColor} px-4 py-3`}>
            <DownloadBtnReactPDF
              formType={formType}
              inputData={data}
              table={table}
            />
          </div>
        </form>
      </Dialog.Panel>
    </>
  );
};

export const CropperModal = (props) => {
  const {
    formContext,
    inputFileRef,
    onDrag,
    setOnDrag,
    onFileDrop,
    setLoadImage,
    setWorking,
    setBase64,
    setConfirm,
    // setFormattedValue,
    setPict,
  } = props;

  const [onWorking, setOnWorking] = useState(false);

  const [filename, setFilename] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const cropperRef = useRef(null);
  const fileInput = inputFileRef.current;

  const {
    data,
    setData,
    formType,
    ready,
    setReady,
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
  } = useContext(formContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // console.log("selectedFile", selectedFile);
      setReady(false); // form modal btn
      setBase64(null);
      setWorking(true);
      setLoadImage(false);
    }
    // Maksimal ukuran file dalam byte (512KB)
    // const maxSize = 512 * 1024;
    const maxSize = 10000 * 1024;

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        alert("File terlalu besar. Maksimal 512KB diperbolehkan.");
        console.log("failed upload");
        setBase64(null);
        setWorking(false);
        setLoadImage(true);
        e.target.value = ""; // Menghapus pilihan file yang tidak valid
      } else {
        const reader = new FileReader(); // Baca file gambar
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
              setBase64(null);
              setWorking(false);
              setLoadImage(true);
              e.target.value = ""; // Menghapus pilihan file yang tidak valid
            } else {
              reader.onload = (event) => {
                setImage(event.target.result);
                setOnWorking(true);
              };

              reader.readAsDataURL(selectedFile);
            }
          };
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

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
        setReady(true); // form modal btn
      }
    }
  };

  useEffect(() => {
    if (croppedImage) {
      setPict(croppedImage);
    }
    setImage(null);
    setCroppedImage(null);
  }, [croppedImage]);

  // dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Mengambil data URL dari file yang diunggah
      const file = acceptedFiles[0]; // Mengambil file pertama (jika ada)
      if (file) {
        setWorking(true);
        // setLoadImage(false);
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataURL = event.target.result;
          // console.log("Data URL dari file yang diunggah:", dataURL);
          setImage(dataURL);
          setOnWorking(true);
        };
        reader.readAsDataURL(file);
      }
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <>
      {onWorking && (
        <div className={`p-4`}>
          <Cropper
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            // preview=".img-preview"
            ref={cropperRef}
            src={image}
            aspectRatio={8 / 8} // Sesuaikan dengan rasio aspek yang Anda inginkan
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false}
            zoomable={false} // Mencegah zoom
          />
          <div className="flex flex-row justify-center items-center py-4 text-center">
            <MotionButton
              onClick={() => {
                setOnWorking(false);
                applyCroppedImage();
              }}
              formType="confirm"
            />
            <MotionButton
              type="button"
              onClick={() => {
                setValue("pict", "noChange");
                setReady(true);
                setOnWorking(false);
                setWorking(false);
                setImage(null);
                setCroppedImage(null);
              }}
              formType="cancel"
            />
          </div>
        </div>
      )}
      {!onDrag ? (
        <>
          <input
            // {...getInputProps()}
            ref={inputFileRef}
            className={`${
              onWorking ? "hidden" : ""
            } file-input file-input-bordered lg:file-input-md md:w-48 lg:w-64 text-sm mt-6 text-gray-900`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <>
          <motion.div
            {...getRootProps()}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`dropzone ${isDragActive ? "active" : ""} `}
          >
            <AreaDropZone />
          </motion.div>
        </>
      )}
    </>
  );
};

export const Dropzone = (props) => {
  const { onFileDrop } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.div
      {...getRootProps()}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center my-4 text-center ">
        <div className="flex flex-col justify-center items-center border-dashed border-2 border-indigo-300 h-96 w-96">
          Drag & drop a file picture on here
          <motion.span
            transition={{
              y: {
                duration: 0.4,
                yoyo: Infinity,
                ease: "easeOut",
              },
            }}
            animate={{
              y: 10, // Nilai y saat animasi dimulai
            }}
          >
            <MuiIcon iconName="CloudUploadRounded" fontSize={48} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
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
  const {
    id,
    // MyTable
    table,
    refresh,
    clearData,
    // Modal
    showModal,
    setShowModal,
    data,
    setData,
    onWorking,
    sending,
    errorMessage,
    loading,
    select,
    formType,
    showPassword,
    setShowPassword,
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
    onSubmit,
  } = useContext(ModalContext);
  const [serverPublic, setServerPublic] = useState(null);

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
    if (formType === "SHOW_ADMIN_PROFILE_PICTURE") {
      setServerPublic(ServerAPIAdminsImg);
    } else if (formType === "SHOW_PRODUCT_PICTURE") {
      setServerPublic(ServerAPIProductsImg);
    }
  }, [table, formType]);

  // useEffect(() => {
  //   console.table(props);
  // }, [table_id, formType, showModal]);

  return (
    <>
      <Dialog.Panel
        as="div"
        className={`flex flex-col h-full justify-center bg-transparent rounded-lg overflow-hidden shadow-xl transform transition-all`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-[400px] md:min-w-[700px] py-2">
            {formType == "SHOW_PRODUCT_BARCODE" &&
            (formType != "SHOW_ADMIN_PROFILE_PICTURE" ||
              formType != "SHOW_PRODUCT_PICTURE") ? (
              <div
                className={`card-header pb-4 px-4 flex flex-row justify-between w-full items-center shadow-md`}
              >
                <div className="w-5/12 font-bold text-lg text-left capitalize ">
                  <Dialog.Title>
                    {formType === "SHOW_PRODUCT_BARCODE" &&
                      `Barcode Info - ${table}`}
                  </Dialog.Title>
                </div>
                <div className="w-6/12">
                  {errorMessage && (
                    <>
                      <Dialog.Description
                        key={id}
                        className={`px-2 py-1 font-roboto-bold w-7/12 text-red-800 bg-red-300 rounded-md max-h-[28px] line-clamp-2`}
                        as="small"
                      >
                        {console.log(errors)}
                        {errorMessage}
                      </Dialog.Description>
                    </>
                  )}
                  {sending && (
                    <>
                      <span className="loading loading-dots loading-md"></span>
                    </>
                  )}
                </div>
                <div className="w-1/12 text-right">
                  <button
                    className="btn btn-sm btn-circle btn-ghost hover:bg-red-300"
                    onClick={() => {
                      setShowModal(false);
                      refresh();
                      clearData();
                    }}
                  >
                    <MuiIcon iconName="CloseRounded" />
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="card-body py-0 px-2 ">
              {data !== undefined && data !== null ? (
                <div className="content over">
                  {!loading ? (
                    <>
                      {onWorking ? (
                        // =========================== Main Form ========================
                        <div className="">
                          {(formType === "SHOW_ADMIN_PROFILE_PICTURE" ||
                            formType === "SHOW_PRODUCT_PICTURE") && (
                            <>
                              <div className="flex flex-col justify-center items-center">
                                <Dialog.Description
                                  as="h3"
                                  className="font-bold text-xl py-4 line-clamp-2 capitalize"
                                >
                                  {formType === "SHOW_ADMIN_PROFILE_PICTURE" &&
                                    data.username}
                                  {formType === "SHOW_PRODUCT_PICTURE" &&
                                    data.name}
                                </Dialog.Description>
                                <img
                                  src={`${
                                    formType === "SHOW_ADMIN_PROFILE_PICTURE"
                                      ? ServerPublicAdminsImg
                                      : ""
                                  }${
                                    formType === "SHOW_PRODUCT_PICTURE"
                                      ? ServerPublicProductsImg
                                      : ""
                                  }${data.pict || "default.png"}`} // temporary
                                  // src={`${serverPublic}${
                                  //   data.id || "default.png"
                                  // }`} why not sync???
                                  alt={`Info Picture ${data.pict}`}
                                  className="object-contain min-w-[300px] min-h-[320px] h-[420px] w-[420px] max-w-[500px] max-h-[520px] overflow-hidden rounded-lg shadow-md"
                                />
                              </div>
                              <div className="flex justify-center items-center py-4 text-center">
                                <DateRecord data={data} />
                              </div>
                            </>
                          )}
                          {formType === "SHOW_PRODUCT_BARCODE" && (
                            <>
                              <div className="flex flex-col justify-center items-center">
                                <Dialog.Description
                                  as="h3"
                                  className="font-bold text-xl py-4 line-clamp-2 capitalize"
                                >
                                  {data?.name || "This Product"}
                                </Dialog.Description>
                                <Barcode
                                  className={`h-[150px] p-0 m-0 max-w-[300px]`}
                                  value={data?.barcode}
                                  // options={{ format: "EAN13" }}
                                />
                              </div>
                              <div className="py-4 text-center">
                                <small className="">
                                  <span className="font-bold ">
                                    Updated At :{" "}
                                  </span>
                                  {DateFormatter(
                                    "YYYY-MM-DD-hh-mm-ss",
                                    data.updated_at
                                  )}
                                </small>
                              </div>
                            </>
                          )}
                        </div>
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
            </div>
          </div>
          {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <MotionButton
              formType="cancel"
              onClick={() => {
                setShowModal(false);
                refresh();
                clearData();
              }}
            />
          </div> */}
        </form>
      </Dialog.Panel>
    </>
  );
};

export default ModalContext;
