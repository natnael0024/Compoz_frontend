import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Recommended = ({currentBlog}) => {

    const [recommededBlogs, setRecommendedBlogs] = useState([])
    useEffect(()=>{
        const getRecommendedBlogs = async()=>{
            try{
                await axios.get(`/blogs?cat=${currentBlog.category.name}`)
                .then(res=>{
                    const recb = res.data.blogs.filter((blog)=>blog.id !== currentBlog.id)
                    setRecommendedBlogs(recb)
                })
                .catch(error=>{
                    console.log(error)
                })
            }catch(error){
                console.log(error)
            }
        }
        getRecommendedBlogs()
    },[currentBlog])
 
        return (
    <div className=' w-[16rem]'>
        <h1 className=' font-semibold text-xl'>Other blogs you may like</h1>

        {
            recommededBlogs?.map((blog)=>(
                <Link to={`/blogs/${blog.id}`} key={blog.id} 
                    className= {` flex flex-col space-y-2 justify-center mt-2 rounded bg-light `} >
                    
                    {
                        blog.image &&
                        <div className=' flex-1 '>
                        <img src={blog.image} alt="" className=' w-full max-h-12 md:max-h-14 lg:max-h-16 rounded-t object-cover' />
                        </div>
                    }
                       
                    <div className=' px-2  space-y-2 flex-1'>
                    <div className='font-serif text-xl md:text-xl font-semibold break-words'>
                        {blog.title}
                    </div>
                        <p className=' font-serif text-sm'>
                            <div dangerouslySetInnerHTML={{__html: blog.content.substring(0,100)}}/>...
                        </p>
                    </div>
                </Link>
            ))
        }
    </div>
  )

}