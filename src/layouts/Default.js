import React, { useEffect, useState } from 'react'
import MainHeader from '../components/MainHeader'
import { Outlet } from 'react-router-dom'

export default function Default() {
    const [isAppLoaded,setIsAppLoaded] = useState(false)
    useEffect(() => {
        console.log("refresh edildi");
        // await ile tokenla user bilgisi çek, token varsa içerde tekrar login yap
        //dispatch at
        //işlem bitince apploaded true
        setTimeout(() => {
            setIsAppLoaded(true)
        }, 2000);
    },[])


  return (
    <>
     <div className="top-scroll-bar"></div>
     {
        isAppLoaded ? (
            <div id="wrapper">
            <MainHeader/>
            <Outlet/>
            </div>  
        ) : (
            <div>Loading</div>
        )
     }
          
    </>
  )
}
