import React from "react";
import Pagination from "react-responsive-pagination";
// Bootstrap 4.x styles included somewhere in the project
import "./pagination.css";

function RPagination({ pagination, setPagination }) {
  function handlePageChange(page) {
    setPagination({ ...pagination, current: page });
    // ... do something with `page`
  }

  return (
    <Pagination
      total={Math.ceil(pagination.count / 10)}
      current={pagination.current}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
}

export default RPagination;
