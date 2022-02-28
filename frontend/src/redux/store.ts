import {configureStore} from "@reduxjs/toolkit";
import { postSlice} from "./slicePost";
import { userSlice } from "./sliceUser";


export const store = configureStore({
    reducer:{
        post: postSlice.reducer,
        user: userSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch;


