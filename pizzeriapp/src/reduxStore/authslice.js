import { createSlice } from "@reduxjs/toolkit";



let authslice=createSlice({
    name:"auth",
    initialState:{
        value:'Sign In'
    },
    reducers:{
        choice:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const{choice}=authslice.actions
export default authslice.reducer
