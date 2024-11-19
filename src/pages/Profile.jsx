import React, { useContext } from 'react'
import { AuthContext } from '../Context/authContext'
import { Link, useNavigate } from 'react-router-dom'

export const Profile = () => {

    const {user, isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    if(!isLoggedIn){
        navigate('/login')
    }

  return (
    <div className=''>
        <div className=' lg:w-[72rem] rounded-md  flex flex-col font-serif  bg-light hover:shadow-sm pb-5'>
        
        <div className='  relative  min-w-full lg:min-h-[12rem] md:min-h-[8rem] shadow-sm rounded bg-bgprimary'>
            
            <div className=' absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 bg-bgprimary rounded-full'>
            <div className=' relative'>
                {user?.avatar ? 
              <img src={user?.avatar} alt={user?.username.charAt(0)}
                  className=' border-4 h-28 w-28 bg-primary object-cover flex items-center text-tertiary justify-center text-center text-5xl rounded-full' /> 
                  :
                  <div className=' border-4 h-28 w-28 bg-primary object-cover flex items-center text-tertiary justify-center text-center text-5xl rounded-full'>
                    {user?.username.charAt(0)}
                  </div>
                }                             
              </div>
            </div>
        </div>

        <Link to={'/profile/edit'} 
        className=' flex flex-col items-end'><span className=' bg-primary p-2 rounded text-light'>Edit Profile</span></Link>

        <div className=' space-y-5 mt-10 flex flex-col justify-center items-center'>
        
            <h2 className=' lg:text-4xl font-semibold md:text-3xl'>{user?.username}</h2>
            <p>
                {user?.bio ? 
                <span>{user?.bio}</span>
                :
                '404 bio not found'
                }
            </p>
            <div className=' flex gap-8'>
                <div className=' flex flex-col items-center'>
                    <span className=' text-gray-500'>Blogs</span>
                    <h1 className=' text-xl font-semibold'>{user?.blogCount}</h1>
                </div>
                <div className=' flex flex-col items-center'>
                    <span className=' text-gray-500'>occupation</span>
                    <h1 className=' text-xl font-semibold'>
                        {user?.occupation ?
                        <span>{user?.occupation}</span>
                        :
                        '--'
                    }
                    </h1>
                </div>
            </div>
        </div>

        
    
    </div>
    </div>

)
}
