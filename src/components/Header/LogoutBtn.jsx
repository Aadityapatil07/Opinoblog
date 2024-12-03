import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 text-[#1E3A5F] hover:text-[#66A5AD] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn