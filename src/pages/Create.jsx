import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

export const Create = () => {

  const navigate = useNavigate()

  const {user, isLoggedIn} = useContext(AuthContext)

  if(!isLoggedIn){
    navigate('/login')
  }
  
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState(localStorage.getItem('title') || '')
  const [content, setContent] = useState(localStorage.getItem('content') || '')
  const [image, setImage]= useState([localStorage.getItem('image')])
  const [categoryId, setCategoryId] = useState(localStorage.getItem('catId') || null)
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
  },[categoryId])

  const handleTitle = (e)=>{
    setTitle(e.target.value)
    localStorage.setItem('title',e.target.value)
  }
  const handleContent = (value) => {
    setContent(value)
    localStorage.setItem('content',value)
  }

  const handleCategoryId = (selectedValue) => {
    console.log(selectedValue);
    setCategoryId(selectedValue);
    localStorage.setItem('catId', selectedValue);
  };


  const handleImage = (e) => {
    const img = e.target.files[0]
    setImage(img)
    localStorage.setItem('image',e.target.files[0])
    preview(img)
  }

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
    const data = new FormData()

      data.append('title', title)
      data.append('content',content)
      data.append('category_id', categoryId)
      data.append('image', image)
      data.append('user_id', user.id )
      console.log(data)
      
    try{
      await axios.post('/blogs/create', data)
      .then(res=>{
        toast(`Blog posted successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          localStorage.removeItem('title')
          localStorage.removeItem('content')
          localStorage.removeItem('catId')
          localStorage.removeItem('image')

          navigate('/')
      })
      .catch(error=>{
        console.log(error)
        const err = error.response.data.message?error.response.data.message:'An error has occured'
        toast(`${err}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
    }catch(error){
      console.log(error)
    }
  }

 
  return (
    <div className=' font-serif mt-5 space-y-4'>
      <h1 className=' font-semibold'>
        Write a Blog</h1>
      <div className=' flex space-x-3'>
          <div className=' flex-grow space-y-2'>
          <div className=' w-full max-h-[12rem]'> 
              <img src={previewUrl} alt=""
              className=' object-cover max-h-[12rem] w-full rounded' />
            </div>
            <input type="text" placeholder='give a title' name='title' value={title} onChange={handleTitle} 
            className=' w-full p-2 py-3 font-bold text-4xl'  />
            <ReactQuill theme='snow' value={content} onChange={handleContent} placeholder='write content' className=' bg-light'/>
          </div>
          <div className=' flex flex-col space-y-3 bg-light p-3 py-5 border border-gray-300 rounded '>
            <input type="file" name='image' onChange={handleImage} />
            <div>
              <h1>Category</h1>
              <RadioGroup value={categoryId} onChange={handleCategoryId}>
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
                          ${(checked || categoryId === cat.id) ? ' bg-bgprimary ' : 'bg-light'}
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
                                    (checked || categoryId === cat.id) ? 'text-primary' : ''
                                  }`}
                                >
                                  {cat.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={`inline ${
                                    (checked || categoryId === cat.id) ? 'text-sky-100' : 'text-gray-500'
                                  }`}
                                >
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {(checked || categoryId === cat.id) && (
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
              PUBLISH</button>
              <button className=' border-2 border-primary p-2 rounded text-primary focus:ring-2 ring-green-300'>
              SAVE AS DRAFT</button>
          </div>
      </div>
    </div>
  )
}
