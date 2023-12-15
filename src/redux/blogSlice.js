import {createSlice} from '@reduxjs/toolkit'

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
        }
    }
  })

  export const { setBlogs, setFilteredBlogs} = blogSlice.actions
  export default blogSlice.reducer

  //step 3