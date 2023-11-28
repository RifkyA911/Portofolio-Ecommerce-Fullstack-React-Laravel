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
import { TextFormatter } from "../../utils/Formatter";
import { sumData } from "../../utils/Solver";

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
    // setValue,
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

  const options = [
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

  const convertedOptions = options.map((option, index) => ({
    id: TextFormatter(option.replace(/\s/g, "_")), // Atau gunakan nilai unik sesuai kebutuhan
    name: TextFormatter(option.replace(/\s/g, "_")), // Mengubah ke huruf kecil dan ganti spasi dengan _
  }));

  const totalQuantitiy = sumData(data.items);

  console.log(getValues());

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start py-2 px-6 text-xs min-h-[500px]">
        {/* Timeline */}
        <div className="flex flex-col justify-start items-center self-start w-full md:w-4/12 lg:w-6/12">
          <ul className="timeline timeline-vertical font-roboto-regular">
            <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <ReactIcons iconName="FaCircleCheck" />
              </div>
              <div id="chart" className="timeline-end timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li>
            <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <ReactIcons iconName="FaCircleCheck" />
              </div>
              <div id="chart" className="timeline-end timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li>
            <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <ReactIcons iconName="FaCircleCheck" />
              </div>
              <div id="chart" className="timeline-end timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li>
            <li>
              <div className="timeline-start">1984</div>
              <div className="timeline-middle">
                <ReactIcons iconName="FaCircleCheck" />
              </div>
              <div id="chart" className="timeline-end timeline-box">
                First Macintosh computer
              </div>
              <hr />
            </li>
          </ul>
        </div>
        {/* Form */}
        <div className="flex flex-col gap-3 justify-start items-center w-full md:w-8/12 lg:w-6/12 font-roboto-medium ">
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <TextInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-full`}
              label="No. Invoice"
              name="no_invoice"
              placeholder="Masukkan Kode No. Invoice"
            />
            <TextInput
              formContext={ModalContext}
              disabled
              className={`flex gap-4 flex-col w-full`}
              label="Customer Name"
              name="user.username"
              placeholder="Masukkan Nama Customer"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-1/2 mr-2 `}
              prefix="Rp. "
              label="Total Price (IDR)"
              name="total_price"
              limitDigits={MaxLimit}
              placeholder="Masukkan Harga"
              style="w-full"
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
              style="w-full"
            />
          </div>
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <SelectInput
              formContext={ModalContext}
              className={`w-full flex gap-4 flex-col `}
              label="Status"
              name="status"
              style="w-[160px] lg:w-full h-[38px]"
              options={convertedOptions}
            />
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-[160px] lg:w-auto`}
              prefix=""
              label="Quantity"
              name="items.quantity"
              limitDigits={1000}
              placeholder="Masukkan Harga"
            />
          </div>

          <TextArea
            formContext={ModalContext}
            className={`flex gap-4 flex-col w-full text-xs`}
            inputClassName="h-20"
            label="Address"
            name="user.address"
            placeholder="tamnbahkan deskripsi"
          />
        </div>
      </div>
    </>
  );
};

export const OrdersInputForm = (props) => {
  const {
    // data,
    // setData,
    formType,
    // showPassword,
    // setShowPassword,
    // // react-hook-form
    // newPasswordRef,
    register,
    // getValues,
    // setValue,
    // setFocus,
    // setError,
    // control,
    // errors,
    // isValid,
    // dirtyFields,
    // watch,
  } = useContext(ModalContext);
  const MaxLimit = 10000000; //10 jt

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center py-2 px-6">
        {/* Images */}
        <div className="flex flex-col justify-start items-center self-start w-full md:w-4/12 lg:w-6/12">
          <FilePictureInput
            formContext={ModalContext}
            type="picture"
            label="Product Picture"
            name="pict"
          />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-3 justify-start items-center w-full md:w-8/12 lg:w-6/12 font-roboto-medium ">
          <TextInput
            formContext={ModalContext}
            className={`flex gap-4 flex-col w-full`}
            label="Barcode/No. Product"
            name="barcode"
            placeholder="Masukkan Kode Barcode/No. Product"
          />
          <TextInput
            formContext={ModalContext}
            className={`flex gap-4 flex-col w-full`}
            label="Product Name"
            name="name"
            placeholder="Masukkan Nama Product"
          />
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <SelectInput
              formContext={ModalContext}
              className={`w-full flex gap-4 flex-col `}
              label="Category"
              name="category_id"
              // options={["topi", "baju", "kerudung"]}
              style="w-[160px] lg:w-full h-[38px]"
            />
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-[160px] lg:w-auto`}
              prefix=""
              label="Stock"
              name="stock"
              limitDigits={1000}
              placeholder="Masukkan Harga"
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-1/2 mr-2`}
              prefix="Rp. "
              label="Price (IDR)"
              name="price"
              limitDigits={MaxLimit}
              placeholder="Masukkan Harga"
              style="w-full"
            />
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col w-1/2 ml-2`}
              suffix=" %"
              label="Discount %"
              name="discount"
              limitDigits={1000}
              decimalOptions={3}
              placeholder="Masukkan Harga"
              style="w-full"
            />
          </div>
          <TextArea
            formContext={ModalContext}
            className={`flex gap-4 flex-col w-full`}
            label="Description"
            name="description"
            placeholder="tamnbahkan deskripsi"
          />
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

export const OrdersAdminForm = (props) => {
  return (
    <>
      <div></div>
    </>
  );
};
