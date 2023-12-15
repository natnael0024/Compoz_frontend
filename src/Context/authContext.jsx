import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const login = async(data) => {
        try{
        await axios.post('/auth/login', data)
        .then(res=>{
            console.log(res)
              setUser(res.data.user)
              setIsLoggedIn(true)
              const token = res.data.token
              document.cookie = 'token='+token+'; SameSite=None; Secure'
              toast(`Welcome ${res.data.user.username}`, {
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
        .catch(error=>{
            console.log(error)
              toast(error.response.data.message, {
                position: "bottom-right",
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

    const logout = async ()=>{
        await axios.post('/auth/logout')
        .then(res=>null)
        .catch(error=>console.log(error))
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem('user')
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
        const currentUser = user
        if(currentUser){
            setUser(currentUser)
            setIsLoggedIn(true)
        }
    },[user])

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, isLoggedIn}}>
        {children}
        </AuthContext.Provider>
    )
}