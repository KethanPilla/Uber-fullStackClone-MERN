import { set } from 'mongoose'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[userData, setUserData] = useState({})
  const submitHandler = (e)=>{
    e.preventDefault();
    setUserData({
      username:{
      firstName: firstName,
      lastName: lastName,
      },
      email: email,
      password: password
    })

    console.log(userData);
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 pb-7' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uber logo" />
      <form onSubmit={(e)=>{
        submitHandler(e)}
      }>
        <h3 className='text-base font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-4 mb-6'>
        <input required 
          className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
          type="text" placeholder='First name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
          <input required 
          className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
          type="text" placeholder='Last name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
        </div>
        <h3 className='text-base font-medium mb-2'>What's your email?</h3>
        <input required 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
          type="email" placeholder='email@example.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <h3 className='text-base font-medium mb-2'>Enter Password</h3>
        <input required 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[8px] leading-tight'>This site is protected by reCAPTCHA and the Google <span className='text-blue-600'>Privacy Policy</span> and <span className='text-blue-600'>Terms of Service</span> apply. By clicking "Sign Up", you agree to our <span className='text-blue-600'>Terms of Service</span> and <span className='text-blue-600'>Privacy Policy</span>.
        <br />
        </p>
      </div>
    </div>
  )
}

export default UserSignup