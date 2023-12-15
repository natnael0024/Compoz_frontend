import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Recommended = ({currentBlog}) => {

    const [recommededBlogs, setRecommendedBlogs] = useState([])
    useEffect(()=>{
        const getRecommendedBlogs = async()=>{
            try{
                await axios.get(`/blogs?cat=${currentBlog.category_id}`)
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
    <div className=' w-[15rem]'>
        <h1>Other blogs you may like</h1>

        {
            recommededBlogs?.map((blog)=>(
                <Link to={`/blogs/${blog.id}`} key={blog.id} 
                    className= {`mx-auto flex flex-col max-w-[30rem] space-x-5 justify-center mt-5 rounded bg-light `} >
                    {
                        blog.image &&
                        <div className=' flex-1'>
                            <img src={blog.image} alt="" className=' w-full h-full rounded-t object-cover' />
                        </div>
                    }
                    <div className=' p-2 px-1 space-y-2 flex-1'>
                        <h1 className=' font-serif text-xl font-semibold'>{blog.title}</h1>
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