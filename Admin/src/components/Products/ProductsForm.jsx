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

export const ProductsInputForm = (props) => {
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
      {/* ALTER */}
      {formType === "ALTER_BY_ID" && (
        <input
          type="hidden"
          {...register("productId", {
            required: "This productId Credentials ID are required",
          })}
        />
      )}
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

export const ProductsDropForm = (props) => {
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
                tableId="productsId"
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
