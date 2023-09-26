import React, { useState, useEffect } from "react";
import { MuiIcon } from "../../utils/RenderIcons";

export const MyTablePagination = (props) => {
  const { items } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [tailPage, setTailPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(100 / itemsPerPage);

  // console.log(URLadmins);
  useEffect(() => {
    setTotalItems(items.length);
  }, []);

  // Custom Pagination Handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setTailPage(newPage);
    }
  };
  return (
    <div className="font-roboto-medium text-base p-0">
      <span className="px-4 font-roboto-regular">Rows per page:</span>
      <select
        className="select select-bordered select-sm"
        value={itemsPerPage}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <span className="px-4">
        {currentPage * itemsPerPage - itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 hover:text-violet-500"
      >
        <MuiIcon iconName="ArrowBackIosNewTwoTone" fontSize={18} />
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 hover:text-violet-500"
      >
        <MuiIcon iconName="ArrowForwardIosTwoTone" fontSize={18} />
      </button>
    </div>
  );
};
