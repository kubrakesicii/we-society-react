import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const MainHeader = (props) => {

    return (
        <>
        <div className="top-scroll-bar"></div>
        <div className="sticky-header fixed d-lg-none d-md-block"></div>
            <header id="header" className="d-lg-block d-none">
                <Navigation/>
            </header>

            <MobileNavigation />


        {/* NAVIGATION MOBILE */}


        </>

    )
}

export default MainHeader;