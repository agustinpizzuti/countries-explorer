import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetPage = () => {
    setPage(1);
  };

  return { page, nextPage, prevPage, resetPage };
};