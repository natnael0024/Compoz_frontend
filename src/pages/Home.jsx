import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BlogCard } from '../components/BlogCard'
import { Link, useLocation } from 'react-router-dom'
import {setBlogs, setFilteredBlogs} from '../redux/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from '../components/SideBar'

export const Home = () => {

    const location = useLocation().search

    const blogs = useSelector((state)=>state.blogs.blogs)
    const filteredBlogs = useSelector((state) => state.blogs.filteredBlogs)
    const dispatch = useDispatch()

    const blogsToRender = filteredBlogs.length > 0? filteredBlogs : blogs

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            try{
                await axios.get(`/blogs`)
                    .then(res=>{
                        dispatch(setBlogs(res.data.blogs))
                    })
            }catch(error){
                console.log(error)
            }
        }
        fetchBlogs()
    },[dispatch])

    useEffect(()=>{
        const fetchFilteredBlogs = async ()=> {
            try{
                if(location) {
                    const cat = new URLSearchParams(location).get('cat')
                    const filtered = blogs.filter((blog)=>blog.category.name === cat)
                    dispatch(setFilteredBlogs(filtered))
                }
                else{
                    dispatch(setFilteredBlogs(blogs))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchFilteredBlogs()
    },[location,blogs, dispatch])

  return (
    <div className=' space-x-5 flex items-start '>
        <SideBar/>
        <div className=' space-y-5'>
        {
            blogsToRender.map((blog)=>(
                <BlogCard blog={blog}/>
            ))
        }
        </div>
    </div>
  )
}