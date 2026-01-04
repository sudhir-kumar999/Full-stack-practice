import React from 'react'

const Shimmer = () => {
    const arr = new Array(3).fill("")
  return (
    <div className='flex h-[100vh] justify-center items-center'>
        {
            arr.map((ele)=>(
                <div className='flex h-[250px] w-[250px] bg-gray-200 border'>
                    
                </div>
            ))
        }
      
    </div>
  )
}

export default Shimmer
