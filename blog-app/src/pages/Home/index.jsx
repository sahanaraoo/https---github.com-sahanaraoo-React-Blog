import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Home/Header';
import Searchbar from '../../components/Home/Searchbar';
import BlogList from '../../components/Home/BlogList';
import EmptyList from '../../components/common/EmptyList';




const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [Urls, setUrls] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const spaceId = 'lecsor65z6h5'; 
  const accessToken = 'BfTZj7xc714fKGvPfg7qnA1ZhQh3up_qyWNjQn8Jj8M'; 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=first`
      );
  
    
      const fetchedBlogs = response.data.items
        ? response.data.items.map((item, index) => ({
            id: item.sys.id,
            title: item.fields.title,
            category: item.fields.category,
            subCategory: item.fields.subCategory,
            description: item.fields.description,
            authorName: item.fields.authorName,
            authorAvatar: item.fields.authorAvatar,
            createdAt: item.fields.createdAt,
            cover: response.data.includes.Asset[index].fields.file.url, // Check if 'cover' and 'file' exist
          }))
        : [];
  
      setBlogs(fetchedBlogs);

    } catch (error) {
      console.error('Error fetching data from Contentful:', error);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []); 

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    
    const filteredBlogs = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  const handleClearSearch = () => {
   
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