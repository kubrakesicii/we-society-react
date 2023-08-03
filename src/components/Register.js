import { Form, redirect } from "react-router-dom";
import {RegisterUser} from '../services/Requests/Auth'


function Register(){
    return (
        <>
        <div className="container">
            <div className=''>
                <div className='registerForm'>
                <h2 className="authHeader">
                    <span>WeSociety</span>
                </h2>
                    <Form method="post">
                        <input type="text" required name="fullname" placeholder="Tam Ad giriniz.." />
                        <input type="text" required name="email" placeholder="Mailinizi Girin.." />
                        <input type="text" required name="username" placeholder="Kullanıcı adı girin.." />
                        <input type="password" required name="password" placeholder="Şifrenizi girin.." />


                        <input type="submit" className='button' value="Register" />
                    </Form>
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