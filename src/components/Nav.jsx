import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

export const Nav = () => {
  const [showMenu, setShowMenu] = useState(false)
  
  const {isLoggedIn, user, logout} = useContext(AuthContext)
  return (
    <nav className=' flex justify-between items-center py-2 lg:px-40 md:px-6 px-2'>
      <div className=' flex space-x-10'>
      <Link to={'/'}>
        <h1
        className=' text-xl font-bold text bg-primary text-light rounded py-2 px-1'><span>COMPOZ</span></h1>
      </Link>
      <div className='  flex items-center rounded relative'>
          <input type="text" placeholder='search blogs' name="" id=""
          className=' px-2 py-2 rounded lg:min-w-[20rem] ' />
          <button className='absolute right-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>

      <div className=' flex items-center space-x-10'>
        
        <div>
          {
        isLoggedIn?
        (
          <div className=' border-primary space-x-10 text-primary rounded-full flex items-center'>
          <Link to={'/blogs/create'}
          className=' bg-bgprimary py-2 px-4 rounded border-2 border-primary focus:ring-1 ring-primary'>
            WRITE</Link>
          <div class="relative ml-3">
            <div>
              <button type="button" onClick={()=>setShowMenu(!showMenu)} class=" space-x-2 relative flex items-center justify-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img src={user?.avatar} className=' w-14 text-3xl border-2 border-primary rounded-full text-center p-1' alt={`${user.username.charAt(0).toUpperCase()}`}/>
                <p className=' text-primary'>{user.username}</p>
              </button>
            </div>
            {showMenu ? (
            <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-tertiary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <Link to={'/profile'} onClick={()=>setShowMenu(!showMenu)}  className="text-primary block p-1 px-2 hover:bg-third" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>
              <a href="#" onClick={()=>logout()} className="text-primary block p-1 px-2 hover:bg-third" role="menuitem" tabindex="-1" id="user-menu-item-2">
                Sign out</a>
            </div>
          ):('')}
        </div>
        </div>
        )
        :(
          <div>
            <Link to={'/login'}
            className=' bg-bgprimary py-2 rounded px-4 focus:ring-2 ring-primary'>Login</Link>
          </div>
        )
}
        </div>
        
      </div>

     
    </nav>
  )
}
