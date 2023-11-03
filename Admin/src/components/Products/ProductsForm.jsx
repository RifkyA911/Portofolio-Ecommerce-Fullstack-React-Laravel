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
import { MuiIcon } from "../../utils/RenderIcons";
import { convertISODateToJSDate } from "../../utils/Formatter";
import {
  TextInput,
  SelectInput,
  NumberInput,
  TextArea,
  FilePictureInput,
  DropByIdForm,
  DropBySelectedForm,
} from "../Form";
import { ConfirmButton } from "../Button";
import { DateRecord } from "../Span";

export const ProductsInputForm = (props) => {
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
  const MaxLimit = 10000000; //10 jt

  return (
    <>
      <div className="flex flex-row ">
        <div>
          {/* ALTER */}
          {formType === "ALTER_BY_ID" && (
            <input
              type="hidden"
              {...register("productId", {
                required: "This productId Credentials ID are required",
              })}
            />
          )}
        </div>
        {/* Images */}
        <div className="flex flex-col justify-start items-center w-6/12 p-12">
          <FilePictureInput
            type="picture"
            label="Product Picture"
            name="pict"
          />
        </div>
        {/* Form */}
        <div className="flex flex-col gap-4 justify-center items-center w-6/12 py-2 px-6 font-roboto-medium ">
          {/* {console.log(name, ":", getValues(name))}  {setValue("barcode", "HJAHAHA")} */}
          {/* {console.log("form_values", ":", getValues())} */}
          {/* {console.log("data", ":", data)} */}
          <TextInput
            className={`flex gap-4 flex-col w-full`}
            label="Barcode/No. Product"
            name="barcode"
            placeholder="Masukkan Kode Barcode/No. Product"
            formContext={ModalContext}
          />
          <TextInput
            className={`flex gap-4 flex-col w-full`}
            label="Product Name"
            name="name"
            placeholder="Masukkan Nama Product"
            formContext={ModalContext}
          />
          <div className="w-full flex flex-row gap-4 justify-between items-center">
            <SelectInput
              className={`w-full flex gap-4 flex-col `}
              label="Category"
              name="category_id"
              // options={["topi", "baju", "kerudung"]}
              style="w-full h-[38px]"
            />
            <NumberInput
              formContext={ModalContext}
              className={`flex gap-4 flex-col `}
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
            className={`flex gap-4 flex-col w-full`}
            label="Description"
            name="description"
            placeholder="tamnbahkan deskripsi"
          />
          {formType === "ALTER_BY_ID" && <DateRecord data={data} />}
        </div>
      </div>
      {/* {formType === "INSERT" && (
        <ConfirmButton stickyContainer confirmType="add" />
      )}
      {formType === "ALTER_BY_ID" && (
        <>
          <ConfirmButton stickyContainer confirmType="alter" />
        </>
      )} */}
    </>
  );
};

export const ProductsDropForm = (props) => {
  // const { data, formType } = props;
  const { refresh, data, formType, clearData } = useContext(ModalContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {data !== undefined && data !== null && (
          <div className=" w-12/12 p-6">
            {/* Images */}
            {formType === "DROP_BY_ID" && (
              <DropByIdForm
                tableId="productsId"
                location="products"
                thisName={data.name}
                pict={data.pict}
              />
            )}
            {formType === "DROP_BY_SELECTED" && (
              <DropBySelectedForm
                table="Products"
                location="products"
                data={data}
              />
            )}
          </div>
        )}
        {/* Confirm Button
        <div className="flex gap-12 py-2 justify-center shadow-inner shadow-slate-50 bg-slate-100">
          <ConfirmButton confirmType="drop" />
          <ConfirmButton
            confirmType="cancel"
            onClick={() => {
              refresh();
              clearData();
            }}
          />
        </div> */}
      </div>
    </>
  );
};
