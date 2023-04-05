import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,  } from 'react'
import { UserAuth } from '../context/authContext'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const { login } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password)
      navigate('/account')
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

  }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <div>
      <h1 className='text-2xl font-bold text-center'>Read the latest Blog from Sandwiches with Love!</h1>
      <p className='text-center text-gray-500'>
          Don't have an account yet? <Link to='/SignUp' className='text-blue-500'>Sign Up</Link>
        </p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className='mt-4'>
        <label htmlFor="email" className='block text-gray-500'>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
      </div>
      <div className='mt-4'>
        <label htmlFor="password" className='block text-gray-500'>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' id='password' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' />
      </div>
      <div className='mt-4'>
        <button type='submit' className='w-full bg-blue-500 text-white rounded-md py-2'>Sign In</button>
      </div>
{/* create a log in with Google button */}
<div className='mt-2'>
          <button type='button' className='w-full bg-red-500 text-white rounded-md py-2'>Sign in with Google</button>

        </div>
    </form>
  </div>
  )
}

export default Login
