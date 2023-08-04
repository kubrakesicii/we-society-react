import { Form, redirect, useNavigate } from "react-router-dom";
import {RegisterUser} from '../services/Requests/Auth'
import { useState } from "react";


function Register(){
    const [form,setForm] = useState({
        email: "",
        userName: "",
        fullName: "",
        password: ""
    })

    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        var res = await RegisterUser(form)
        if(res.message == "OK"){
            navigate("/login")
        } else alert("hatalı kayıt")
    }

    return (
        <>
        <div className="container">
            <div className=''>
                <div className='registerForm'>
                <h2 className="authHeader">
                    <span>WeSociety</span>
                </h2>
                    <Form onSubmit={submitHandler}>
                        <input type="text" required name="fullName" placeholder="Tam Ad giriniz.." 
                        onChange={(e) => setForm({...form, fullName: e.target.value})}
                        value={form.fullName}
                        />
                        <input type="text" required name="email" placeholder="Mailinizi Girin.." 
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        value={form.email}/>
                        <input type="text" required name="userName" placeholder="Kullanıcı adı girin.." 
                        onChange={(e) => setForm({...form, userName: e.target.value})}
                        value={form.userName}/>
                        <input type="password" required name="password" placeholder="Şifrenizi girin.." 
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        value={form.password}/>

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