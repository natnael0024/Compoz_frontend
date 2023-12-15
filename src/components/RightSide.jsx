import React from 'react'
import { Link } from 'react-router-dom'

export const RightSide = () => {
    const blogs = [
    
        {
            id: 2,
            title: 'Title',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis saepe deleniti unde aut quaerat omnis ipsam inventore incidunt odio assumenda.',
            image: 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=900&t=st=1702294835~exp=1702295435~hmac=286e5bf0b58321f380722fff464e6cf6f5dfe8107caaf8df0794d9babbb6ef5b'
        },
        {
            id: 3,
            title: 'Title',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis saepe deleniti unde aut quaerat omnis ipsam inventore incidunt odio assumenda.',
            image: 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=900&t=st=1702294835~exp=1702295435~hmac=286e5bf0b58321f380722fff464e6cf6f5dfe8107caaf8df0794d9babbb6ef5b'
        },
        {
            id: 4,
            title: 'Title',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis saepe deleniti unde aut quaerat omnis ipsam inventore incidunt odio assumenda.',
            image: 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=900&t=st=1702294835~exp=1702295435~hmac=286e5bf0b58321f380722fff464e6cf6f5dfe8107caaf8df0794d9babbb6ef5b'
        },
    ]
  return (
    <div className=' w-[15rem]'>
        <h1>Other blogs you may like</h1>

        {
            blogs.map((blog)=>(
                <Link to key={blog.id} 
                    className= {`mx-auto flex flex-col max-w-[30rem] space-x-5 justify-center mt-5 rounded bg-light `} >
                    <div className=' flex-1'>
                    <img src={blog.image} alt="" className=' w-full h-full rounded-t object-cover' />
                    </div>
                    <div className=' p-2 px-1 space-y-2 flex-1'>
                        <h1 className=' font-serif text-xl font-semibold'>{blog.title}</h1>
                        <p className=' font-serif text-sm'>{blog.content}</p>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}
