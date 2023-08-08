import {GetUser, RemoveUser } from "../utils/Token"
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

const Navigation = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const activeUser = useSelector(state => state.auth.activeUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchKey,setSearchKey] = useState("")

    // Store'da logout action tetikleniyor, burada da global auth verisi false yapılıyor
    const logoutHandler = () => {
        dispatch(authActions.logout())
        RemoveUser()
    }

    return(
        <> 
          <div className="container">
                <div className="align-items-center w-100">
                    <h1 className="logo float-left navbar-brand"><Link to="/home" className="logo">WeSociety</Link></h1>
                    <div className="header-right float-right w-50">
                        <div className="d-inline-flex float-right text-right align-items-center">
                            {
                                !isAuth && (
                                    <>
                                    <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                                        <li><Link to='/login' className="btn btn-success">Login</Link></li>
                                    </ul>
                                    <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                                        <li><Link to='/register' className="btn">Register</Link></li>
                                    </ul>
                                    </>
                                )
                            }
                            {
                                isAuth && (
                                    <>
                                    <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                                        <li><Link to='/new-article' className="btn">Write</Link></li>
                                    </ul>
                                    <ul className="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                                        <li className="menu-item-has-children"> 
                                        <a className="author-avatar" href="#">
                                            <img src={`${activeUser.image !== null ? `data:image/jpg;base64,${activeUser.image}` : '/assets/images/default.jpg'}`} /></a>      
                                            <ul className="sub-menu">
                                                <li onClick={() => {
                                                    console.log("user prof id : ",activeUser.userProfileId);
                                                    navigate(`/user-profile/${activeUser.userProfileId}`)
                                                    }}>
                                                      <a href="#">Profile</a></li>
                                                <li><Link to="/login" onClick={logoutHandler}>Logout</Link></li>
                                            </ul>
                                        </li>
                                    </ul>  
                                    </>                                 
                                )
                            }
                                     
                                
                        </div>
                        <form action="#" method="get" className="search-form d-lg-flex float-right">
                            {/* <a href="#" className="searh-toggle"> */}
                            <a className="searh-toggle"><i className="icon-search"></i></a>
                            <input type="text" className="search_field" placeholder="Search..." 
                            onChange={(e) => {setSearchKey(e.target.value)}} value="" name="s" />
                        </form>
                    </div>

                </div>
                <div className="clearfix"></div>
            </div>
        </>
    )
}


export default Navigation;