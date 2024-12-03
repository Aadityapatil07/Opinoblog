import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from './index.js'
import { useSelector } from 'react-redux'
import authService from '../appwrite/auth.js'


function ProfileBtn() {
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
    className='inline-bock px-6 py-2 text-[#1E3A5F] hover:text-[#66A5AD] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'
    onClick={viewProfile}
    >Profile</button>
  )
}


export default ProfileBtn