import React, { useState, useEffect } from "react";
import { MuiIcon } from "../../utils/RenderIcons";

export const MyTablePagination = (props) => {
  const {
    paginate,
    onChangePaginate,
    rows,
    onRowsChange,
    maxPageLimit,
    minPageLimit,
    BgOuterTable,
    textColor,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [tailPage, setTailPage] = useState(10);
  const [totalRows, setTotalRows] = useState(rows);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(100 / rows);

  // console.log(URLadmins);
  useEffect(() => {
    setTotalItems(rows.length);
    console.log("pagin: ", rows);
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
      <div>
        <div
          align="center"
          colSpan="5"
          className={`${BgOuterTable} ${textColor} h-12`}
        >
          <div className="font-roboto-medium text-base p-0">
            <span className="px-4 font-roboto-regular">Rows per page:</span>
            <select
              className="select select-bordered select-sm text-dark"
              autoComplete="off"
              value={rows}
              onChange={(e) => {
                onRowsChange(parseInt(e.target.value));
              }}
              // console.log("berubah", e.target.value);
              // console.table(paginate, rows, onRowsChange);
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

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 hover:text-violet-500"
            >
              <MuiIcon iconName="ArrowBackIosNewTwoTone" fontSize={18} />
            </button>

            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              ...
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              1
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              2
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              3
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              4
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              5
            </button>
            <button className="px-2 hover:bg-gray-50 rounded-lg transition-all duration-200">
              ...
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 hover:text-violet-500"
            >
              <MuiIcon iconName="ArrowForwardIosTwoTone" fontSize={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
