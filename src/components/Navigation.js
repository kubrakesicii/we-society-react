import 'bootstrap/dist/css/bootstrap.css';
import { GetToken, GetUser, RemoveUser } from "../utils/Token"
import { Link } from 'react-router-dom';
import Login from './Login';
import AuthContext from '../store/auth-context';
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