import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from './index.js'
import authService from '../appwrite/auth.js'


function ProfileBtn({onClick, className}) {
    const navigate = useNavigate()
    let userId;
    async function viewProfile(){
        const userData = await authService.getCurrentUser()

        if(userData){
            userId = userData.$id
            navigate(`/profile/${userId}`)

            
        }
        else{
            return null
        }
    }
    

   
  return (

    <button
    className={`inline-bock px-6 py-2 text-[#4B3022] hover:text-[#f4d6a1b8] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${className}`}
    onClick={()=>{
      viewProfile()
      onClick()
    }}
    >Profile</button>
  )
}


export default ProfileBtn