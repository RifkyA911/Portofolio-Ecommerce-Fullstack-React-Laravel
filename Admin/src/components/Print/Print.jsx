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
import { createTw } from "react-pdf-tailwind";
// Components
import { styles } from "./Styles";
// UTILS
import { getUser } from "../../Config/Session";
import { CurrencyFormatter, DateFormatter } from "../../utils/Formatter";
import { ReactIcons } from "../../utils/RenderIcons";
import { loremIpsum } from "../../utils/PlaceHolder";

const CompanyProfileURL = import.meta.env.VITE_COMPANY_PROFILE;
const ServerAPIProductsImg = import.meta.env.VITE_API_ID_PRODUCT + "/image/";
const userSession = getUser();

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

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
            fileName={`${table}_${
              inputData.name || inputData.username || "this"
            }${formType === "PRINT_BATCH" ? "_Batch" : ""}#${DateFormatter(
              "YYYY-MM-DD-hh-mm-ss",
              null
            )}.pdf`}
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
    setData(inputData);
  }, [inputData]);

  return (
    <>
      {data !== null && data !== "" && data !== undefined && (
        <>
          <Document>
            {inputData && (
              <>
                {printType === "SINGLE" && (
                  <Page size="LETTER" dpi={96}>
                    <View style={styles.page}>
                      {/* =================== HEADER =================== */}
                      <PartOfHeader table={table} inputData={inputData} />
                      {/* =================== BODY =================== */}
                      <PartOfBody table={table} inputData={inputData} />
                    </View>
                  </Page>
                )}
                {printType === "BATCH" && (
                  <>
                    {inputData.map((row, index) => (
                      <Page key={row.id} size="LETTER" dpi={96}>
                        <View style={styles.page}>
                          {/* =================== HEADER =================== */}
                          <PartOfHeader table={table} inputData={row} />
                          {/* =================== BODY =================== */}
                          <PartOfBody table={table} inputData={row} />
                        </View>
                      </Page>
                    ))}
                  </>
                )}
              </>
            )}
          </Document>
        </>
      )}
    </>
  );
};

const PartOfHeader = (props) => {
  const { table, inputData } = props;

  return (
    <>
      <View
        style={tw(
          "p-4 bg-gray-100 border-b-2 border-slate-200 flex flex-row justify-between items-center max-h-[140px] overflow-hidden w-full"
        )}
      >
        {/* Left */}
        <Link
          src={CompanyProfileURL}
          style={tw("order-first flex flex-row w-2/3 justify-start self-start")}
        >
          <Image
            style={tw("h-20 w-20 hidden sm:flex text-center")}
            src={"src/assets/logo.png"}
          />
          <View
            style={tw(
              "mx-4 flex flex-col gap-1 items-start capitalize underline text-gray-900 hover:text-gray-800 visited:text-gray-800"
            )}
          >
            <Text style={tw("font-extrabold")}>Your Company Name</Text>
            <Text style={tw("font-semibold text-base")}>
              Jl. Mayjend. Sungkono Blok B 1 no. 105 Surabaya 6025
            </Text>
            <Text style={tw("font-bold no-underline text-xs")}>
              Phone: 031-5671868; Fax: 031-5664979
            </Text>
            <Text style={tw("font-bold no-underline text-xs")}>
              E-mail: drarya2006@gmail.com
            </Text>
          </View>
        </Link>
        {/* Right */}
        <View style={tw("order-last flex flex-row w-1/3 justify-end self-end")}>
          <View style={tw("mx-4 flex flex-col justify-between items-end")}>
            {table == "orders" && (
              <Text style={tw("text-base")}>
                INVOICE : {inputData.no_invoice}
              </Text>
            )}
            {table == "products" && (
              <Text style={tw("text-base")}>Product ID : {inputData.id}</Text>
            )}
            <View style={tw("flex flex-col justify-between items-end")}>
              <Text style={tw("text-base")}>
                Date Created :{" "}
                {DateFormatter("YYYY/MM/DD", inputData.created_at)}
              </Text>
              <Text style={tw("text-base")}>
                Date Updated :{" "}
                {DateFormatter("YYYY/MM/DD", inputData.updated_at)}
              </Text>
              <Text style={tw("text-base")}>
                Admin : {userSession.username}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const PartOfBody = (props) => {
  const { table, inputData } = props;
  return (
    <>
      <View style={tw("flex flex-col w-full p-12")}>
        {table == "products" && <BodyOfProducts inputData={inputData} />}
        {(table == "orders" || table == "invoices") && (
          <BodyOfOrdersInvoices inputData={inputData} />
        )}
      </View>
    </>
  );
};

const BodyOfProducts = (props) => {
  const { inputData } = props;

  return (
    <>
      <View style={tw("flex flex-row w-full")}>
        <View style={tw("flex w-1/3 justify-start")}>
          <Image
            style={tw("h-80 w-80 sm:flex text-center rounded-lg")}
            // src={`${ServerProductsImg}${inputData.pict}`}//reactpdf CORS s SCK
            src={`${ServerAPIProductsImg}${inputData.id}`}
          ></Image>
        </View>
        <View style={tw("flex flex-row w-2/3 justify-start")}>
          <View style={tw("flex gap-4 justify-start p-4 bg-slate-100")}>
            <Text>Barcode : </Text>
            <Text>Name :</Text>
            <Text>Category :</Text>
            <Text>Price :</Text>
            <Text>Discount :</Text>
            <Text>Created at :</Text>
            <Text>Updated at :</Text>
          </View>
          <View
            style={tw("flex gap-4 justify-start p-4 text-gray-800 capitalize")}
          >
            <Text>{inputData.barcode}</Text>
            <Text>{inputData.name}</Text>
            <Text>{inputData.category.name}</Text>
            <Text>{CurrencyFormatter(inputData.price)}</Text>
            <Text>{inputData.discount} %</Text>
            <Text>
              {DateFormatter("YYYY-MM-DD-hh-mm-ss", inputData.created_at)}
            </Text>
            <Text>
              {DateFormatter("YYYY-MM-DD-hh-mm-ss", inputData.updated_at)}
            </Text>
          </View>
        </View>
      </View>
      <View style={tw("flex gap-4 p-4")}>
        <Text>Description :</Text>
        <Text style={tw("text-base font-medium text-gray-700")}>
          {inputData.description || loremIpsum}
        </Text>
      </View>
    </>
  );
};

const BodyOfOrdersInvoices = (props) => {
  const { inputData } = props;

  const [summary, setSummary] = useState({
    products: null,
    categories: null,
    total_prices: null,
  });

  // useEffect(() => {
  //   if (inputData) {
  //     setSummary({
  //       ...summary,
  //       products: inputData.items.products.length(),
  //       categories: null,
  //       total_prices: null,
  //     });
  //   }
  // }, [inputData]);

  return (
    <>
      {inputData && (
        <>
          <View style={tw("flex flex-row w-full text-lg")}>
            {/* <View style={tw("flex w-1/3 justify-start")}>
          <Image
            style={tw("h-80 w-80 sm:flex text-center rounded-lg")}
            // src={`${ServerProductsImg}${inputData.pict}`}//reactpdf CORS s SCK
            src={`${ServerAPIProductsImg}${inputData.id}`}
          ></Image>
        </View> */}
            <View style={tw("flex flex-row w-2/3 justify-start")}>
              <View style={tw("flex gap-4 justify-start p-4 bg-slate-100")}>
                <Text>No Invoices : </Text>
                <Text>Customer :</Text>
                <Text>Status :</Text>
                <Text>Total Price :</Text>
                <Text>Created at :</Text>
                <Text>Deadline Payment :</Text>
              </View>
              <View
                style={tw(
                  "flex gap-4 justify-start p-4 text-gray-800 capitalize"
                )}
              >
                <Text>{inputData.no_invoice}</Text>
                <Text>{inputData.user.username}</Text>
                <Text>{inputData.status}</Text>
                <Text>{CurrencyFormatter(inputData.total_price)}</Text>
                <Text>
                  {DateFormatter("YYYY-MM-DD-hh-mm-ss", inputData.created_at)}
                </Text>
                <Text>
                  {DateFormatter(
                    "YYYY-MM-DD-hh-mm-ss",
                    inputData.deadline_payment
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw("flex gap-4 p-4 text-lg")}>
            <Text>List Products :</Text>
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <View style={styles.tableWidth.no}>
                  <Text style={styles.tableCell}>No</Text>
                </View>
                <View style={styles.tableWidth.products}>
                  <Text style={styles.tableCell}>Product</Text>
                </View>
                <View style={styles.tableWidth.category}>
                  <Text style={styles.tableCell}>Category</Text>
                </View>
                <View style={styles.tableWidth.quantity}>
                  <Text style={styles.tableCell}>Quantity</Text>
                </View>
                <View style={styles.tableWidth.total_price}>
                  <Text style={styles.tableCell}>Price</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Discount %</Text>
                </View>
              </View>
              {inputData.items.map((product, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableWidth.no}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableWidth.products}>
                    <Text style={styles.tableCell}>{product.product.name}</Text>
                  </View>
                  <View style={styles.tableWidth.category}>
                    <Text style={styles.tableCell}>
                      {product.product.category}
                    </Text>
                  </View>
                  <View style={styles.tableWidth.quantity}>
                    <Text style={styles.tableCell}>{product.quantity}</Text>
                  </View>
                  <View style={styles.tableWidth.total_price}>
                    <Text style={styles.tableCell}>
                      {CurrencyFormatter(product.sum_price)}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {product.discount ?? "0%"}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.tableHead}>
                <View style={styles.tableWidth.no}>
                  <Text style={styles.tableCell}>Sum</Text>
                </View>
                <View style={styles.tableWidth.products}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableWidth.category}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableWidth.quantity}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableWidth.total_price}>
                  <Text style={styles.tableCell}>
                    {CurrencyFormatter(inputData.total_price)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
          </View>
          <View style={tw("flex gap-4 p-4 text-lg")}>
            <Text>Comments :</Text>
          </View>
        </>
      )}
    </>
  );
};
