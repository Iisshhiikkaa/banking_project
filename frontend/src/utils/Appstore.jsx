import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice" 
import userSlice from "./userSlice" 


const Appstore=configureStore({
    reducer:{
        customerInfo: customerSlice,
        user:userSlice
    }
})

export default Appstore