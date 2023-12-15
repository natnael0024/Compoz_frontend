import React from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Outlet } from 'react-router'
import { SideBar } from './components/SideBar'

export const Layout = () => {
  return (
    <div>
        <Nav/>

    <div className='lg:px-40 md:px-6 px-2  flex items-start space-x-5'>
      
      <div className='min-h-screen w-full '>
        <Outlet/>
      </div>
      
    </div>
        
        <Footer/>
    </div>
  )
}