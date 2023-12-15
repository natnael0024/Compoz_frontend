import axios from 'axios'
import React, {  useState, useContext } from 'react'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../Context/authContext'

export const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate()

  const {setUser, login, isLoggedIn} = useContext(AuthContext)


  const handleSubmit = async (e) => {
      const data = {
          email: email,
          password: password
      }
      try{ 
        await login(data)
       
      }catch(error){
          console.log(error)
      }
  }

  if(isLoggedIn){
    navigate('/')
  }


  return (
    
<div class="flex min-h-full flex-col justify-center font-serif  px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
  <div>
  <h1 className=' font-sans font-bold flex flex-col items-center mx-auto justify-center text-3xl max-w-fit  text-primary border-2 border-primary rounded'>
    COMPOZ
  </h1>
  </div>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block  font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} autocomplete="email" required 
          class="block w-full  rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary outline-none  sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} autocomplete="current-password" required 
          class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary outline-none sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="button" onClick={handleSubmit} class="flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-gray-500">
      Not a member?
      <Link to={'/register'}
      className=' font-semibold'> SignUp</Link>
    </p>
  </div>
</div>
        
  )
}
