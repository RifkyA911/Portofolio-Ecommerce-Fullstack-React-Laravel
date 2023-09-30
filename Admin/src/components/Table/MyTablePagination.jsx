import React, { useState, useEffect } from "react";
import { MuiIcon } from "../../utils/RenderIcons";

export const MyTablePagination = (props) => {
  const {
    paginate,
    onChangePaginate,
    rows,
    onRowsChange,
    length,
    maxPageLimit,
    minPageLimit,
    BgOuterTable,
    textColor,
  } = props;

  const [currentPage, setCurrentPage] = useState(paginate);
  const [tailPage, setTailPage] = useState(10);
  const [totalRows, setTotalRows] = useState(rows);
  const [totalItems, setTotalItems] = useState(length || 100); // temporary

  const totalPages = Math.ceil(totalItems / rows);
  // Batasi jumlah tombol maksimal menjadi 5.
  const maxButtons = 5;

  // Inisialisasi array untuk menyimpan nomor halaman yang akan ditampilkan.
  const pageNumbers = [];

  // Tentukan awal dan akhir dari rentang tombol.
  let start = 1;
  let end = totalPages;

  // Jika totalPages lebih dari maxButtons, kita akan membatasi rentang tombol.
  if (totalPages > maxButtons) {
    const half = Math.floor(maxButtons / 2);

    if (currentPage <= half) {
      end = maxButtons;
    } else if (currentPage >= totalPages - half) {
      start = totalPages - maxButtons + 1;
    } else {
      start = currentPage - half + 1;
      end = currentPage + half;
    }
  }

  // Tambahkan tombol "Prev" jika currentPage bukan di halaman pertama.
  if (currentPage > 1) {
    pageNumbers.push(
      <button
        onClick={() => {
          handlePageChange(currentPage - 1);
          onChangePaginate(parseInt(currentPage - 1));
        }}
        disabled={currentPage === 1}
        className="px-4 py-2 hover:text-violet-500 cursor-pointer"
      >
        <MuiIcon iconName="ArrowBackIosNewTwoTone" fontSize={18} />
      </button>
    );
  }

  // Tambahkan tombol "..." jika currentPage bukan di halaman pertama.
  if (start > 1) {
    pageNumbers.push(
      <button
        key="left-dots"
        className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
      >
        ...
      </button>
    );
  }

  // Buat tombol halaman dalam rentang yang ditentukan.
  for (let i = start; i <= end; i++) {
    pageNumbers.push(
      <button
        key={i}
        className={`px-4 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200 ${
          i === currentPage ? "bg-gray-300" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  // Tambahkan tombol "..." jika currentPage bukan di halaman terakhir.
  if (end < totalPages) {
    pageNumbers.push(
      <button
        key="right-dots"
        className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
      >
        ...
      </button>
    );
  }

  // Tambahkan tombol "Next" jika currentPage bukan di halaman terakhir.
  if (currentPage < totalPages) {
    pageNumbers.push(
      <button
        onClick={() => {
          handlePageChange(currentPage + 1);
          onChangePaginate(parseInt(currentPage + 1));
        }}
        disabled={currentPage === totalPages}
        className="px-4 py-2 hover:text-violet-500 cursor-pointer"
      >
        <MuiIcon iconName="ArrowForwardIosTwoTone" fontSize={18} />
      </button>
    );
  }

  useEffect(() => {
    setTotalItems(length);
    // console.log("pagin: ", rows);
  });

  // Custom Pagination Handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setTailPage(newPage);
    }
  };

  return (
    <div className="">
      {totalPages}
      {currentPage}
      <div>
        <div
          align="center"
          colSpan="5"
          className={`${BgOuterTable} ${textColor} `}
        >
          <div
            className={`${BgOuterTable} line-clamp-1 flex flex-wrap lg:flex-row h-12 font-roboto-medium text-base p-0 justify-center items-center`}
          >
            <div className="selector w-auto">
              <span className="px-4 font-roboto-regular text-base">
                Rows per page:
              </span>
              <select
                className="select select-bordered select-sm text-dark cursor-pointer focus:outline-none"
                autoComplete="off"
                value={rows}
                onChange={(e) => {
                  onRowsChange(parseInt(e.target.value));
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <span className="px-4">
                {currentPage * totalRows - totalRows + 1}-
                {Math.min(currentPage * totalRows, totalItems)} of {totalItems}
              </span>
            </div>
            <div className="navigate max-w-[420px] overflow-y-scroll">
              {pageNumbers}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
