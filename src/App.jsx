import './App.css'
import {Routes, Route} from 'react-router-dom'
import {Layout} from '../src/Layout'
import {Home} from './pages/Home'
import {Register} from './pages/Register'
import {Login} from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blog } from './pages/Blog'
import { Create } from './pages/Create'
import axios  from 'axios'
import { BlogEdit } from './pages/BlogEdit'
import { Profile } from './pages/Profile'
import { ProfileEdit } from './pages/ProfileEdit'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { User } from './pages/User'

axios.defaults.baseURL = 'http://localhost:8080/v1'



export const App = ()=> {

  return (
      <div className=' text-primary bg-tertiary  '>
        <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/blogs/:id' element={<Blog/>}/>
            <Route path='/blogs/create' element={<Create/>}/>
            <Route path='/blogs/:id/edit' element={<BlogEdit/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/edit' element={<ProfileEdit/>}/>
            <Route path='/users/:id' element={<User/>}/>
          </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        </Routes>
      </div>
  )
}