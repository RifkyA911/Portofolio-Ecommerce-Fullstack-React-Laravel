import React, {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import ModalContext, { CropperModal } from "../Modal";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import {
  TextInput,
  SelectInput,
  NumberInput,
  TextArea,
  FilePictureInput,
  DropByIdForm,
  DropBySelectedForm,
} from "../Form";
import { ReactIcons } from "../../utils/RenderIcons";
import { DateFormatter, TextFormatter } from "../../utils/Formatter";
import { sumData } from "../../utils/Solver";
import { MotionButton } from "../Button";
import { LoadingDaisyUI } from "../Loading";
import { Timeline } from "../Span";
import { OrderStatus } from "./OrdersTableBody";
import { ProductImage } from "../Products/ProductsTableBody";

export const OrdersDetailsForm = (props) => {
  const {
    data,
    // setData,
    formType,
    // showPassword,
    // setShowPassword,
    // // react-hook-form
    // newPasswordRef,
    register,
    getValues,
    setValue,
    // setFocus,
    // setError,
    // control,
    // errors,
    // isValid,
    // dirtyFields,
    // watch,
  } = useContext(ModalContext);
  const MaxLimit = 10000000; //10 jt

  useEffect(() => {
    const totalQuantitiy = sumData(data.items);

    setValue("total_quantity", totalQuantitiy);
  }, []);

  // useEffect(() => {
  //   console.log(getValues());
  // }, [getValues()]);

  const inputClassName =
    "input input-bordered input-info w-full input-sm max-w-3xl text-gray-900 focus:outline-none w-1/2";

  return (
    <>
      {data && (
        <div className="flex flex-col md:flex-row justify-center items-start py-2 px-6 text-xs min-h-[500px] gap-4">
          {/* Form */}
          <div className="flex flex-col gap-3 justify-start items-center w-full md:w-8/12 lg:w-6/12 font-roboto-medium ">
            <div className="w-full flex flex-row gap-4 justify-between items-center">
              <TextInput
                formContext={ModalContext}
                disabled
                className={`flex gap-4 flex-col w-full`}
                label="No. Invoice"
                inputClassName={inputClassName}
                name="no_invoice"
                placeholder="Masukkan Kode No. Invoice"
              />
              <TextInput
                formContext={ModalContext}
                disabled
                className={`flex gap-4 flex-col w-full`}
                label="Customer Name"
                inputClassName={inputClassName}
                name="user.username"
                placeholder="Masukkan Nama Customer"
              />
              <div className="flex flex-col justify-between gap-4">
                <label className="font-roboto-bold text-sm text-left">
                  Status{" "}
                </label>
                <OrderStatus status={data ? data.status : "Pending"} />
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              {/* <NumberInput
                formContext={ModalContext}
                disabled
                className={`flex gap-4 flex-col w-1/2 mr-2 `}
                prefix="Rp. "
                label="Total Price (IDR)"
                name="total_price"
                limitDigits={MaxLimit}
                placeholder="Masukkan Harga"
                style={inputClassName}
              /> */}
              {/* <NumberInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-1/2 ml-2`}
              suffix=" %"
              label="Discount %"
              name="items.discount"
              limitDigits={1000}
              decimalOptions={3}
              placeholder="Masukkan Harga"
              style={inputClassName}
            /> */}
            </div>
            <div className="w-full flex flex-row gap-4 justify-between items-center">
              {/* <SelectInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-1/2`}
              label="Status"
              name="status"
              customControlStyles={(base) => ({
                ...base,
                maxHeight: 12,
              })}
              // style="h-[38px]"
              // options={convertedOptions}
            /> */}
              {/* <NumberInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-1/2`}
              prefix=""
              label="Total Items"
              name="total_quantity"
              limitDigits={1000}
              placeholder="Masukkan Harga"
              style={inputClassName}
            /> */}
            </div>
            <div className="flex flex-col justify-start w-full gap-4 pb-2">
              <label className="font-roboto-bold text-sm text-left">
                List Products
              </label>
              <table className="w-full text-center border">
                <thead className={`bg-gray-200 font-roboto-regular`}>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className="font-roboto-medium max-h-20 overflow-y-scroll">
                  {data.items.map((product, index) => (
                    <tr key={product.id} className="divide-y p">
                      <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                      <td className="px-4 py-1 flex flex-row items-center">
                        {/* <img src="" /> */}
                        <ProductImage
                          data={data}
                          onProductPictureClick={() => console.log("")}
                        />
                        <p>{product.product.name}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.product.category ?? "???"}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.quantity}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.discount ?? 0}%</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.sum_price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TextArea
                formContext={ModalContext}
                disabled
                className={`flex gap-4 flex-col w-full text-xs`}
                label="Address"
                name="user.address"
                placeholder="tamnbahkan deskripsi"
              />
            </div>
          </div>
          {/* Timeline */}
          <div className="flex flex-col gap-4 justify-start items-start w-full md:w-4/12 lg:w-6/12">
            <label className="font-roboto-bold text-sm text-left">
              Info Pembayaran
            </label>
            {data && (
              <table className="w-full text-center border">
                <thead className={`bg-gray-200 font-roboto-regular`}>
                  <tr>
                    <th>No</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody className="font-roboto-medium max-h-20 overflow-y-scroll">
                  {data.items.map((product, index) => (
                    <tr key={product.id} className="divide-y p">
                      <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                      <td className="px-4 py-1">
                        <p>{product.product.name}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.product.category ?? "???"}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.quantity}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.discount ?? 0}%</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.sum_price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <label className="font-roboto-bold text-sm text-left">
              Info Pengiriman
            </label>
            {data && (
              <table className="w-full text-center border">
                <thead className={`bg-gray-200 font-roboto-regular`}>
                  <tr>
                    <th>No</th>
                    <th>Tracking ID</th>
                    <th>Courier</th>
                    <th>Consignee</th>
                    <th>Adress</th>
                    <th>Contact</th>
                    <th>Cost</th>
                    <th>Created At</th>
                    {/* SHIPEMTNS LOG */}
                  </tr>
                </thead>
                <tbody className="font-roboto-medium max-h-20 overflow-y-scroll">
                  {data.items.map((product, index) => (
                    <tr key={product.id} className="divide-y p">
                      <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                      <td className="px-4 py-1">
                        <p>{product.product.name}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.product.category ?? "???"}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.quantity}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.discount ?? 0}%</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.sum_price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex flex-row m-4">
              <ul className="timeline timeline-vertical w-3/4">
                <li>
                  <div className="timeline-start">1984</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    First Macintosh computer
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">1998</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">iMac</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">2001</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">iPod</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">2007</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">iPhone</div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start">2015</div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">Apple Watch</div>
                </li>
              </ul>
            </div>
            {/* <Timeline
            className="w-3/4"
            events={[
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 1",
              },
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 2",
              },
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 3",
              },
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 3",
              },
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 3",
              },
              {
                date: DateFormatter("Day", "2023-11-26 06:22:19"),
                description: "Deskripsi event 3",
              },
              // Tambahkan event sesuai kebutuhan
            ]}
          /> */}
          </div>
        </div>
      )}
    </>
  );
};

export const OrdersInputForm = (props) => {
  const {
    data,
    // setData,
    formType,
    // showPassword,
    // setShowPassword,
    // // react-hook-form
    // newPasswordRef,
    register,
    getValues,
    setValue,
    // setFocus,
    // setError,
    // control,
    // errors,
    // isValid,
    // dirtyFields,
    // watch,
  } = useContext(ModalContext);
  const MaxLimit = 10000000; //10 jt

  // console.log(getValues());

  useEffect(() => {
    const totalQuantitiy = sumData(data.items);

    setValue("total_quantity", totalQuantitiy);
  }, []);

  // useEffect(() => {
  //   console.log(getValues());
  // }, [getValues()]);

  const inputClassName =
    "input input-bordered input-info w-full input-sm max-w-3xl text-gray-900 focus:outline-none w-1/2";

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start py-2 px-6 text-xs min-h-[500px] gap-4">
        {/* Timeline */}
        <div className="flex flex-col justify-start items-start w-full md:w-4/12 lg:w-6/12"></div>
        {/* Form */}
        <div className="flex flex-col gap-3 justify-start items-center w-full md:w-8/12 lg:w-6/12 font-roboto-medium ">
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <TextInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-full`}
              label="No. Invoice"
              inputClassName={inputClassName}
              name="no_invoice"
              placeholder="Masukkan Kode No. Invoice"
            />
            <TextInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-full`}
              label="Customer Name"
              inputClassName={inputClassName}
              name="user.username"
              placeholder="Masukkan Nama Customer"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <NumberInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-1/2 mr-2 `}
              prefix="Rp. "
              label="Total Price (IDR)"
              name="total_price"
              limitDigits={MaxLimit}
              placeholder="Masukkan Harga"
              style={inputClassName}
            />
            <NumberInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-1/2 ml-2`}
              suffix=" %"
              label="Discount %"
              name="items.discount"
              limitDigits={1000}
              decimalOptions={3}
              placeholder="Masukkan Harga"
              style={inputClassName}
            />
          </div>
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <SelectInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-1/2`}
              label="Status"
              name="status"
              customControlStyles={(base) => ({
                ...base,
                maxHeight: 12,
              })}
              // style="h-[38px]"
              // options={convertedOptions}
            />
            <NumberInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-1/2`}
              prefix=""
              label="Total Items"
              name="total_quantity"
              limitDigits={1000}
              placeholder="Masukkan Harga"
              style={inputClassName}
            />
          </div>
          <div className="flex flex-col justify-start w-full gap-4 pb-2">
            <label className="font-roboto-bold text-sm text-left">
              List Products
            </label>
            {data && (
              <table className="w-full text-center border">
                <thead className={`bg-gray-200 font-roboto-regular`}>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Summary Price</th>
                  </tr>
                </thead>
                <tbody className="font-roboto-medium max-h-20 overflow-y-scroll">
                  {data.items.map((product, index) => (
                    <tr key={product.id} className="divide-y p">
                      <td className="p-0 w-0 bg-slate-100">{index + 1}</td>
                      <td className="px-4 py-1">
                        <p>{product.product.name}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.product.category ?? "???"}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.quantity}</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.discount ?? 0}%</p>
                      </td>
                      <td className="px-4 py-1">
                        <p>{product.sum_price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <TextArea
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-full text-xs`}
              label="Address"
              name="user.address"
              placeholder="tamnbahkan deskripsi"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const OrdersDropForm = (props) => {
  // const { data, formType } = props;
  const { table, refresh, data, formType, clearData } =
    useContext(ModalContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {data !== undefined && data !== null && (
          <div className=" w-12/12 p-6">
            {/* Images */}
            {formType === "DROP_BY_ID" && (
              <DropByIdForm
                formContext={ModalContext}
                location={table}
                thisName={data.name}
                pict={data.pict}
              />
            )}
            {formType === "DROP_BY_SELECTED" && (
              <DropBySelectedForm formContext={ModalContext} data={data} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const OrdersButtonForm = (props) => {
  const { proceed } = props;

  const {
    data,
    // setData,
    formType,
    // showPassword,
    // setShowPassword,
    select,
    // // react-hook-form
    // newPasswordRef,
    register,
    getValues,
    setValue,
    // setFocus,
    // setError,
    // control,
    // errors,
    // isValid,
    // dirtyFields,
    // watch,
  } = useContext(ModalContext);

  const statuses = [
    "Pending",
    "Awaiting Payment",
    "Processing",
    "Shipped",
    "Delivered",
    "Completed",
    "Cancelled",
    "On Hold",
    "Returned",
    "Partially Shipped",
    "Backordered",
    "Failed",
  ];

  const statusHandler = (status) => {
    return status == "Pending"
      ? "Awaiting Payment"
      : status == "Awaiting Payment"
      ? "Processing"
      : status == "Processing"
      ? "Shipped"
      : status == "Shipped"
      ? "Delivered"
      : status == "Delivered"
      ? "Completed"
      : status == "Completed"
      ? "Completed"
      : // status=="Cancelled"?"Processing":
        // status=="On Hold"?"Processing":
        // status=="Returned"?"Processing":
        // status=="Partially Shipped"?"Processing":
        // status=="Backordered"?"Processing":
        // status=="Failed"?"Processing":
        "Pending";
  };

  return (
    <>
      {data && data.status ? (
        <>
          <MotionButton
            formType={statusHandler(data.status)}
            disabled={data.status == "Completed" && true}
            span={statusHandler(data.status)}
          />
        </>
      ) : (
        <LoadingDaisyUI type="loading-dots" size="loading-sm" max={1} />
      )}
    </>
  );
};

export const OrdersAdminForm = (props) => {
  return (
    <>
      <div></div>
    </>
  );
};
