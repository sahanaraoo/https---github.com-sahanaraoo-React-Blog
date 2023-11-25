import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Home/Header';
import Searchbar from '../../components/Home/Searchbar';
// import BlogList from '../../components/Home/BlogList';
import EmptyList from '../../components/common/EmptyList';


const BlogList = ({ blogs }) => {
  return (
    <div className="blogList-wrap">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <img src={blog.cover} alt={blog.title} />
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <p>{`Author: ${blog.authorName}`}</p>
          <p>{`Category: ${blog.category}`}</p>
          <p>{`Created At: ${blog.createdAt}`}</p>
       {/* <img src={blog.authorAvatar} alt={`Avatar of ${blog.authorName}`} /> */}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const spaceId = 'lecsor65z6h5'; 
  const accessToken = 'BfTZj7xc714fKGvPfg7qnA1ZhQh3up_qyWNjQn8Jj8M'; 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=first`
      );
  
      // Check if the 'items' array exists in the response
      const fetchedBlogs = response.data.items
        ? response.data.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            category: item.fields.category,
            subCategory: item.fields.subCategory,
            description: item.fields.description,
            authorName: item.fields.authorName,
            authorAvatar: item.fields.authorAvatar,
            createdAt: item.fields.createdAt,
            cover: item.fields.cover?.fields?.file?.url || '', // Check if 'cover' and 'file' exist
          }))
        : [];
  
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error fetching data from Contentful:', error);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    // Implement your search logic based on the fetched blogs
    // You can use the 'blogs' state for filtering
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  const handleClearSearch = () => {
    // Reset to the original fetched blogs
    fetchData();
    setSearchKey('');
  };

  return (
    <div>
      <Header />
      <Searchbar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchSubmit}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
