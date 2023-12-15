import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

export const BlogCard = ({blog}) => {
    
  return (
    <div>

        <Link to={`/blogs/${blog.id}`} key={blog.id} className={` ${blog.id % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className={` lg:min-w-[45rem] md:w-[30rem] bg-light border p-2 px-4 space-y-2 flex-1`}>
                <div className='flex items-center space-x-2'>
                    <div className='w-12 h-12'>
                        <img src={blog.user.avatar} alt={`${blog.user.username.charAt(0).toUpperCase()}`} className='flex items-center justify-center text-2xl border h-full w-full rounded-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-base md:text-lg'>{blog.user.username}</span>
                        <span className='text-xs md:text-sm'>posted {moment(blog.created_at).fromNow()}</span>
                    </div>
                </div>
                <h1 className='font-serif text-2xl md:text-3xl font-semibold'>{blog.title}</h1>
                <p className='text-slate-400 text-xs md:text-sm'>#{blog.category.name}</p>
            </div>
        </Link>

    </div>
  )
}
