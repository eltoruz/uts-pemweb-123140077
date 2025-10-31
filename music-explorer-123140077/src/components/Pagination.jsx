"use client"

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="pagination-container">
      <button className="pagination-btn pagination-prev" onClick={handlePrevious} disabled={currentPage === 1}>
        ← Sebelumnya
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-number ${page === currentPage ? "active" : ""} ${page === "..." ? "dots" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="pagination-btn pagination-next" onClick={handleNext} disabled={currentPage === totalPages}>
        Selanjutnya →
      </button>
    </div>
  )
}

export default Pagination
