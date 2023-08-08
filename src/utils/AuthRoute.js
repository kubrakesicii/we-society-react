import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { GetToken } from "./Token";
import { useSelector } from "react-redux";


const AuthRoute = ({children}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const activeUser = useSelector(state => state.auth.activeUser)

    const checkUserToken = () => {
        // if(activeUser.id === 0){            
        //     setIsLoggedIn(false);
        //     return navigate('/login');
        // }

        const userToken = GetToken();
        if (!userToken || userToken === 'undefined' || userToken === null) {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? children : null
            }
        </React.Fragment>
    )

}

export default AuthRoute;