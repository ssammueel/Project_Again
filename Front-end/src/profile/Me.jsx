import React, { useEffect, useState } from 'react'

export const Me = () => {

  const [user, setUser] = useState({
    name:"",
    email:""
  })

  useEffect(()=>{
    const userData = JSON.parse
  },[])
  return (
    <div className='flex justify-center  p-20 text-xl text-violet-950'>
        <div className='flex flex-col'>
          <p>change passsword</p>
          <p>log out</p>
        </div>
    </div>
  )
}
