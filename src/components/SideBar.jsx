import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import coffee from '../assets/coffee&code.png'

export const SideBar = () => {
  
  const [categories, setCategories] = useState([])
  const location = useLocation()  // Hook to access the current location/path
  const currentCategory = new URLSearchParams(location.search).get('cat')  // Get 'cat' query param from URL

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('/categories')
        setCategories(res.data.categories)
      } catch (error) {
        console.error(error)
      }
    }
    getCategories()
  }, [])

  // Function to determine if the category is active
  const isActiveCategory = (categoryName) => {
    return categoryName === currentCategory
  }

  return (
    <div className='hidden sticky top-16 font-serif lg:min-w-[14rem] md:min-w-[10rem] sm:flex flex-col rounded py-1'>
      <span>
        <Link to={'/'} className='flex items-center p-2'>
          <img src={coffee} alt="logo" className='h-8 w-8' />
          <h1 className='text-lg font-bold rounded py-1.5 px-1 italic'>
            <span>chill&code </span>
          </h1>
        </Link>
      </span>
      <Link to={'/'} className={`p-2 hover:bg-bgprimary flex space-x-2 ${!currentCategory ? 'bg-[#ebd8cc] rounded-lg' : ''}`}>
        <span>💯 All</span>
      </Link>
      
      {categories.map((cat) => (
        <Link 
          key={cat.id} 
          to={`?cat=${cat.name}`} 
          className={`p-2 flex space-x-2 ${isActiveCategory(cat.name) ? ' bg-[#ebd8cc] rounded-lg' : 'hover:bg-bgprimary'}`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </Link>
      ))}
    </div>
  )
}
