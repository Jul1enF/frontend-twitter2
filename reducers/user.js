import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {}
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logUser : (state, action)=>{
            state.value = action.payload
        },
        logOut : (state, action)=>{
            state.value = {}
        },
    }
})

export const {logUser, logOut} = userSlice.actions;
export default userSlice.reducer;