import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Chip from '../../components/common/chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        
        const response = await axios.get(
          `https://cdn.contentful.com/spaces/lecsor65z6h5/entries/${id}?access_token=BfTZj7xc714fKGvPfg7qnA1ZhQh3up_qyWNjQn8Jj8M`
        );

       
        const assetsResponse = await axios.get(
          `https://cdn.contentful.com/spaces/lecsor65z6h5/assets?access_token=BfTZj7xc714fKGvPfg7qnA1ZhQh3up_qyWNjQn8Jj8M`
        );

        console.log(response);

        if (response.data.fields) {
          const blogData = response.data.fields;

          const coverAsset = assetsResponse.data.items.find(
            (asset) => asset.sys.id === blogData.cover.sys.id
          );

          const coverUrl = coverAsset?.fields?.file?.url || '';

          setBlog({
            id: response.data.sys.id,
            title: blogData.title,
            subCategory: blogData.subCategory || [],
            createdAt: blogData.createdAt,
            cover: coverUrl,
            description: blogData.description,
          });
        }
      } catch (error) {
        console.error('Error fetching blog details from Contentful:', error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className='blog-subCategory'>
              {Array.isArray(blog.subCategory) &&
                blog.subCategory.map((category, i) => (
                  <div key={i}>
                    <Chip label={category} />
                  </div>
                ))}
            </div>
          </header>
          <img src={blog.cover} alt='cover' />
          <p className='blog-desc'>{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
