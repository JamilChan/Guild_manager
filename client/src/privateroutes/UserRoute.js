import React, { useContext } from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function UserRoute() {
  let {user} = useContext(AuthContext)

  return (
    user.role === 'user' ? <Outlet /> : <Navigate to='/' />
  )
}

export default UserRoute