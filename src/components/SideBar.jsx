import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setFilteredBlogs } from '../redux/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import coffee from '../assets/coffee&code.png'


export const SideBar = () => {
  
    const [categories, setCategories] = useState([])

      useEffect(()=>{
        const getCategories = async()=>{
          await axios.get('/categories')
          .then(res=>{
            setCategories(res.data.categories)
          })
          .catch(error=>{
            console.log(error)
          })
        }
        getCategories()
      },[])
    
  return (
    <div className=' hidden sticky top-16 font-serif lg:min-w-[14rem] md:min-w-[10rem] sm:flex flex-col bg-light border rounded py-1'>
      <span>
        <Link to={'/'} className=' flex items-center p-2'>
        <img src={coffee} alt="" className=' h-8 w-8' />
          <h1
          className=' text-lg  font-bold rounded py-1.5 px-1 italic'><span>chill&code </span></h1>
        </Link>
      </span>
      <Link to={'/'}  className=' p-2 hover:bg-bgprimary flex space-x-2 '>
        <span>💯 All</span>
      </Link>
       {
        categories.map(cat=>(
            <Link key={cat.id} to={`?cat=${cat.name}`}  className=' p-2 hover:bg-bgprimary flex space-x-2 '>
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
            </Link>
        ))
        }
    </div>

  )
}
