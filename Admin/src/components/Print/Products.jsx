import { useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  Svg,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { styles } from "./Styles";

import { GetDate, GetDateTime } from "../../utils/Formatter";
import { getUser } from "../../utils/Session/Admin";

const CompanyProfileURL = import.meta.env.VITE_COMPANY_PROFILE;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
const userSession = getUser();

const loremIpsum = `Lorem Ipsum adalah contoh teks atau dummy dalam industri
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
${""}
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
berasal dari sebuah baris di bagian 1.10.32.`;

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

const fetchImage = async (data) => {
  url = "http://127.0.0.1:8000/api/image/admin/" + data;
  response = await axios
    .post(url)
    .then((data) => {
      console.info(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const PartOfHeader = () => {
  return (
    <>
      <View
        style={tw(
          "p-4 bg-gray-100 border-b-2 border-slate-200 flex flex-row justify-between items-center max-h-[140px] overflow-hidden w-full"
        )}
        // style={styles.header}
      >
        {/* Left */}
        <Link
          src={CompanyProfileURL}
          style={tw("order-first flex flex-row w-2/3 justify-start self-start")}
          // style={styles.headerLeft}
        >
          <Image
            style={tw("h-20 w-20 hidden sm:flex text-center")}
            // style={styles.headerLeftPict}
            src={"src/assets/logo.png"}
          />
          <View
            style={tw(
              "mx-4 flex flex-col gap-1 items-start capitalize underline text-gray-900 hover:text-gray-800 visited:text-gray-800"
            )}
            // style={styles.headerLeftText}
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
        <View
          style={tw("order-last flex flex-row w-1/3 justify-end self-end")}
          // style={styles.headerRight}
        >
          <View style={tw("mx-4 flex flex-col justify-between items-end")}>
            <Text style={tw("text-base")}>INVOICE : 2021/INV/017</Text>
            <View style={tw("flex flex-col justify-between items-end")}>
              <Text style={tw("text-base")}>Date Created : {GetDate()}</Text>
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
  const { inputData } = props;
  return (
    <>
      <View style={tw("flex flex-col w-full p-12")}>
        <View style={tw("flex flex-row w-full")}>
          <View style={tw("flex w-1/3 justify-start")}>
            <Image
              style={tw("h-80 w-80 sm:flex text-center rounded-lg")}
              //   src={"./src/assets/user_avatar/84719630_p0.jpg"}
              src={`${ServerProductsImg}${inputData.pict}`}
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
              style={tw(
                "flex gap-4 justify-start p-4 text-gray-800 capitalize"
              )}
            >
              <Text>{inputData.barcode}</Text>
              <Text>{inputData.name}</Text>
              <Text>{inputData.category.name}</Text>
              <Text>Rp. {inputData.price}</Text>
              <Text>{inputData.discount} %</Text>
              <Text>{inputData.created_at}</Text>
              <Text>{inputData.updated_at}</Text>
            </View>
          </View>
        </View>
        <View style={tw("flex gap-4 p-4")}>
          <Text>Description :</Text>
          <Text style={tw("text-base font-medium text-gray-700")}>
            {inputData.description || loremIpsum}
          </Text>
        </View>
        {/* <Svg></Svg> */}
      </View>
    </>
  );
};

export const PrintProducts = (props) => {
  const { inputData, printType } = props;

  return (
    <>
      {inputData && (
        <>
          {printType === "SINGLE" && (
            <Page size="LETTER" dpi={96}>
              <View style={styles.page}>
                {/* =================== HEADER =================== */}
                <PartOfHeader />
                {/* =================== BODY =================== */}
                <PartOfBody inputData={inputData} />
              </View>
            </Page>
          )}
          {printType === "BATCH" && (
            <>
              {inputData.map((row, index) => (
                <Page key={row.id} size="LETTER" dpi={96}>
                  <View style={styles.page}>
                    {/* =================== HEADER =================== */}
                    <PartOfHeader />
                    {/* =================== BODY =================== */}
                    <PartOfBody inputData={row} />
                  </View>
                </Page>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export const PrintInvoices = (props) => {
  const { inputData, printType } = props;

  return (
    <>
      {inputData && (
        <>
          {printType === "SINGLE" && (
            <View style={styles.page}>
              {/* =================== HEADER =================== */}
              <View
                style={tw(
                  "p-4 bg-gray-100 border-b-2 border-slate-200 flex flex-row justify-between items-center max-h-[140px] overflow-hidden w-full"
                )}
                // style={styles.header}
              >
                {/* Left */}
                <Link
                  src={CompanyProfileURL}
                  style={tw(
                    "order-first flex flex-row w-2/3 justify-start self-start"
                  )}
                  // style={styles.headerLeft}
                >
                  <Image
                    style={tw("h-20 w-20 hidden sm:flex text-center")}
                    // style={styles.headerLeftPict}
                    src={"src/assets/logo.png"}
                  />
                  <View
                    style={tw(
                      "mx-4 flex flex-col gap-1 items-start capitalize underline text-gray-900 hover:text-gray-800 visited:text-gray-800"
                    )}
                    // style={styles.headerLeftText}
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
                <View
                  style={tw(
                    "order-last flex flex-row w-1/3 justify-end self-end"
                  )}
                  // style={styles.headerRight}
                >
                  <View
                    style={tw("mx-4 flex flex-col justify-between items-end")}
                  >
                    <Text style={tw("text-base")}>INVOICE : 2021/INV/017</Text>
                    <View style={tw("flex flex-col justify-between items-end")}>
                      <Text style={tw("text-base")}>
                        Date Created : {GetDate()}
                      </Text>
                      <Text style={tw("text-base")}>
                        Admin : {userSession.username}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* =================== BODY =================== */}
              <View style={tw("flex flex-col w-full p-12")}>
                <View style={tw("flex flex-row w-full")}>
                  <View style={tw("flex w-1/3 justify-start")}>
                    <Image
                      style={tw("h-80 w-80 sm:flex text-center rounded-lg")}
                      //   src={"./src/assets/user_avatar/84719630_p0.jpg"}
                      src={`${ServerProductsImg}${inputData.pict}`}
                    ></Image>
                  </View>
                  <View style={tw("flex flex-row w-2/3 justify-start")}>
                    <View
                      style={tw("flex gap-4 justify-start p-4 bg-slate-100")}
                    >
                      <Text>Barcode : </Text>
                      <Text>Name :</Text>
                      <Text>Category :</Text>
                      <Text>Price :</Text>
                      <Text>Discount :</Text>
                      <Text>Created at :</Text>
                      <Text>Updated at :</Text>
                    </View>
                    <View
                      style={tw(
                        "flex gap-4 justify-start p-4 text-gray-800 capitalize"
                      )}
                    >
                      <Text>{inputData.barcode}</Text>
                      <Text>{inputData.name}</Text>
                      <Text>{inputData.category_name}</Text>
                      <Text>Rp. {inputData.price}</Text>
                      <Text>{inputData.discount} %</Text>
                      <Text>{inputData.created_at}</Text>
                      <Text>{inputData.updated_at}</Text>
                    </View>
                  </View>
                </View>
                <View style={tw("flex gap-4 p-4")}>
                  <Text>Description :</Text>
                  <Text style={tw("text-base font-medium text-gray-700")}>
                    {inputData.description || loremIpsum}
                  </Text>
                </View>
                {/* <Svg></Svg> */}
              </View>
            </View>
          )}
          {printType === "BATCH" && (
            <>
              {inputData.map((row, index) => (
                <Page key={row.id} size="LETTER" dpi={96}>
                  <View style={styles.page}>
                    {/* =================== HEADER =================== */}
                    <View
                      // style={tw(
                      //   "header p-4 bg-gray-100 shadow-xl xborder-b-2 border-slate-200 flex flex-row justify-between items-center max-h-[140px] overflow-hidden w-full"
                      // )}
                      style={styles.header}
                    >
                      {/* Left */}
                      <Link
                        src={CompanyProfileURL}
                        // style={tw(
                        //   "order-first flex flex-row w-2/3 justify-start self-start"
                        // )}
                        style={styles.headerLeft}
                      >
                        <Image
                          style={tw("h-20 w-20 hidden sm:flex text-center")}
                          // style={styles.headerLeftPict}
                          src={"src/assets/logo.png"}
                        />
                        <View
                          style={tw(
                            "mx-4 flex flex-col gap-1 items-start capitalize underline text-gray-900 hover:text-gray-800 visited:text-gray-800"
                          )}
                          // style={styles.headerLeftText}
                        >
                          <Text style={tw("font-extrabold")}>
                            Your Company Name
                          </Text>
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
                      <View
                        // style={tw("order-last flex flex-row w-1/3 justify-end self-end")}
                        style={styles.headerRight}
                      >
                        <View
                          style={tw(
                            "mx-4 flex flex-col justify-between items-end"
                          )}
                        >
                          <Text style={tw("text-base")}>
                            INVOICE : 2021/INV/017
                          </Text>
                          <View
                            style={tw(
                              "flex flex-col justify-between items-end"
                            )}
                          >
                            <Text style={tw("text-base")}>
                              Date Created : {GetDate()}
                            </Text>
                            <Text style={tw("text-base")}>
                              Admin : {userSession.username}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/* =================== BODY =================== */}
                    <View style={tw("flex flex-col w-full p-12")}>
                      <View style={tw("flex flex-row w-full")}>
                        <View style={tw("flex w-1/3 justify-start")}>
                          <Image
                            style={tw(
                              "h-80 w-80 sm:flex text-center rounded-lg"
                            )}
                            //   src={"./src/assets/user_avatar/84719630_p0.jpg"}
                            src={`${ServerProductsImg}${row.pict}`}
                          ></Image>
                        </View>
                        <View style={tw("flex flex-row w-2/3 justify-start")}>
                          <View
                            style={tw(
                              "flex gap-4 justify-start p-4 bg-slate-100"
                            )}
                          >
                            <Text>Barcode : </Text>
                            <Text>Name :</Text>
                            <Text>Category :</Text>
                            <Text>Price :</Text>
                            <Text>Discount :</Text>
                            <Text>Created at :</Text>
                            <Text>Updated at :</Text>
                          </View>
                          <View
                            style={tw(
                              "flex gap-4 justify-start p-4 text-gray-800 capitalize"
                            )}
                          >
                            <Text>{row.barcode}</Text>
                            <Text>{row.name}</Text>
                            <Text>{row.category.name}</Text>
                            <Text>Rp. {row.price}</Text>
                            <Text>{row.discount} %</Text>
                            <Text>{row.created_at}</Text>
                            <Text>{row.updated_at}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={tw("flex gap-4 p-4")}>
                        <Text>Description :</Text>
                        <Text style={tw("text-base font-medium text-gray-700")}>
                          {row.description || loremIpsum}
                        </Text>
                      </View>
                      {/* <Svg></Svg> */}
                    </View>
                  </View>
                </Page>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
