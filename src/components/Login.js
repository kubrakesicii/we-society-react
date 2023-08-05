import {LoginUser} from '../services/Requests/Auth'
import { useNavigate,  } from "react-router-dom";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth.slice";

const Login = () => {
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        var res = await LoginUser(form)
        if(res.message === "OK"){
            console.log("Dispatch user data : ", res.data);
            dispatch(authActions.login(res.data))
            navigate("/home")
        } else alert("yanlış giriş")
    }
    const dispatch = useDispatch(submitHandler)

////////////////////////////    

    return(
        <>
            <div className="container"> 
                <div className="">
                <div className='loginForm'>
                <h2 className="authHeader">
                    <span>WeSociety</span>
                </h2>                    
                <form onSubmit={submitHandler}>
                        <input type="text" required name="email" placeholder="Mailinizi girin.." 
                            className='control'
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}/>
                        <input type="password" required name="password" placeholder="Sifrenizi girin.." 
                            className='control'
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}/>

                        <a href="#">Forgot password?</a>
                        <input type="submit" className='button' value="Login"/>
                    </form>
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
    return await LoginUser(formData)

    //const dispatch = useDispatch(dispatch({type:'LOGIN'}))
   // return redirect("/home")
}

