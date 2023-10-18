import { useRef, useState } from "react";
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
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { useReactToPrint } from "react-to-print";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  image: {
    width: 40,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#b2b2b2",
    borderWidth: 1,
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    margin: 5,
    borderStyle: "solid",
    borderColor: "#b2b2b2",
    borderWidth: 1,
    padding: 5,
  },
});

export const PrintTest = (props) => {
  const [employee, setEmployee] = useState({
    id: 1685328248504,
    name: "John Doe",
    email: "johndoe@gmail.com",
    position: "accountant",
    cadreLevel: "Consultant",
    isAdmin: false,
    earnings: {
      basic: 5000,
      transport: 1000,
      overtime: 370,
      housing: 700,
    },
    deductions: {
      tax: 500,
      pension: 200,
    },
  });

  return (
    <>
      {/* <div tabIndex={0} className="collapse border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">
          Focus me to see content
        </div>
        <div className="collapse-content">
        </div>
      </div> */}
      <div className="mx-auto">
        <PDFViewer className="mx-auto" width="1000" height="600">
          <ReactPDF />
        </PDFViewer>
      </div>
      {/* Ukuran kertas F4 dalam pixel (72 DPI) = 595 x 935 pixel 
      Ukuran kertas F4 dalam pixel (96 DPI) = 793 x 1247 pixel 
      Ukuran kertas F4 dalam pixel (150 DPI) = 1240 x 1948 pixel 
      Ukuran kertas F4 dalam pixel (300 DPI) = 2481 x 3897 pixel */}
      <main className="min-h-screen bg-white shadow-lg mx-auto h-[816px] w-[1054px]">
        <ReactToPrint employee={employee} />
      </main>
    </>
  );
};

export const ReactPDF = (props) => {
  const CompanyProfileURL = import.meta.env.VITE_COMPANY_PROFILE;

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
  return (
    <>
      <Document>
        <Page size="LETTER" dpi={96}>
          {/* =================== HEADER =================== */}
          <View
            style={tw(
              "header p-4 bg-gray-100 shadow-xl xborder-b-2 border-slate-200 flex flex-row justify-between items-center max-h-[140px] overflow-hidden w-full"
            )}
          >
            {/* Left */}
            <Link
              src={CompanyProfileURL}
              style={tw(
                "order-first flex flex-row w-2/3 justify-start self-start"
              )}
            >
              <Image
                style={tw("h-20 w-20 p-2 hidden sm:flex text-center")}
                src={"src/assets/logo.png"}
              />
              <View
                style={tw(
                  "mx-4 flex flex-col gap-1 items-start capitalize underline text-gray-900 hover:text-gray-800 visited:text-gray-800"
                )}
              >
                <Text style={tw("font-extrabold text-large")}>
                  Your Company Name
                </Text>
                <Text style={tw("font-semibold text-base line-clamp-2")}>
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
            <View
              style={tw("order-last flex flex-row w-1/3 justify-end self-end")}
            >
              <View style={tw("mx-4 flex flex-col justify-between items-end")}>
                <Text style={tw("text-base")}>INVOICE : 2021/INV/017</Text>
                <View style={tw("flex flex-col justify-between items-end")}>
                  <Text style={tw("text-base")}>Date : 12/12/2000</Text>
                  <Text style={tw("text-base")}>Admin : Silver Wolf IXX</Text>
                </View>
              </View>
            </View>
          </View>
          {/* =================== BODY =================== */}
          <View
            style={tw(
              "flex flex-col bg-to-gradient-l from-indigo-200 to-violet-300 w-full p-12"
            )}
          >
            <View style={tw("flex flex-row w-full")}>
              <View style={tw("flex w-1/3 justify-start ")}>
                <Image
                  style={tw(
                    "h-80 w-80 p-2 sm:flex text-center shadow-lg rounded-lg"
                  )}
                  src={"./src/assets/user_avatar/84719630_p0.jpg"}
                ></Image>
              </View>
              <View style={tw("flex flex-row w-2/3 justify-start p-2 ")}>
                <View style={tw("flex gap-4 justify-start p-4 bg-slate-100")}>
                  <Text style={tw("sborder-b-2")}>Barcode : </Text>
                  <Text style={tw("sborder-b-2")}>Name :</Text>
                  <Text style={tw("sborder-b-2")}>Category :</Text>
                  <Text style={tw("sborder-b-2")}>Price :</Text>
                  <Text style={tw("sborder-b-2")}>Discount :</Text>
                  <Text style={tw("sborder-b-2")}>Created at :</Text>
                  <Text style={tw("sborder-b-2")}>Updated at :</Text>
                </View>
                <View style={tw("flex gap-4 justify-start p-4 text-gray-800")}>
                  <Text style={tw("")}>213123231 </Text>
                  <Text style={tw("")}>Topi Kuning</Text>
                  <Text style={tw("")}>Topi</Text>
                  <Text style={tw("")}>Rp. 250.000,00</Text>
                  <Text style={tw("")}>15%</Text>
                  <Text style={tw("")}>2023-10-17T09:16:15.000000Z</Text>
                  <Text style={tw("")}>2023-10-17T09:16:15.000000Z</Text>
                </View>
              </View>
            </View>
            <View style={tw("flex gap-4 p-4")}>
              <Text style={tw("")}>Description :</Text>
              <Text
                style={tw(
                  "text-base font-medium line-clamp-[30] text-gray-700"
                )}
              >
                Lorem Ipsum adalah contoh teks atau dummy dalam industri
                percetakan dan penataan huruf atau typesetting. Lorem Ipsum
                telah menjadi standar contoh teks sejak tahun 1500an, saat
                seorang tukang cetak yang tidak dikenal mengambil sebuah
                kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh
                huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah
                beralih ke penataan huruf elektronik, tanpa ada perubahan
                apapun. Ia mulai dipopulerkan pada tahun 1960 dengan
                diluncurkannya lembaran-lembaran Letraset yang menggunakan
                kalimat-kalimat dari Lorem Ipsum, dan seiring munculnya
                perangkat lunak Desktop Publishing seperti Aldus PageMaker juga
                memiliki versi Lorem Ipsum.
                {""}
                Tidak seperti anggapan banyak orang, Lorem Ipsum bukanlah
                teks-teks yang diacak. Ia berakar dari sebuah naskah sastra
                latin klasik dari era 45 sebelum masehi, hingga bisa dipastikan
                usianya telah mencapai lebih dari 2000 tahun. Richard
                McClintock, seorang professor Bahasa Latin dari Hampden-Sidney
                College di Virginia, mencoba mencari makna salah satu kata latin
                yang dianggap paling tidak jelas, yakni consectetur, yang
                diambil dari salah satu bagian Lorem Ipsum. Setelah ia mencari
                maknanya di di literatur klasik, ia mendapatkan sebuah sumber
                yang tidak bisa diragukan. Lorem Ipsum berasal dari bagian
                1.10.32 dan 1.10.33 dari naskah "de Finibus Bonorum et Malorum"
                (Sisi Ekstrim dari Kebaikan dan Kejahatan) karya Cicero, yang
                ditulis pada tahun 45 sebelum masehi. BUku ini adalah risalah
                dari teori etika yang sangat terkenal pada masa Renaissance.
                Baris pertama dari Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                berasal dari sebuah baris di bagian 1.10.32.
              </Text>
            </View>
            {/* <Svg></Svg> */}
          </View>
        </Page>
        {/* <Text style={tw("")}></Text> */}
      </Document>
    </>
  );
};

export const ReactToPrint = ({ employee }) => {
  let componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Payslip`,
    onPrintError: () => alert("there is an error when printing"),
  });

  const defineTable = {
    head: [
      "barcode",
      "name",
      "category",
      "price",
      "discount",
      "description",
      "created_at",
      "updated_at",
    ],
    body: [
      2323232,
      "kirara",
      "topi",
      35000,
      3,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et condimentum erat. consectetur adipiscing elit.",
      "created_at",
      "updated_at",
    ],
  };
  return (
    <>
      <section className="min-h-[85vh] p-4 lg:p-8 " ref={componentRef}>
        <div className="header flex flex-row justify-between items-center max-h-[140px] overflow-hidden">
          <div className="order-first flex flex-row w-2/3 justify-start self-start">
            <img
              src="src\assets\logo.png"
              alt="logo"
              className="h-14 w-14 p-2 hidden sm:flex text-center"
            />
            <div className="mx-4 flex flex-col items-start ">
              <h1 className="font-roboto-bold">Your Company Name</h1>
              <small className="font-roboto-medium line-clamp-2">
                Jl. Mayjend. Sungkono Blok B 1 no. 105 Surabaya 6025
              </small>
              <small>Phone: 031-5671868; Fax: 031-5664979</small>
              <small>E-mail: drarya2006@gmail.com</small>
            </div>
          </div>
          <div className="order-last flex flex-row w-1/3 justify-end self-start">
            <div className="mx-4 flex flex-col justify-between items-end">
              <h2 className="text-md font-roboto-medium">
                Invoice : 2021/INV/017
              </h2>
              <div className="flex flex-col justify-between items-end">
                <p className=" text-xs">
                  <span className="font-roboto-medium">Date : </span>12/12/2000
                </p>
                <p className="text-xs">
                  <span className="font-roboto-medium">Admin : </span>Silver
                  Wolf IXX
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="body flex flex-row justify-between items-start m-8">
          <div className="flex w-1/2 justify-start">
            <img
              src="./src/assets/user_avatar/85d24f2a-2336-478d-9984-729a55e82db1.jpg"
              alt="logo"
              className="w-80 sm:flex text-center shadow-lg rounded-md"
            />
          </div>
          <div className="flex w-1/2 justify-end">
            <table className="w-full border-gray-600 font-roboto">
              <tbody>
                <tr className="border-b-2">
                  <th className="bg-slate-300 h-16 w-36">Barcode</th>
                  <td className="bg-white text-center">
                    <Barcode
                      className={`xh-[70px] p-0 m-0 xmax-w-[150px] mx-auto`}
                      value={23232323}
                      options={{ displayValue: true, height: 40, fontSize: 12 }}
                    />
                  </td>
                </tr>
                <tr className="border-b-2">
                  <th className="bg-slate-300 h-16">Name</th>
                  <td className="bg-white text-left pl-8">Kirara</td>
                </tr>
                <tr className="border-b-2">
                  <th className="bg-slate-300 h-16">Category</th>
                  <td className="bg-white text-left pl-8">Topi</td>
                </tr>
                <tr className="border-b-2">
                  <th className="bg-slate-300 h-16">Price</th>
                  <td className="bg-white text-left pl-8">Rp. 20,000</td>
                </tr>
                <tr className="">
                  <th className="bg-slate-300 h-16">Discount</th>
                  <td className="bg-white text-left pl-8">20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-left p-12">
          <h4 className="font-poppins-bold">Description : </h4>
          <p className="font-roboto-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
            condimentum erat. consectetur adipiscing elit.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Donec et condimentum erat.
            consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Donec et condimentum erat. consectetur adipiscing
            elit.
          </p>
        </div>
        {/* <div className="print:hidden">
          <button
            onClick={handlePrint}
            className="btn bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
          >
            Print
          </button>
        </div> */}
      </section>
    </>
  );
};
