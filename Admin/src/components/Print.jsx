import { useRef, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { useReactToPrint } from "react-to-print";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
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
      <main className="min-h-screen bg-gray-200 w-full">
        <ReactToPrint employee={employee} />
      </main>
      {/* <div>
        <PDFViewer width="1000" height="600">
          <ReactPDF />
        </PDFViewer>
      </div> */}
    </>
  );
};

export const ReactPDF = (props) => {
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
        <Page size="A4">
          <View style={tw("p-20 bg-gray-100 bg-slate-200")}>
            <Text style={tw("font-roboto-bold text-red-400 text-3xl")}>
              Section #1
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const ReactToPrint = ({ employee }) => {
  let componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${employee.name.replace(/\s/g, "-")}-Payslip`,
    onPrintError: () => alert("there is an error when printing"),
  });
  return (
    <>
      <section
        className="min-h-[85vh] p-4 lg:p-8 max-w-4xl mx-auto"
        ref={componentRef}
      >
        <div className="m-4">
          <p>sd</p>
        </div>
        <div className="print:hidden">
          <button
            onClick={handlePrint}
            className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
          >
            Print Payslip
          </button>
        </div>
      </section>
    </>
  );
};
