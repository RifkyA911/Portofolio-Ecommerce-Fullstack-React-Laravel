import React, { useState } from "react";
import ExcelJS from "exceljs";
import { MotionButton } from "../Button";

export const ExportData = (props) => {
  const { data } = props;
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add header row
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data rows
    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      worksheet.addRow(values);
    });

    // Create a blob from the Excel file
    const blob = await workbook.xlsx.writeBuffer();

    // Create a download link and trigger click
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {data && (
        <MotionButton
          type="button"
          className="mx-1 grow-0 shrink-0 focus:outline-none bg-green-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center"
          onClick={() => {
            exportToExcel();
          }}
          icon="PiMicrosoftExcelLogoFill"
          span="Excel"
        />
      )}
    </>
  );
};
