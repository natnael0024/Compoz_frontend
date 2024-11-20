import React, { useContext, useEffect, useState } from 'react'
import { RightSide } from '../components/RightSide'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { AuthContext } from '../Context/authContext'
import { SideBar } from '../components/SideBar'
import { Recommended } from '../components/Recommended'

export const Blog = () => {

    const [blog, setBlog] = useState({})
    const {user} = useContext(AuthContext);
    
    const {id} = useParams('id')

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchBlog = async () =>{
            try{
                await axios.get(`/blogs/${id}`)
                .then(res=>{
                    setBlog(res.data.blog)
                })
                .catch(error=>{
                    console.log(error)
                })
            }catch(error){
                console.log(error)
            }         
        }
        fetchBlog()
    },[id])
    

    const handleDelete= async ()=> {
        function getCookie(name) {
            const cookieString = document.cookie;
            const cookies = cookieString.split(';');
          
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
              }
            }
          
            return null;
          }
        
        const token = getCookie('token');
        const accessToken = {
            token:token
        }
        console.log(accessToken)
        
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                
                 axios.delete(`/blogs/${id}/delete`,{
                    headers: {
                        token
                    }
                 })
                 .then(res=>{
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your blog has been deleted.",
                        icon: "success"
                      });
                      navigate('/')
                 })
                 .catch(error=>{
                    console.log(error)
                 })
            }
          });
    }
    
  return (
    <div className=' font-serif flex  space-x-10 '>

        <div className='space-y-4 lg:w-[50rem] md:w-[30rem] flex-grow rounded-b bg-light'>
            <div>
                <img src={blog.image} alt="" className=' rounded w-full object-cover max-h-[25rem]' />
            </div>
            <div className=' px-10 pb-10'>
                <div className=' flex items-center justify-between '>
                            <Link to={`/users/${blog.user_id}`} className=' flex items-center space-x-2'>
                                <div className=' w-12 h-12'>
                                    {blog.user?.avatar ? 
                                    <img src={blog.user?.avatar}
                                        className='flex items-center justify-center text-2xl object-cover border h-full w-full rounded-2xl' /> 
                                        :
                                        <div className=' flex items-center justify-center bg-black text-tertiary text-2xl object-cover border h-full w-full rounded-2xl'>
                                          {blog.user?.username.charAt(0)}
                                        </div>
                                      }  
                                </div>
                                <div className=' flex flex-col'>
                                    <span>
                                        {blog.user?.username}
                                    </span>
                                    <span className=' text-sm'>
                                       Posted {moment(blog.created_at).fromNow()}
                                    </span>
                                </div>
                            </Link>
                    {
                        (blog.user_id === user?.id)?(
                            <div className=' flex space-x-4'>
                                <Link to={`/blogs/${id}/edit`}>📝edit</Link>
                                <button onClick={handleDelete}>❌delete</button>
                            </div>
                        ):('')
                    }
                </div>

                <div className=' mt-10 space-y-5'>
                    <div>
                        <h1 className=' text-4xl font-bold'>{blog.title}</h1>
                        <p className='text-slate-400 text-xs md:text-sm'>#{blog.category?.name}</p>
                    </div>
                    <p className=' leading-8 text-xl' dangerouslySetInnerHTML={{__html:blog.content}}>
                        {/* content goes here */}
                    </p>
                </div>
            </div>
        </div>
        <div className=' '>
            <Recommended currentBlog={blog}/>
        </div>
    </div>
  )
}
