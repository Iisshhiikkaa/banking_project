
import { createSlice } from "@reduxjs/toolkit";

// customerSlice.js
const customerSlice = createSlice({
  name: "customerInfo",
  initialState: {
    customers: []
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    }
  }
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
