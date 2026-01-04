import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setSelectedUser } from "../redux/userSlice";



const Login = () => {
 let navigate = useNavigate()
     const [show , setShow] = useState(false)
        const [email , setEmail] = useState("")
        const [password , setPassword] = useState("")
        const [loading , setLoading] =useState(false)
        const [error , setError] = useState(" ")
  let { selectedUser } = useSelector((state) => state.user);


        let dispatch = useDispatch()
    // let {userData} = useSelector(state=>state.user)
    // console.log(userData)

    const handleLogin=async(e)=>{
        try {
            e.preventDefault()
            let result = await axios.post(`${serverUrl}/api/auth/login`,{
                email,password
            } , {
                withCredentials:true

            })
            // console.log(result)
            dispatch(setUserData(result.data))
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
        } catch (error) {
            console.log(`sign up error from frontend ${error}`)
            setLoading(false)
            setError(error?.response?.data?.message)
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className=' w-full  max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]  shadow-gray-400 shadow-lg flex items-center justify-center'>
                <h1 className='text-gray-600 font-bold text-[30px] '>Log in <span className='text-white'>ChatSphere</span></h1>

            </div>
            <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
            {/* <input type="text" placeholder='Enter username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[20px] bg-white rounded-lg shadow-gray-200 shadow-lg'/> */}
            <input type="email" placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} value={email} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[20px] bg-white rounded-lg shadow-gray-200 shadow-lg'/>
            <div className='relative w-[90%] h-[50px]  border-2 border-[#20c7ff] overflow-hidden rounded-lg  shadow-gray-200 shadow-lg'>
            <input type={`${show?"text":"password"}`} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} value={password}  className='w-[90%] h-[50px] outline-none px-[20px] py-[20px] bg-white '/>
            <span className='absolute top-[10px]] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer' onClick={()=>setShow(prev=>(!prev))}>{`${show?"hidden":"show"}`}</span>
            </div> 
            {
                error && <p className='text-red-500'>{error}</p>
            }
            <button disabled={loading} className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>{loading?"loading..":"Log in"}</button>
            <p className='cursor-pointer' onClick={()=>navigate("/signup")}>Create a new Account ? <span className='text-[#20c7ff] text-bold'>Sign up</span></p>
            <p className='cursor-pointer' onClick={()=>navigate("/forgot-password")}>Forget your password? <span className='text-[#20c7ff] text-bold'>Click here</span></p>

        </form>
        </div>
         
    </div>
  )
}

export default Login
