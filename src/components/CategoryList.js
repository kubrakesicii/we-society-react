import Category from "./Category"

const CategoryList = (props) => {
    return(
        <nav id="main-menu" className="stick d-lg-block d-none">
            <div className="container">
                <div className="menu-primary">
                <ul>
                    <li className="current-menu-item"><a href="index.html">Home</a></li>
                    {props.categories.map((c) => <Category key={c.id} id={c.id} name={c.name} />)}
                </ul>
                <span></span>
            </div>
            </div>
        </nav>
    )
}

export default CategoryList;