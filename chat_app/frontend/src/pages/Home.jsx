import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import useGetMess from '../customHooks/useGetMess.jsx'

const Home = () => {
   useGetMess()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home
