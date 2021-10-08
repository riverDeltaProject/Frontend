import React from "react";

const Pagination = ({start, last, paginate}) => {
    const pageNumbers = [];
    for (let i = start; i <= last; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {
                pageNumbers.map(number => (
                    <li key={number}>
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