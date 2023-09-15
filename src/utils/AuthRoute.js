import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./token";

const AuthRoute = ({children}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = getToken();
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