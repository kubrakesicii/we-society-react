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
            state.isAuthenticated=true;
            state.activeUser=user.payload;
            state.activeUser.image=user.image;
        },
        logout(state){
            state.isAuthenticated=false
        },
        edit(state,user){
            console.log("edit dispatched : ", user);
            state.isAuthenticated=true;
            state.activeUser=user.payload;
            state.activeUser.image=user.image;
        }
    }
})


export default authSlice.reducer;
export const authActions = authSlice.actions;