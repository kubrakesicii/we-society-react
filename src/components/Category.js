

const Category = (props) => {
    return(
        <>
            <li className="menu-primary" 
            onClick={() => {props.selectedCategoryHandler(props.id)}}>
                <a>{props.Name}</a></li>
        </>
    )
}


export default Category;