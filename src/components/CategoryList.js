import Category from "./Category"

const CategoryList = (props) => {
    return(
        <nav id="main-menu" className="stick d-lg-block d-none">
            <div className="container">
                <div className="menu-primary">
                <ul>
                <li className="menu-primary" 
                    onClick={() => {props.selectedCategoryHandler(0)}}>
                        <a>All</a></li>
                    {props.categories.map((c) => 
                        <Category 
                            key={c.Id} 
                            id={c.Id} 
                            name={c.Name} 
                            selectedCategoryHandler={props.selectedCategoryHandler} />)}
                </ul>
                <span></span>
            </div>
            </div>
        </nav>
    )
}

export default CategoryList;