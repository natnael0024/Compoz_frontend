import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const BlogEdit = () => {
  const {id} = useParams('id')
  const [blog, setBlog] = useState({})
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const getBlog = async()=>{
        try{
            await axios.get(`/blogs/${id}`)
        .then(res=>{
            console.log(res.data)
            setBlog(res.data.blog)
            setTitle(blog.title)
            setContent(blog.content)
            setCategoryId(blog.category_id)
            setCurrentImg(blog.image)
            setReady(true)
        })
        .catch(error=>{
            console.log(error)
        })
    }catch(error){
        console.log('error')
    }
        }
        getBlog()
  },[ready])

  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [currentImg, setCurrentImg] = useState('')
  const [image, setImage]= useState([])
  const [categoryId, setCategoryId] = useState('')


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

  const handleContent = (value) => {
    setContent(value)
  }

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  console.log('categoryId:',categoryId)

  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props} >
        <circle cx={12} cy={12} r={12} fill="#000" opacity="0.5" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  

  const handleSubmit = async () =>{
    const data = new FormData()
    
      data.append('title', title)
      data.append('content',content)
      data.append('category_id', categoryId)
      data.append('image', image)

      try{
      await axios.put(`blogs/${id}/update`, data)
      .then(res=>{
        
        toast(`Blog updated successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          navigate(`/blogs/${id}`)
      })
      .catch(error=>{
        console.log(error)
      })
      
    }catch(error){
      console.log(error)
    }
    console.log(data)
  }
  
  return (
    <div className=' border font-serif mt-5 space-y-4'>
      <h1 className=' font-semibold'>
        Edit Blog</h1>
      <div className=' flex  space-x-3'>
          <div className=' flex-1  space-y-2'>
            <div className=' w-full max-h-[12rem]'> 
              <img src={currentImg} alt=""
              className=' object-cover max-h-[12rem] w-full rounded' />
            </div>
            <input type="text" placeholder='give a title' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} 
            className=' w-full p-2 font-semibold rounded-none text-4xl'  />
            <ReactQuill theme='snow' value={content} onChange={handleContent} placeholder='write content' className=' bg-light'/>
          </div>
          <div className=' flex flex-col space-y-3 bg-light p-3 py-5 border border-gray-300 rounded '>
            <input type="file" name='image' onChange={handleImage} />
            <div>
              <h1>Category</h1>
              <RadioGroup value={categoryId} onChange={setCategoryId}>
              <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {categories.map((cat) => (
                      <RadioGroup.Option
                        key={cat.id}
                        value={cat.id}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'ring-1  ring-offset-1 ring-primary'
                              : ''
                          }
                          ${checked ? ' bg-bgprimary ' : 'bg-light'}
                            relative flex cursor-pointer rounded px-5 py-4 shadow-md focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? 'text-primary' : ''
                                  }`}
                                >
                                  {cat.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                  }`}
                                >
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked && (
                              <div className="shrink-0 text-primary">
                                <CheckIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <button onClick={()=>handleSubmit()} className=' bg-primary p-2 rounded text-light focus:ring-2 ring-green-300'>
              UPDATE</button>
              {/* <button className=' border-2 border-primary p-2 rounded text-primary focus:ring-2 ring-green-300'>
              SAVE AS DRAFT</button> */}
          </div>
      </div>
    </div>
  )
}