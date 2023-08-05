import React from 'react'

const Pagination = (props) => {
    console.log("props: ",props);
  return (
    <ul class="pagination">
        {/* <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
        </a>
        </li> */}
        {
        Array.from({length:props.count}, (el,ind) =>
        <li class="page-item" key={ind}
            // onClick={(e) => e.currentTarget.classList.add("active")}
            >
            <a className="page-link" data-value={ind+1}
            onClick={(e) => {
                const clickedPage = e.target.getAttribute('data-value');              
                props.pageIndexHandler(clickedPage)
             }}>
            {ind+1}
            </a>
        </li>)} 

        {/* <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
        </a>
        </li> */}
    </ul>
  )
}


export default Pagination;
