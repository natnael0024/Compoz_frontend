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
  const [loading, setLoading] = useState(true); // Loading state to show the spinner

  // Fetch blogs based on category or search query
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Start loading when fetching blogs
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
          dispatch(setFilteredBlogs([]));
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
      } finally {
        setLoading(false); // End loading once the data has been fetched
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
        {/* Show Spinner when data is loading */}
        {loading ? (
          <div className="flex gap-2 font-serif fixed justify-center items-center lg:w-[50rem] lg:h-[40rem] md:w-[30rem] md:h-[15rem]" >
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            Loading...
        </div>
        ) : (
          <>
            {blogsToDisplay.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
            {currentPage < totalPages && (
              <div className="flex justify-center">
                <button onClick={handleLoadMore}>Load More</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
