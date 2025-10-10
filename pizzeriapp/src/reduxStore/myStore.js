
import { configureStore } from "@reduxjs/toolkit";
import authslice from './authslice'
import userSlice from './userSlice'

export let mystore=configureStore({
    reducer:{
        auth:authslice,
        user:userSlice
    }
})