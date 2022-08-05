import React, { useContext } from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function AdminRoute() {
  let {user} = useContext(AuthContext)

  return (
    user.role === 'admin' ? <Outlet /> : <Navigate to='/' />
  )
}

export default AdminRoute