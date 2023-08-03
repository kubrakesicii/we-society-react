import {GetUser, RemoveUser } from "../utils/Token"
import { Link } from 'react-router-dom';
import { authActions } from '../store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    // Store'da logout action tetikleniyor, burada da global auth verisi false yapılıyor
    const logoutHandler = () => {
        dispatch(authActions.logout())
        RemoveUser()
    }

    return(
        <> 
          <div className="container">
                <div className="align-items-center w-100">
                    <h1 className="logo float-left navbar-brand"><Link to="/home" className="logo">Merinda</Link></h1>
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
                                        <li><a href="#" className="btn">Write</a></li>
                                    </ul>
                                    <ul className="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                                        <li className="menu-item-has-children"> <a className="author-avatar" href="#"><img src="assets/images/author-avata-1.jpg" alt="" /></a>      
                                            <ul className="sub-menu">
                                                <li><Link to="/user-profile">Profile</Link></li>
                                                <li><Link to="/login" onClick={logoutHandler}>Logout</Link></li>
                                            </ul>
                                        </li>
                                    </ul>  
                                    </>                                 
                                )
                            }
                                     
                                
                        </div>
                        <form action="#" method="get" class="search-form d-lg-flex float-right">
                            <a href="javascript:void(0)" class="searh-toggle">
                                    <i class="icon-search"></i>
                            </a>
                            <input type="text" class="search_field" placeholder="Search..." value="" name="s" />
                        </form>
                    </div>

                </div>
                <div className="clearfix"></div>
            </div>

            {
            !isAuth && (
                <>
                    <Link to="/login"
                className="btn btn-outline-light me-4">
                <small>Giriş Yap</small>
                    </Link>
                    <Link to="/register"
                    className="btn btn-outline-light">
                    <small>Kayıt Ol</small>
                </Link>
                </>
            )
            }
            { isAuth &&(
                <>
                    <a className="btn btn-outline-light me-4" href="index.html" aria-label="Homepage">
                    {GetUser()} Kübra
                    </a>
                    <Link to="/login"
                    onClick={logoutHandler}
                    className="btn btn-outline-light me-4">
                    <small>Çıkış</small>
                    </Link>
                </>
            )   
            }
        </>
    )
}


export default Navigation;