import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setFilteredBlogs } from '../redux/blogSlice'
import { useDispatch, useSelector } from 'react-redux'


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
    <div className=' sticky top-16 font-serif lg:min-w-[14rem] md:min-w-[10rem] flex flex-col bg-light border rounded py-1'>
      <Link to={'/'}  className=' p-2 hover:bg-bgprimary flex space-x-2 '>
                <span></span>
                <span>All</span>
           </Link>
       {
        categories.map(cat=>(
            <Link to={`?cat=${cat.name}`}  className=' p-2 hover:bg-bgprimary flex space-x-2 '>
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
            </Link>
        ))
        }
    </div>

  )
}
