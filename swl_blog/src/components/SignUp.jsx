import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,  } from 'react'
import { UserAuth } from '../context/authContext'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // create a user with email and password
    // if successful, redirect to the login page
    // if not, display an error message
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await createUser(email, password)
      navigate('/account')
    } catch (error) {
      setError(error.message);
      console.log(error);
    }


  }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-3xl font-bold text-center'>Want to keep up with what SWL is doing?</h1>
        <p className='text-center text-gray-500'>
          Already have an account? <Link to='/Login' className='text-blue-500'>Login</Link>
        </p>

      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label htmlFor="email" className='block text-gray-500'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
        </div>
        <div className='mt-4'>
          <label htmlFor="email" className='block text-gray-500'>Email</label>
          <input onChange={(e) => setDisplayName(e.target.value)} type="display name" name='name' id='name' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
        </div>
        <div className='mt-4'>
          <label htmlFor="password" className='block text-gray-500'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' id='password' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
        </div>
        <div className='mt-4'>
          <label htmlFor="confirmPassword" className='block text-gray-500'>Confirm Password</label>
          <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name='confirmPassword' id='confirmPassword' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
        </div>
        <div className='mt-4'>
          <button type='submit' className='w-full bg-blue-500 text-white rounded-md py-2'>Sign Up</button>
        </div>
{/* create a log in with Google button */}
        <div className='mt-2'>
          <button type='button' className='w-full bg-red-500 text-white rounded-md py-2'>Sign up with Google</button>

        </div>
      </form>
    </div>
  )
}

export default SignUp
