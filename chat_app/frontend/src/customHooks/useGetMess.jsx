import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice.js"

const useGetMess=()=>{
    let dispatch=useDispatch()
    let {userData  , selectedUser} = useSelector(state=>state.user)
    useEffect(()=>{
          // ✅ Guard: jab tak selectedUser na ho, API call mat karo
    if (!selectedUser?._id) return;
        const fetchMessage =async()=>{
            try {
                let result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{
                    withCredentials:true
                })
                dispatch(setMessages(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchMessage()
    },[selectedUser,userData])
}

export default useGetMess