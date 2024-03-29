import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated:false,
    activeUser:{id:0,userProfileId:0,fullName:'',image:''}
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        login(state,user){
            state.isAuthenticated=true;
            state.activeUser = user.payload
        },
        logout(state){
            state.isAuthenticated=false
        },
        edit(state,user){
            state.isAuthenticated=true;
            state.activeUser=user.payload;
        }
    }
})


export default authSlice.reducer;
export const authActions = authSlice.actions;