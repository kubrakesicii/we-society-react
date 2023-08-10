import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const MainHeader = (props) => {

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
                    <h1 className="logo-small navbar-brand"><Link to='/home' className="logo">WeSociety</Link></h1>

                    <a className="author-avatar" href="#"><img src="assets/images/author-avatar-1.jpg" alt=""/></a>

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
                    <a className="searh-toggle">
                            <i className="icon-search"></i>
                    </a>
                    <input type="text" className="search_field" placeholder="Search..." value="" onChange={()=>{}} name="s" />
                </form>
            </div>
        </div> 

        </>

    )
}

export default MainHeader;