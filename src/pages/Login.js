import {LoginUser} from '../services/Requests/Auth'
import { useNavigate,  } from "react-router-dom";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth.slice";
import Swal from 'sweetalert2'
import * as Yup from "yup";
import { b64toBlob } from '../helpers/fileHelper';


const Login = () => {
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    const [errors,setErrors] = useState([])
    const navigate = useNavigate();

    const loginValidationSchema = Yup.object({
        email: Yup.string().email("Please enter valid email").required("Please enter email"),
        password: Yup.string().min(6).max(15).required()
    })


    const submitHandler = async (event) => {
        event.preventDefault();

        try{
            await loginValidationSchema.validate(form,{abortEarly:false})
        } catch(errors){
            setErrors(errors.errors)
        }

        var res = await LoginUser(form)

        if(res.message === "OK"){
            const storeImg=URL.createObjectURL(await b64toBlob(res.data.image));

            dispatch(authActions.login({...res.data, image:storeImg}))
            navigate("/home")

            Swal.fire({
                title: 'Signed in successfully!',
                icon: 'success',
                showConfirmButton:false,
                toast:true,
                position:'bottom-end',
                timer:3000,
                timerProgressBar:true
              })
        } else if(res.message === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton:false,
                toast:true,
                position:'bottom-end',
                text: 'Email or Password is wrong! Try again!',
                timer:3000,
                timerProgressBar:true
              })
        }
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

                        {
                            errors.length > 0 ? (
                                errors.map(e => 
                                    <p className="text-danger">{e} !</p>
                                )
                            ) : (
                                <p></p>
                            )
                        }

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

