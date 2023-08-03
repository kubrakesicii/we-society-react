import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";

function RootLayout(){
    return <>
        <MainHeader/> 
        {/* Rendered in the place where the actual nested route content in rendered */}
        <Outlet/>
    </>
}

export default RootLayout;