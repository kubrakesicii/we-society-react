import React from "react";

const Pagination = (props) => {
  console.log("props: ", props);
  return (
    <ul className="pagination">
      {Array.from({ length: props.count }, (el, ind) => (
        <li
          key={ind}
          onClick={(e) => {
            // var activePage = document.getElementsByClassName("active");
            // console.log("Active : ", activePage);
            // if (activePage.length > 0) activePage[0].classList.remove("active");
            e.currentTarget.classList.add("disabled");
          }}
        >
          <a
            className="page-link"
            data-value={ind + 1}
            onClick={(e) => {
              const clickedPage = e.target.getAttribute("data-value");
              props.pageIndexHandler(clickedPage);
            }}
          >
            {ind + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
