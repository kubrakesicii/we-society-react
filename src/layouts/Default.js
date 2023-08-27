import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import { Outlet, redirect } from 'react-router-dom'
import Loader from '../components/Loader'
import { b64toBlob } from '../helpers/fileHelper'
import { GetUser } from '../utils/Token'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth.slice'

export default function Default() {

    const [isAppLoaded,setIsAppLoaded] = useState(false)
    const loadUser = async () => {
        const curUser = GetUser()
        if(curUser == null) {
            redirect("/login")
        }
        else {
            const storeImg=URL.createObjectURL(await b64toBlob(curUser.image));
            dispatch(authActions.login({...curUser, image:storeImg}))
            redirect("/home")
        }
    }
    const dispatch = useDispatch(loadUser)

    useEffect(() => {
        console.log("refresh edildi");
        // await ile tokenla user bilgisi çek, token varsa içerde tekrar login yap
        //dispatch at
        //işlem bitince apploaded true
        loadUser()
        setTimeout(() => {
            setIsAppLoaded(true)
        }, 500);
    },[])


  return (
    <>
     <div className="top-scroll-bar"></div>
     {
        isAppLoaded ? (
            <div id="wrapper">
                <MainHeader/>
                <main id="content"> 
                    <Outlet/>
                    <Footer />
                </main>
            </div>  
        ) : (
                 <Loader />
            )
     }
          
    </>
  )
}
