import React from "react";
import "../styles/pagination.css"; // Import pagination styles

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>
        PrevPage
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
