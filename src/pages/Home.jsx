import React, { useEffect, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { Link, useLocation } from 'react-router-dom';
import { setBlogs, setFilteredBlogs } from '../redux/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/SideBar';
import axios from 'axios';

export const Home = () => {
  const location = useLocation().search;  // Get query params
  const blogs = useSelector((state) => state.blogs.blogs); // All blogs
  const filteredBlogs = useSelector((state) => state.blogs.filteredBlogs); // Filtered blogs
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  // Fetch blogs based on category or search query
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const cat = new URLSearchParams(location).get('cat');
        const search = new URLSearchParams(location).get('search'); // Get search query from URL
        let res;

        if (search) {
          // If there is a search query in the URL, use the filtered list
          dispatch(setFilteredBlogs([]));  // Optionally clear the previous filtered list
          res = await axios.get(`/blogs?search=${search}&page=${currentPage}`);
        } else if (cat) {
          // If category is specified
          res = await axios.get(`/blogs?cat=${cat}&page=${currentPage}`);
        } else {
          // Default case, fetch all blogs
          res = await axios.get(`/blogs?page=${currentPage}`);
        }

        const { blogs: fetchedBlogs, totalPages: fetchedTotalPages } = res.data;
        const newBlogs = loadMoreClicked ? [...blogs, ...fetchedBlogs] : fetchedBlogs;
        dispatch(setBlogs(newBlogs)); // Update the blogs in Redux
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, [dispatch, currentPage, location, loadMoreClicked]);

  // Handle "Load More" functionality
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setLoadMoreClicked(true);
    }
  };

  // Determine which blogs to display based on search query
  const blogsToDisplay = filteredBlogs.length > 0 ? filteredBlogs : blogs;

  return (
    <div className="space-x-5 flex items-start">
      <SideBar />
      <div className="space-y-5 w-full">
        {blogsToDisplay.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
        {currentPage < totalPages && (
          <div className="flex justify-center">
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};
