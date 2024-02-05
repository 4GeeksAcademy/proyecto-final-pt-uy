import React from "react";

export default function Pagination({pagination, setPagination}) {

    return (
        <nav className='my-4'>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className='page-link'
                        onClick={() => setPagination({
                            currentPage: pagination.currentPage - 1,
                            offset: pagination.offset - pagination.limit
                        })}
                    >
                        Anterior
                    </button>
                </li>
                {
                    Array.from({ length: pagination.totalPages }, (value, index) => 1 + index).map((pageNum) => {
                        return (
                            <li className="page-item" key={pageNum}>
                                <button
                                    className={`page-link ${pagination.currentPage === pageNum ? "active" : ""}`}
                                    onClick={() => setPagination({
                                        currentPage: pageNum,
                                        offset: (pagination.limit * pageNum) - pagination.limit
                                    })}
                                >
                                    {pageNum}
                                </button>
                            </li>
                        )
                    })
                }
                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                    <button
                        className='page-link'
                        onClick={() => setPagination({
                            currentPage: pagination.currentPage + 1,
                            offset: pagination.offset + pagination.limit
                        })}
                    >
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    );
}