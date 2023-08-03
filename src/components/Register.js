import { Form, redirect } from "react-router-dom";
import classes from "../styles/Register.module.css"
import {RegisterUser} from '../services/Requests/Auth'


function Register(){
    return (
        <>
        <div className={classes.registerContainer}>
                <div className={classes.registerForm}>
                <header>Kendi Makalelerini Paylaşabilmek için Kayıt Ol</header>
                    <Form method="post">
                        <input type="text" required name="fullname" placeholder="Tam Ad giriniz.." />
                        <input type="text" required name="email" placeholder="Mailinizi Girin.." />
                        <input type="text" required name="username" placeholder="Kullanıcı adı girin.." />
                        <input type="password" required name="password" placeholder="Şifrenizi girin.." />


                        <input type="submit" className={classes.button} value="Kayıt Ol" />
                    </Form>
                    <div className={classes.signup}>
                    <span className={classes.signup}>Already have an account?
                    <label htmlFor="check">Login</label>
                    </span>
                </div>
                </div>
            </div>
        </>
    )
}


export default Register;

export async function register({request}){
    console.log("Register act start");

    const formData = await request.formData();

    console.log("FormData : ",formData);

    var res = await RegisterUser(formData)

    console.log("Register act end");
    console.log("RES : ",res);

    return redirect("/")
}