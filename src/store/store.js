import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth.slice'


const store = configureStore({
    reducer: {auth:authReducer}
})

//connect react appp to components listen store and dispatch action. WE HAVE ONLY 1 STORE TO PROVIDE
export default store;
