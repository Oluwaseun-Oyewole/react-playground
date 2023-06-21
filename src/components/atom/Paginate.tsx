import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useFetchContextProvider } from "../../context/fetch-context";

export const PaginatedItems = ({ itemsPerPage }: any) => {
  const { states } = useFetchContextProvider();
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = states.data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(states?.data?.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % states.data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName="bg-red-500"
      />
    </>
  );
};
