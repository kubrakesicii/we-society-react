import { createSlice } from '@reduxjs/toolkit';
import { b64toBlob } from '../helpers/fileHelper';

const initialState = {
    isAuthenticated:false,
    activeUser:{id:0,userProfileId:0,fullName:'',image:''}
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        login(state,user){
            console.log("user : ",user);
            console.log("user login action : ");
            state.isAuthenticated=true;
            state.activeUser = user.payload
        },
        logout(state){
            state.isAuthenticated=false
        },
        edit(state,user){
            console.log("edit dispatched : ", user);
            state.isAuthenticated=true;
            state.activeUser=user.payload;
        }
    }
})


export default authSlice.reducer;
export const authActions = authSlice.actions;