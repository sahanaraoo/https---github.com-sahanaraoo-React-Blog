import React, { useState } from 'react'
import Header from '../../components/Home/Header'
import Searchbar from '../../components/Home/Searchbar'
import BlogList from '../../components/Home/BlogList'
import { blogList } from '../../config/data'
import EmptyList from '../../components/common/EmptyList'


const Home = () => {

const [blogs,setBlogs]= useState(blogList);
const [searchkey,setSearchKey]=useState('');

const handleSearchSubmit=event=>{
  event.preventDefault();
  handleSearchResults();
}

const handleSearchBar = (e) => {
  e.preventDefault();
  handleSearchResults();
};

const handleSearchResults=()=>{
  const allBlogs=blogList;
  const filteredBlogs=allBlogs.filter((blog)=>
  blog.category.toLowerCase().includes(searchkey.toLowerCase().trim()));
  setBlogs(filteredBlogs);
}

const handleClearSearch=()=>{
  setBlogs(blogList);
  setSearchKey('');
}

  return (
    <div>
          
          <Header/>
          <Searchbar value={searchkey} clearSearch={handleClearSearch} formSubmit={handleSearchBar} handleSearchKey={(e)=>
          setSearchKey(e.target.value)}/>
          {!blogs.length? <EmptyList/> :<BlogList blogs={blogs}/>}
        
    </div>
  );
};

export default Home;

