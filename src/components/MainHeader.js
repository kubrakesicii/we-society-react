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
        </>



        // {/* NAVIGATION MOBILE */}
        // {/* <div class="sticky-header fixed d-lg-none d-md-block">
        //     <div class="text-right">
        //         <div class="container mobile-menu-fixed pr-5">
        //             <h1 class="logo-small navbar-brand"><a href="index.html" class="logo">Merinda</a></h1>

        //             <a class="author-avatar" href="#"><img src="assets/images/author-avata-1.jpg" alt=""/></a>

        //             <ul class="social-network heading navbar-nav d-lg-flex align-items-center">
        //                 <li><a href="#"><i class="icon-facebook"></i></a></li>
        //                 <li><a href="#"><i class="icon-instagram"></i></a></li>
        //             </ul>

        //             <a href="javascript:void(0)" class="menu-toggle-icon">
        //                 <span class="lines"></span>
        //             </a>
        //         </div>
        //     </div>

        //     <div class="mobi-menu">
        //         <div class="mobi-menu__logo">
        //             <h1 class="logo navbar-brand"><a href="index.html" class="logo">Merinda</a></h1>
        //         </div>
        //         <form action="#" method="get" class="search-form d-lg-flex float-right">
        //             <a href="javascript:void(0)" class="searh-toggle">
        //                     <i class="icon-search"></i>
        //             </a>
        //             <input type="text" class="search_field" placeholder="Search..." value="" name="s" />
        //         </form>
        //     </div>
        // </div> */}

    )
}

export default MainHeader;