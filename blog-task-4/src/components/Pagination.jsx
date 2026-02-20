export default function Pagination({
  currentPage,
  totalPages,
  setPage,
  visiblePages = 7,
}) {
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }
  return (
    <div className="home-pagination-container general-container">
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            className={
              currentPage === pageNumber ? "page-button active" : "page-button"
            }
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
