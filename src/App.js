import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import { getToken, removeUser } from './utils/token';
import { Outlet } from 'react-router-dom';


function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const logoutHandler = () => {
      removeUser()
      setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    if(getToken() != null) setIsLoggedIn(true) 
  }, []) 

  return (
    <>
     <div className="top-scroll-bar"></div>
        <div id="wrapper">
          <MainHeader onLogout={logoutHandler}/>
          <Outlet/>
        </div>    
    </>
  );
}

export default App;
