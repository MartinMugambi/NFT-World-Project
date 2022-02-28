import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { API } from "../types"


interface Post{
    loading: boolean,
    data: any,
    error: string | boolean
}


const initialState: Post= {
 loading: true,
 data: {},
 error: false,
}


 export const fetchPost = createAsyncThunk("api/posts",async () => {
     
     const response = await fetch(API.fetchAllPost, {
         method: "GET",
         credentials: "include"
     })

     const responseData = await response.json()
     
     return responseData
 }) 


export const postSlice = createSlice({
    name: "nft",
    initialState,

    reducers: {

    },

    extraReducers: (builder) =>{
      builder.addCase(fetchPost.pending, (state, {payload})=>{
        state.loading= true;
        state.error = false;
      })
      builder.addCase(fetchPost.fulfilled, (state, {payload})=>{
        state.loading = false;
        state.data = payload;
        state.error = false;
      })

      builder.addCase(fetchPost.rejected, (state, {payload})=>{
       state.loading = false;
       state.error = true;
      })
    }
})



