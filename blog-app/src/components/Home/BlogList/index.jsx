import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const BlogList = ({ blogs }) => {
  return (
    <div className="blogList-wrap">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          {/* Check if cover exists before rendering the image */}
          {blog.cover && (
            <img src={blog.cover.file.url} alt={blog.title} />
          )}

          <h3>{blog.title}</h3>

          {/* Truncate the description to show only 10 lines */}
          <p>{truncateDescription(blog.description, 10)}</p>

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

// Truncate description function
const truncateDescription = (description, maxLines) => {
  if (!description) {
    return '';
  }

  const lines = description.split('\n');
  const truncatedLines = lines.slice(0, maxLines);
  return truncatedLines.join('\n');
};

export default BlogList;
