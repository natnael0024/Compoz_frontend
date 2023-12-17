import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { Link, useLocation } from 'react-router-dom';
import { setBlogs, setFilteredBlogs } from '../redux/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SideBar } from '../components/SideBar';

export const Home = () => {
  const location = useLocation().search;
  const blogs = useSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const cat = new URLSearchParams(location).get('cat');
        let res;
        if (location && cat) {
          res = await axios.get(`/blogs?cat=${cat}&page=${currentPage}`);
        } else {
          res = await axios.get(`/blogs?page=${currentPage}`);
        }
        const { blogs: fetchedBlogs, totalPages: fetchedTotalPages } = res.data;
        const newBlogs = loadMoreClicked ? [...blogs, ...fetchedBlogs] : fetchedBlogs;
        dispatch(setBlogs(newBlogs));
        setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [dispatch, currentPage, location, loadMoreClicked]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setLoadMoreClicked(true);
    }
  };

  return (
    <div className="space-x-5 flex items-start">
      <SideBar />
      <div className="space-y-5">
        {blogs.map((blog) => (
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