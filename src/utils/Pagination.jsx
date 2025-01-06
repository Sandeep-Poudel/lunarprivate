function Pagination({ currentPage, setCurrentPage, totalPages }) {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800 "
            >
                Previous
            </button>
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`p-2 border rounded ${
                            currentPage === idx + 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-blue-800 hover:text-white"
                        }`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800"
            >
                Next
            </button>
        </div>
    );
}
export default Pagination;
