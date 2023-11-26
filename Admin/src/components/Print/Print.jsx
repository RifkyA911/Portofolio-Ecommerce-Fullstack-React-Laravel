import { useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
  Svg,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { useReactToPrint } from "react-to-print";
import { PrintProducts } from "./Products";
import { DateFormatter } from "../../utils/Formatter";
import { MuiIcon, ReactIcons } from "../../utils/RenderIcons";

export const LookReactPDF = (props) => {
  const { inputData, table } = props;

  return (
    <PDFViewer className="mx-auto" width="800" height="1000">
      <PrintReactPDF inputData={inputData} table={table} />
    </PDFViewer>
  );
};

export const DownloadBtnReactPDF = (props) => {
  const { inputData, table, formType } = props;
  // return console.log("inputData", inputData);
  return (
    <>
      {inputData && (
        <div className="relative flex flex-row justify-center">
          <PDFDownloadLink
            className="px-12 rounded-md bg-gradient-to-r from-blue-500 to-sky-500 py-2 font-roboto-medium text-white"
            document={<PrintReactPDF inputData={inputData} table={table} />}
            fileName={`${table}_${inputData.name || inputData.username}${
              formType === "PRINT_BATCH" ? "_Batch" : ""
            }#${DateFormatter("YYYY-MM-DD-hh-mm-ss", null)}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Save.Pdf"
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export const PrintReactPDF = (props) => {
  const { inputData, table } = props;

  const [data, setData] = useState(null);
  const [printType, setPrintType] = useState(null);

  useEffect(() => {
    if (Array.isArray(inputData)) {
      setPrintType("BATCH");
    } else if (typeof inputData === "object" && inputData !== null) {
      setPrintType("SINGLE");
    } else {
      setPrintType(null);
    }
    // console.log(inputData);
    setData(inputData);
  }, [inputData]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data.id);
  //     fetchData(`${import.meta.env.VITE_API_ID_PRODUCT}/${data.id}`);
  //   }
  // }, [data]);

  return (
    <>
      {data !== null && data !== "" && data !== undefined && (
        <>
          <Document>
            {table === "products" && (
              <>
                <PrintProducts inputData={data} printType={printType} />
              </>
            )}
            {table === "transactions" && (
              <>
                {/* <PrintProducts inputData={data} printType={printType} /> */}
              </>
            )}
            {table === "orders" && (
              <>
                {/* <PrintProducts inputData={data} printType={printType} /> */}
              </>
            )}
          </Document>
        </>
      )}
    </>
  );
};
