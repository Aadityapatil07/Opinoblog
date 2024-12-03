import React from 'react'
import logo from "../assets/logo.png"

function Logo({width = '550px'}) {
  return (
           <div className='flex justify-center text-center'>
            <img src={logo} alt="" width={width}/>
            <h1 className=''>Opino</h1>
           </div>
  )
}

export default Logo