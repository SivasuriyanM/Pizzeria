// import React, {  useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../reduxStore/userSlice'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'

function Navbar() {
  let logStatus = useSelector((store)=>store.user.status)
  let user = useSelector((store)=>store.user.user)
  let dispatcher = useDispatch()
  const navigate = useNavigate();

  
  console.log(logStatus)
  // console.log(user)
  return (
    <div  className=' navbar  bg-dark border-bottom border-body pe-2' data-bs-theme="dark">
      <h3 className ="m-2  fs-1 fw-light" style={{color:"white"}}>Pizzeria</h3>
      <Link to='/'>
      <img src={logo} className='p-0 m-0' style={{width:"75px", height:"75px"}}  />
      </Link>
        <Link to='/' className ="p-2  fs-4 fw-light" style={{color:"white"}}>Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/orderpizza' className ="p-2  fs-4 fw-light" style={{color:"white"}}>Orderpizza</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/buildurs' style={{color:"white"}} className ="p-2  fs-4 fw-light btn btn-outline-dark p-2 fs-5" >Build Ur Pizza</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {user!==null?<Link to='/cart' className='btn btn-warning p-2 fs-5 '>Shopping Cart</Link>:""}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {user===null?<Link to='/login' className='btn btn-warning p-2 fs-5 pe-2'>Login</Link>:<button onClick={()=>{dispatcher(logout()),navigate('/')}}  className='btn btn-danger p-2 fs-5'>LogOut</button>}
    </div>
  )
}

export default Navbar