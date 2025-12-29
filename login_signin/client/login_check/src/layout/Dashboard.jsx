import React from 'react'
import { useEffect } from 'react';

const Dashboard = () => {

    async function handleDash(){
    const uri = "http://localhost:5001/user/dashboard"
    const res = await fetch (uri ,
        { method:"GET",
            credentials: "include"
        })

        if (res.status === 401) {
        const refresh = await fetch(
          "http://localhost:5001/user/new-token",
          {
            method: "GET",
            credentials: "include"
          }
        )
    }
        
        const data =await res.json();
        console.log(data)
    }
    useEffect(()=>{
        handleDash()
    },[])

  return (
    <div>
        Dashboard 
    </div>
  )
}

export default Dashboard
