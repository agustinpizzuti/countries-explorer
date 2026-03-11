export const paginate = (items, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const page = Math.min(Math.max(currentPage, 1), totalPages); // asegura que esté en rango
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return {
    pagedItems: items.slice(start, end),
    currentPage: page,
    totalPages,
  };
};