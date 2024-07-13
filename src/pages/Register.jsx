import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../Context/authContext'

export const Register = () => {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        try{
           await axios.post('/auth/register',data)
            .then(res => {
                console.log(res)
                navigate('/login')
                toast('Registration Success!', {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
            })
            .catch(error=>{
                console.log(error.response.data.message)
                toast(error.response.data.message, {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
            })
        }catch(error){
            console.log(error)
        }
    }

  return (
    
<div className="flex min-h-full flex-col justify-center font-serif  px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <div>
  <h1 className=' font-sans font-bold flex flex-col items-center mx-auto justify-center text-3xl max-w-fit  text-primary border-2 border-primary rounded'>
    COMPOZ
  </h1>
  </div>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
  </div>
    
  <div className="mt-10 space-y-3 sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit()}> */}
    <div>
        <label for="" class="block  font-medium leading-6 text-gray-900">Username</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder='Abebe' required 
          class="block w-full  rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary outline-none  sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="" className="block  font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email@example.com' required 
          className="block w-full  rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary outline-none  sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="" className="block font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder='password' required 
          className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary outline-none sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="button" onClick={()=>handleSubmit()} className="flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold leading-6 shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Sign up</button>
      </div>
    {/* </form> */}

    <p className="mt-10 text-center text-gray-500">
      Already have an account?
      <Link to={'/login'}
      className=' font-semibold'> Login</Link>
    </p>
  </div>
</div>
        

  )
}
