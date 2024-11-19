import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

export const BlogCard = ({blog}) => {
    const getFirstSentence = (text) => {
        if (!text) return ''; // Return empty if no content
        const firstSentence = text.split(/[.!?]/)[0]; // Split by sentence-ending punctuation
        return firstSentence.trim(); // Remove extra spaces if any
      };
  return (
    <div>

        <Link to={`/blogs/${blog.id}`} key={blog.id} className={` ${blog.id % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className={` lg:min-w-[45rem] md:w-[30rem] bg-light font-serif rounded-lg p-2 px-4 space-y-2 flex-1`}>
                <div className='flex items-center space-x-2'>
                    <div className='w-10 h-10'>
                        {blog.user?.avatar ? 
                        <img src={blog.user?.avatar}
                            className='flex items-center justify-center text-2xl object-cover h-full w-full rounded-2xl' /> 
                            :
                            <div className=' flex items-center justify-center bg-black text-tertiary text-2xl object-cover h-full w-full rounded-2xl'>
                              {blog.user?.username.charAt(0)}
                            </div>
                          }  
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-base md:text-lg'>{blog.user.username}</span>
                        <span className=' text-xs text-gray-500'>posted {moment(blog.created_at).fromNow()}</span>
                    </div>
                </div>
                <div className='font-serif text-2xl md:text-xl font-semibold overflow-hidden whitespace-nowrap'>
                    {blog.title}
                </div>
                <p className='text-sm' dangerouslySetInnerHTML={{__html:getFirstSentence(blog.content)}}>
                </p>
                <p className='text-slate-400 text-xs md:text-sm'>#{blog.category.name}</p>
            </div>
        </Link>

    </div>
  )
}
