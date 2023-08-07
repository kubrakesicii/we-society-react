import Navigation from "./Navigation";
import { GetAllCategories } from "../services/Requests/Category";
import { useEffect, useState } from "react";

const MainHeader = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [categoryList,setCategories]  = useState([])
    useEffect(() => {
        const loadData = async() => {
                setIsLoading(true)
                const categories = await GetAllCategories();
                setCategories(categories)
                setIsLoading(false)           
        }

        loadData()
    }, [])
       
    return (
        <>
        <div className="top-scroll-bar"></div>
        <div className="sticky-header fixed d-lg-none d-md-block"></div>
            <header id="header" className="d-lg-block d-none">
                <Navigation/>
            </header>


        {/* NAVIGATION MOBILE */}
        <div className="sticky-header fixed d-lg-none d-md-block">
            <div className="text-right">
                <div className="container mobile-menu-fixed pr-5">
                    <h1 className="logo-small navbar-brand"><a href="index.html" className="logo">Merinda</a></h1>

                    <a className="author-avatar" href="#"><img src="assets/images/author-avata-1.jpg" alt=""/></a>

                    <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
                        <li><a href="#"><i className="icon-facebook"></i></a></li>
                        <li><a href="#"><i className="icon-instagram"></i></a></li>
                    </ul>

                    <a href="javascript:void(0)" className="menu-toggle-icon">
                        <span className="lines"></span>
                    </a>
                </div>
            </div>

            <div className="mobi-menu">
                <div className="mobi-menu__logo">
                    <h1 className="logo navbar-brand"><a href="index.html" className="logo">Merinda</a></h1>
                </div>
                <form action="#" method="get" className="search-form d-lg-flex float-right">
                    <a href="javascript:void(0)" className="searh-toggle">
                            <i className="icon-search"></i>
                    </a>
                    <input type="text" className="search_field" placeholder="Search..." value="" name="s" />
                </form>
            </div>
        </div> 

        </>

    )
}

export default MainHeader;