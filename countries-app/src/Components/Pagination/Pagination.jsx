import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className="navigation">
      <button onClick={prevPage} disabled={currentPage === 1}>
        ⬅
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        ➡
      </button>
    </div>
  );
};

export default Pagination;