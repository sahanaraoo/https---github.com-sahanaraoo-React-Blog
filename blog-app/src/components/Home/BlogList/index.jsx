import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const BlogList = ({ blogs }) => {
  const truncateDescription = (description, maxLines) => {
    const lines = description.split('\n');
    const truncated = lines.slice(0, maxLines).join('\n');
    return truncated;
  };

  const renderImage = (blog) => {
    if (blog.cover) {
       const imageUrl = new URL(blog.cover, window.location.origin);
       return (
         <React.Fragment>
           <img className="blogList-img" src={imageUrl} alt={blog.title} />
         </React.Fragment>
       );
    }
   
    return null;
   };

  
  return (
    <div className="blogList-wrap">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          {renderImage(blog)}
          <h3>{blog.title}</h3>
          <p className="truncated-description">{truncateDescription(blog.description, 10)}</p>
          <p>{`Author: ${blog.authorName}`}</p>
          <p>{`Category: ${blog.category}`}</p>
          <p>{`Created At: ${blog.createdAt}`}</p>
          <Link to={`/blog/${blog.id}`} className="read-more-link">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
