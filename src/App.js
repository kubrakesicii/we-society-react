import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import MainHeader from './components/MainHeader';
import AuthContext from './store/auth-context';
import { GetToken, RemoveUser } from './utils/Token';
import Home from './components/Home';
import { Outlet } from 'react-router-dom';


function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const logoutHandler = () => {
      RemoveUser()
      setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    if(GetToken() != null) setIsLoggedIn(true) 
  }, []) 

  return (
    <>
    <h1>{console.log("ISLOG APPJS : ",isLoggedIn)}</h1>
      <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn
      }}>
        <MainHeader onLogout={logoutHandler}/>
          <main>
            {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn && <Home onLogout={logoutHandler} />} */}

             {/* <Home onLogout={logoutHandler} /> */}

             <Outlet/>
          </main>
      </AuthContext.Provider>  
    </>
  );
}

export default App;
