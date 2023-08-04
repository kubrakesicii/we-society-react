import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated:false,
    activeUser:{id:0,userProfileId:0,fullName:''}
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        login(state,user){
            console.log("login action : ", user.payload);
            state.isAuthenticated=true;
            state.activeUser=user.payload;

            console.log("store user state: ", state.activeUser);
        },
        logout(state){
            state.isAuthenticated=false
        }
    }
})


export default authSlice.reducer;
export const authActions = authSlice.actions;