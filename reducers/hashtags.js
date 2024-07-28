import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const hashtagsSlice= createSlice({
    name : 'hashtags',
    initialState,
    reducers : {
        addHashtags : (state, action)=>{
            state.value = action.payload
        },
    }
})

export const {addHashtags} = hashtagsSlice.actions ;
export default hashtagsSlice.reducer;