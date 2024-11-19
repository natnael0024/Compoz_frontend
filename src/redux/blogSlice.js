import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    blogs: [],
    filteredBlogs: [],
  };

  const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload
        },
        setFilteredBlogs: (state, action)=>{
            state.filteredBlogs = action.payload
        },
    }
  })

  export const searchBlogs = searchkey => async dispatch => {
    try{
        const response = await axios.get(`/blogs?search=${searchkey}`)
        console.log(response.data.blogs)
        dispatch(setFilteredBlogs(response.data.blogs))
    }catch(error){
        console.log(error)
    }
  }

  export const { setBlogs, setFilteredBlogs} = blogSlice.actions
  export default blogSlice.reducer
