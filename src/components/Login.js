import classes from "../styles/Login.module.css"
import {LoginUser} from '../services/Requests/Auth'
import { Form, redirect } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { GetToken, RemoveUser } from "../utils/Token";


import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth.slice";

//automatically set up a subscription to React store

const emailReducer = (state, action) => {
    console.log("Email reducer");
    if(action.type == 'USER_INPUT') {
        return {value:action.val,isValid:action.val.includes('@')}
    }
    if(action.type=='INPUT_BLUR'){
        return {value:state.value,isValid:state.value.includes('@')}
    }
    return {value:'',isValid:false}
}

const passwordReducer = (state, action) => {
    if(action.type == 'USER_INPUT') {
        return {value:action.val,isValid:action.val.trim().length > 6}
    }
    if(action.type=='INPUT_BLUR'){
        return {value:state.value,isValid:state.value.trim().length > 6}
    }
    return {value:'',isValid:false}
}

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)

    const [emailState, dispathEmail] = useReducer(emailReducer, {value:'',isValid:false})
    const [passwordState, dispathPassword] = useReducer(passwordReducer, {value:'',isValid:false})

    //const { someProperty } = someObject; 
    const{isValid:emailIsValid} = emailState;
    const {isValid:passwordIsValid} = passwordState;

    useEffect(() => {
        setFormIsValid(emailIsValid && passwordIsValid)
    }, [emailIsValid,passwordIsValid])

    const emailChangeHandler = (event) => {
        dispathEmail({type:'USER_INPUT', val:event.target.value})
    }

    const passwordChangeHandler = (event) => {
        dispathPassword({type:'USER_INPUT', val:event.target.value})
    }

    const validateEmailHandler = () => {
        dispathEmail({type:'INPUT_BLUR'})
    }

    const validatePasswordHandler = () => {
        dispathPassword({type:'INPUT_BLUR'})
    }

    ///////////////////////
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const isAuth = useSelector(state => state.auth.isAuthenticated)

    const logoutHandler = () => {
        dispatch(authActions.logout )
        RemoveUser()
        setIsLoggedIn(false)
    }
      
    const loginHandler = () => {
        // setTimeout(() => {
        //     if(GetToken() != null) setIsLoggedIn(true)
        // },500);
        dispatch(authActions.login )
        if(GetToken() != null) setIsLoggedIn(true)
    }
  
    const dispatch = useDispatch(loginHandler)

    useEffect(() => {
        const setIsLoggedInHandler = () => {
            if(GetToken() != null) setIsLoggedIn(true)       
        }
  
        return () => {
            console.log("effect cleanup");
        }
    }, [])

////////////////////////////    

    return(
        <>
            <div className={classes.loginContainer}>
                <div className={classes.loginForm}>
                    <header>WeSociety</header>
                    <Form method="post" action="/login">
                        <input type="text" required name="email" placeholder="Mailinizi girin.." 
                            className={` ${classes.control} ${emailState.isValid === false ? classes.invalid : ''} `}
                            value={emailState.value}
                            onChange={emailChangeHandler} 
                            onBlur={validateEmailHandler}/>
                        <input type="password" required name="password" placeholder="Sifrenizi girin.." 
                            className={` ${classes.control} ${passwordState.isValid === false ? classes.invalid : ''} `}
                            value={passwordState.value}
                            onChange={passwordChangeHandler} 
                            onBlur={validatePasswordHandler}/>

                        <a href="#">Forgot password?</a>
                        <input type="submit" className={classes.button} value="Giriş Yap"/>
                    </Form>
                    <div className={classes.signup}>
                        <span className={classes.signup}>Don't have an account?
                        <label htmlFor="check">Signup</label>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

export async function login({request}){
    console.log("Login action start");
    const formData = await request.formData();
    var res = await LoginUser(formData)

    //const dispatch = useDispatch(dispatch({type:'LOGIN'}))
    return redirect("/home")
}

