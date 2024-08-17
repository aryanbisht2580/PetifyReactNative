import { createSlice } from "@reduxjs/toolkit"

initialState={
    user:{
        token:'',
        email:'',
        isDeleteChange:false,
        favs:[]
    }
    
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        deleteUser:(state,action)=>{
            state.user={}
        },
        setFavs:(state,action)=>{
            state.user.favs=(action.payload);
        },
        setIsDeleteChange:(state,action)=>{
            state.user.isDeleteChange=action.payload
        }
        
    }
})

export const userReducer=userSlice.reducer;
export const userActions=userSlice.actions;
export const userSelector=(state)=>state.user;