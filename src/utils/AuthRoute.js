import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetToken } from "./Token";
import { useSelector } from "react-redux";


const AuthRoute = ({children}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = GetToken();
        if (!userToken || userToken === 'undefined' || userToken === null) {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn,checkUserToken]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? children : null
            }
        </React.Fragment>
    )

}

export default AuthRoute;