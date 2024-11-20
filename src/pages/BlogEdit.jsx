import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaX} from 'react-icons/fa6'

export const BlogEdit = () => {
  const {id} = useParams('id')
  const [blog, setBlog] = useState({})
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)  

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
  const [previewUrl, setPreviewUrl] = useState(null)


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

  // const handleImage = (e) => {
  //   setImage(e.target.files[0])
  // }

  const handleImage = (e) => {
    const img = e.target.files[0]
    setImage(img)
    localStorage.setItem('image',e.target.files[0])
    preview(img)
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
  
  const preview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setPreviewUrl(imageUrl);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async () =>{
    if(!title) {
      toast("Please enter blog title", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    else if(!content) {
      toast("Please write blog content", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    else if(!categoryId) {
      toast("Please select category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    setLoading(true)
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
    } finally{
      setLoading(false);  
    }
    console.log(data)
  }
  
  return (
    <div className=' font-serif mt-5 lg:w-[66rem] space-y-4'>
      <div className=' flex justify-between'>
        <h1 className=' font-semibold'>
          Edit Blog</h1>
        <Link to={`/blogs/${id}`} className=' flex items-center gap-1 p-1 rounded-md hover:bg-gray-200' >
          <FaX className=' text-red-400'/>
          <span className='text-gray-500'>cancel editing</span> 
        </Link>
      </div>
      <div className=' w-full flex sm:flex-row flex-col space-x-3'>
          <div className=' w-full flex-1  space-y-2'>
            <div className=' w-full max-h-[12rem]'> 
              <img src={previewUrl ? previewUrl : currentImg} alt=""
              className=' object-cover max-h-[12rem] w-full rounded' />
            </div>
            <input type="text" placeholder='give a title' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} 
            className=' w-full p-2 font-semibold rounded-none text-4xl'  />
            <ReactQuill theme='snow' value={content} onChange={handleContent} placeholder='write content'
              className=' bg-light  md:max-w-[30rem] lg:max-w-[50rem]'/>
          </div>
          <div className=' flex flex-col space-y-3 bg-light p-3 py-5 border border-gray-300 rounded '>
            <input type="file" name='image' onChange={handleImage}
             className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-black file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-bgprimary file:duration-500 hover:file:text-black file:cursor-pointer cursor-pointer focus:outline-none" />
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
            
            <button onClick={()=>handleSubmit()} 
              className=' bg-primary p-2 rounded text-light focus:ring-2 ring-green-300'
              disabled={loading} >
              {loading ? 'UPDATING...' : 'UPDATE'} 
              </button>
          </div>
      </div>
    </div>
  )
}