import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Navigation from "./Navigation";
import { GetUser } from "../utils/Token";
import 'bootstrap/dist/css/bootstrap.css';
import { GetAllCategories } from "../services/Requests/Category";
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";

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
       
        // <nav id="navScroll" className="navbar navbar-dark bg-black fixed-top px-vw-5" tabIndex="0">
        //         <div className="container">
        //         <a className="navbar-brand pe-md-4 fs-4 col-12 col-md-auto text-center" href="index.html">
        //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-stack"
        //             viewBox="0 0 16 16">
        //             <path
        //                 d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
        //             <path
        //                 d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
        //             </svg>
        //             <span className="ms-md-1 mt-1 fw-bolder me-md-5">Klar</span>
        //         </a>

        //         {/* <ul class="navbar-nav mx-auto mb-2 mb-lg-0 list-group list-group-horizontal">
        //             <li class="nav-item">
        //             <a class="nav-link fs-5" href="index.html" aria-label="Homepage">
        //                 Home
        //             </a>
        //             </li>               
        //         </ul> */}

        //         <Navigation onLogout={props.onLogout}/>
                    
        //     </div>
        // </nav>

        <>
        <div class="top-scroll-bar"></div>
        <div class="sticky-header fixed d-lg-none d-md-block"></div>
            <header id="header" class="d-lg-block d-none">
                <div class="container">
                    <div class="align-items-center w-100">
                        <h1 class="logo float-left navbar-brand"><a href="index.html" class="logo">Merinda</a></h1>
                        <div class="header-right float-right w-50">
                            <div class="d-inline-flex float-right text-right align-items-center">
                                <ul class="social-network heading navbar-nav d-lg-flex align-items-center">
                                    <li><a href="#"><i class="icon-facebook"></i></a></li>
                                    <li><a href="#"><i class="icon-instagram"></i></a></li>
                                </ul>
                                <ul class="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                                    <li><a href="#" class="btn">Contact</a></li>
                                </ul>
                                <a class="author-avatar" href="#"><img src="assets/images/author-avata-1.jpg" alt="" /></a>
                            </div>
                            <form action="#" method="get" class="search-form d-lg-flex float-right">
                            <input type="text" class="search_field" placeholder="Search..." value="" name="s" />

                            </form>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <CategoryList categories={categoryList} />
            </header>

{/* ----------------- */}

        </>
    )
}

export default MainHeader;