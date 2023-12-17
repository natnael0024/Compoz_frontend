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
    <div className=' lg:px-44'>
        <div className=' flex flex-col font-serif border bg-light pb-5'>
        
        <div className='  relative  w-full lg:min-h-[12rem] md:min-h-[8rem] shadow-sm rounded bg-bgprimary'>
            
            <div className=' absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 bg-bgprimary rounded-full'>
            <div className=' relative'>
              <img src={user?.avatar} alt={user?.username.charAt(0)}
                  className=' border-4 flex items-center justify-center text-center text-6xl rounded-full' />                                
              </div>
            </div>
        </div>

        <Link to={'/profile/edit'} 
        className=' flex flex-col items-end'><span className=' bg-primary p-2 rounded text-light'>Edit Profile</span></Link>

        <div className=' space-y-5 mt-10 flex flex-col justify-center items-center'>
        
            <h2 className=' lg:text-4xl md:text-3xl'>{user?.username}</h2>
            <div className=' flex  gap-4'>
                <div className=' flex flex-col items-center'>
                    <h1>22</h1>
                    <span>Blogs</span>
                </div>
                <div className=' flex flex-col items-center'>
                    <h1>20</h1>
                    <span>Followers</span>
                </div>
                <div className=' flex flex-col items-center'>
                    <h1>30</h1>
                    <span>Comments</span>
                </div>
            </div>
        </div>

        <div className='space-y-5 mt-5 flex flex-col justify-center items-center'>
            <div>
                <h1>Fullstack developer</h1>
            </div>
            <div>
                <p className=' text-center lg:px-28'>
                    {user.bio}
                </p>
            </div>
        </div>
        
    
    </div>
    </div>

)
}
