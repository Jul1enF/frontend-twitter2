import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const tweetsSlice= createSlice({
    name : 'tweets',
    initialState,
    reducers : {
        addTweets : (state, action)=>{
            state.value = action.payload
        },
    }
})

export const {addTweets} = tweetsSlice.actions ;
export default tweetsSlice.reducer;