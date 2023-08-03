import Category from "./Category"

const CategoryList = (props) => {
    return(
        <nav id="main-menu" class="stick d-lg-block d-none">
            <div class="container">
                <div class="menu-primary">
                <ul>
                    <li class="current-menu-item"><a href="index.html">Home</a></li>
                    {props.categories.map((c) => <Category key={c.id} id={c.id} name={c.name} />)}
                
                    <li class="menu-item-has-children"><a href="#">More...</a>
                        <ul class="sub-menu">
                            <li><a href="search.html">Search</a></li>
                            <li><a href="author.html">Author</a></li>
                            <li><a href="404.html">404</a></li>
                        </ul>
                    </li>
                </ul>
                <span></span>
            </div>
            </div>
        </nav>
    )
}

export default CategoryList;