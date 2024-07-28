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
        deleteTweet : (state, action)=>{
            state.value=state.value.filter(e=>e._id !== action.payload)
        },
        addLiker : (state, action)=>{
            state.value=state.value.map(e=>{
                if (e._id== action.payload.id){
                    e.likedBy.push(action.payload.userId)
                    return e
                } else {return e}
            })
        },
        removeLiker : (state, action)=>{
            state.value=state.value.map(e=>{
                if (e._id== action.payload.id){
                    e.likedBy=e.likedBy.filter(f=>f!==action.payload.userId)
                    return e
                } else {return e}
            })
        },
        addTweet : (state, action)=>{
            state.value.unshift(action.payload)
        }
    }
})

export const {addTweets, deleteTweet, addLiker, removeLiker, addTweet} = tweetsSlice.actions ;
export default tweetsSlice.reducer;