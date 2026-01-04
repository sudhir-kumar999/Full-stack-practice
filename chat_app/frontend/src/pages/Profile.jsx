import React from 'react'
import dp from "../assets/image.png"
import { IoCamera } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

const Profile = () => {
    let {userData} = useSelector(state=>state.user)
    let navigate=useNavigate()
    let [name  ,setName] = useState(userData.name || "")
    let [frontImage , setFrontimage] = useState(userData.image || dp)
    let [backImage , setBackimage] = useState(null)
    const[saving,setSaving] = useState(false)
    let dispatch = useDispatch()
    let image=useRef()

    const handleImage=(e)=>{
        let file=e.target.files[0]
        setBackimage(file)
        setFrontimage(URL.createObjectURL(file))
    }
    const handleProfile =async(e)=>{
        e.preventDefault()
        setSaving(true)
        try {
            let formData=new FormData()
            formData.append("name",name)
            if(backImage){
                formData.append("image", backImage)
            }

            let result = await axios.put(`${serverUrl}/api/user/profile`, formData,{
                withCredentials:true
            })
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            setSaving(false)
            console.log("error at profile page",error)
        }
    }

  return (
    <div className='w-full h-[100vh] pt-4 bg-slate-200 flex flex-col justify-center items-center gap-[20px]' >
        <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={()=>navigate("/")} >
            <IoMdArrowRoundBack className='w-[30px] h-[30px]'/>
        </div>
        <div className=' relative border-4  overflow-hidden bg-white rounded-full border-[#20c7ff] shadow-gray-400 shadow-lg'>
        <div className='w-[180px] h-[180px] flex justify-center items-center' onClick={()=>image.current.click()} >
    <img src={frontImage} alt="" className='rounded-full h-[100%] '/>
        </div>
        <div className='absolute bottom-4 right-5 flex justify-center bg-[#20c7ff] rounded-full p-1 items-center'>
    <IoCamera className='text-2xl'/>
        </div>
    </div>
    <form onSubmit={handleProfile} className='w-[95%]  max-w-[500px] flex flex-col items-center justify-center gap-[20px]'>
        <input type="file" hidden accept='image/*' ref={image} onChange={handleImage}/>
        <input type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[20px] bg-white rounded-lg shadow-gray-200 shadow-lg'/>
        <input type="text" value={userData.userName} readOnly className='w-[90%] h-[50px] text-gray-400 outline-none border-2 border-[#20c7ff] px-[20px] py-[20px] bg-white rounded-lg shadow-gray-200 shadow-lg' />
        <input type="email" value={userData.email} readOnly className='w-[90%] h-[50px] text-gray-400 outline-none border-2 border-[#20c7ff] px-[20px] py-[20px] bg-white rounded-lg shadow-gray-200 shadow-lg'/>
        <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={saving}>{saving?"Saving":"Save Profile"}</button>

    </form>
    </div>
  )
}

export default Profile
