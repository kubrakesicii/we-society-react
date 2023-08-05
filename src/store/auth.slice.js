import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated:false,
    activeUser:{id:0,userProfileId:0,fullName:'',image:new Uint8Array(1024)}
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        login(state,user){
            console.log("login action : ", user.payload);
            state.isAuthenticated=true;
            state.activeUser=user.payload;
            state.activeUser.image=user.image;

            console.log("store user state: ", state.activeUser);
        },
        logout(state){
            state.isAuthenticated=false
        }
    }
})


export default authSlice.reducer;
export const authActions = authSlice.actions;