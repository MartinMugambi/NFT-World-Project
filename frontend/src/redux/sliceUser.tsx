import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


interface User{
    user: []
}


const initialState: User = {
    user: [],
}



export const fetchUser = createAsyncThunk("/api/user",async () => {
    
    const response = await fetch("http://localhost:8000/api/user", {
        credentials: "include"
    })

    const responseData = await response.json();

    return responseData;
})

export const  userSlice = createSlice({
    name: "nft",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{
      builder.addCase(fetchUser.pending, (state, {payload})=>{
        state.user= [];
      })

      builder.addCase(fetchUser.fulfilled, (state, {payload})=>{
        state.user = payload;
      })

      builder.addCase(fetchUser.rejected, (state, {payload})=>{
        state.user = []
      })
    }
})