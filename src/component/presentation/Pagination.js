import React from "react";

const Pagination = ({start, last, paginate}) => {
    const pageNumbers = [];
    for (let i = start; i <= last; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul>
            {
                pageNumbers.map(number => (
                    <li key={number} className="pagination">
                        <span onClick={() => paginate(number)}>
                            {number}
                        </span>
                    </li>
                ))
            }
        </ul>
    );
}

export default Pagination;