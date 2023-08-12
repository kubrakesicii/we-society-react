import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Default() {
    const [isAppLoaded,setIsAppLoaded] = useState(false)
    useEffect(() => {
        console.log("refresh edildi");
        // await ile tokenla user bilgisi çek, token varsa içerde tekrar login yap
        //dispatch at
        //işlem bitince apploaded true
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
