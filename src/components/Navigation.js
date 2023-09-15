import { removeUser } from "../utils/token";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navigation = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const activeUser = useSelector((state) => state.auth.activeUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageSrc,setImageSrc] = useState('')

  const [searchKey, setSearchKey] = useState("");

  // Store'da logout action tetikleniyor, burada da global auth verisi false yapılıyor
  const logoutHandler = () => {
    dispatch(authActions.logout());
    removeUser();
  };

  useEffect(() => {
    if(activeUser.image == null) setImageSrc("/assets/images/default.jpg")
    else {
      setImageSrc(activeUser.image)
    }
  }, [activeUser])

  return (
    <>
      <div className="container">
        <div className="align-items-center w-100">
          <h1 className="logo float-left navbar-brand">
            <Link to="/home" className="logo">
              WeSociety
            </Link>
          </h1>
          <div className="header-right float-right w-50">
            <div className="d-inline-flex float-right text-right align-items-center">
              {!isAuth && (
                <>
                  <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                    <li>
                      <Link to="/login" className="btn btn-success">
                        Login
                      </Link>
                    </li>
                  </ul>
                  <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                    <li>
                      <Link to="/register" className="btn">
                        Register
                      </Link>
                    </li>
                  </ul>
                </>
              )}
              {isAuth && (
                <>
                  <ul className="top-menu heading navbar-nav d-lg-flex align-items-center">
                    <li>
                        <Link to="/new-article?action=insert" className="">
                           <span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-label="Write"
                                >
                                <path
                                    d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                                    stroke="currentColor"
                                ></path>
                                </svg>
                           </span>
                           {/* <span>Write</span> */}
                        </Link>
                    </li>
                  </ul>
                  <ul className="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                    <li className="menu-item-has-children">
                      <a className="author-avatar" href="#">
                        {/* <img src={`${activeUser.image !== '' ? `data:image/jpg;base64,${activeUser.image}` : '/assets/images/default.jpg'}`} /></a>       */}
                        <img src={imageSrc} />
                      </a>
                      <ul className="sub-menu">
                        <li
                          onClick={() => {
                            console.log(
                              "user prof id : ",
                              activeUser.userProfileId
                            );
                            navigate(
                              `/user-profile/${activeUser.userProfileId}/tabs`
                            );
                          }}
                        >
                          <a href="#">Profile</a>
                        </li>
                        <li>
                          <Link to="/login" onClick={logoutHandler}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <form
              action="#"
              method="get"
              className="search-form d-lg-flex float-right"
            >
              {/* <a href="#" className="searh-toggle"> */}
              <a className="searh-toggle" onClick={() => {
                   navigate(`/search?key=${searchKey}`)
                   setSearchKey("")
                }               
              }>
                <i className="icon-search"></i>
              </a>
              <input
                type="text"
                className="search_field"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                value={searchKey}
                name="s"
              />
            </form>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
};

export default Navigation;
