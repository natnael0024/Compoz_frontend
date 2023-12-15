import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/authContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const ProfileEdit = () => {

    const {user,setUser, isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const [username, setUsername] = useState(user?.username || '')
    const [occupation, setOccupation] = useState('')
    const [bio, setBio] = useState(user?.bio || '')
    const [avatar, setAvatar] = useState([])
    const [previewUrl, setPreviewUrl] = useState(null)

    if(!isLoggedIn){
        navigate('/login')
    }

    const handleImage = (e) => {
        const img = e.target.files[0]
        setAvatar(img)
        localStorage.setItem('image',e.target.files[0])
        preview(img)
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

    const handleSubmit= async ()=> {
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

        const data = new FormData()
        data.append('username',username)
        data.append('bio',bio)
        data.append('avatar',avatar)

        await Swal.fire({
            title: "Are you sure?",
            text: "You want to save changes",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#ffffff",
            confirmButtonText: "Yes, save it!"
          }).then( (result) => {
            if (result.isConfirmed) {
                axios.put(`/users/user/update`,data,{
                    headers: {
                        'Authorization':token
                    }
                }
                 )
                 .then(res=>{
                    Swal.fire({
                        title: "Saved!",
                        text: "Your profile has been updated.",
                        icon: "success"
                      });
                      console.log(res.data.user)
                      setUser(res.data.user)
                    //   navigate('/')
                 })
                 .catch(error=>{
                    console.log(error)
                 })
            }
          })
    }
    console.log(avatar)

  return (
    <div className=' flex flex-col font-serif items-center'>
    
        <h1>{user?.email}</h1>
        <div className=' p-4 px-8 bg-light rounded-lg  space-y-5 flex flex-col  lg:w-[30rem] md:w-[25rem]  '>
            <div className=' flex flex-col space-y-2'>
                <span className=' font-semibold'>Username</span>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
                className=' border rounded p-2'/>
            </div>
      
            <div className=' flex flex-col space-y-2'>
                <span className=' font-semibold'>Occupation</span>
                <input type="text" value={'fullstack'} onChange={(e)=>null}
                className='border rounded p-2'/>
            </div>

            <div className=' flex flex-col space-y-2'>
                <span className=' font-semibold'>bio</span>
                <textarea name="" id="" value={bio} placeholder='bio...' rows="4" 
                className='border rounded p-2' onChange={(e)=>setBio(e.target.value)}></textarea>
            </div>

            <div className=' flex flex-col space-y-2'>
                <span className=' font-semibold'>profile picture</span>
                <input type="file" onChange={handleImage} />
            </div>
         
            <button onClick={()=>handleSubmit()}
            className=' border-2 py-2 rounded'>SAVE CHANGES</button>
        </div>
    
    </div>

)
}
