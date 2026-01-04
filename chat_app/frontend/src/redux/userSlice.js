import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUserData:null,
        selectedUser:null,
        socket:null,
        onlineUsers:null,
        searchData:null
    },
    reducers:{
        setUserData:(state , action)=>{
            state.userData=action.payload
        },
        setOtherUserData:(state , action)=>{
            state.otherUserData=action.payload
        },
        setSelectedUser:(state , action)=>{
            state.selectedUser=action.payload
        },
        setSocket:(state , action)=>{
            state.socket=action.payload
        },
        setOnlineUsers:(state , action)=>{
            state.onlineUsers=action.payload
        },
        setSearchData:(state , action)=>{
            state.searchData=action.payload
        }
    }
})

export const {setUserData,setOtherUserData , setSelectedUser , setSocket,setOnlineUsers,setSearchData} =userSlice.actions
export default userSlice.reducer