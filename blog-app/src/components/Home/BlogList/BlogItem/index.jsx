import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
import Chip from '../../../common/chip'

const BlogItem = ({blog:{id,description,title,createdAt,authorName,authorAvatar,category,cover}}) => {
  return (
    <div className='blogItem-wrap'>
        <img className='blogItem-cover' src={cover} alt="cover" style={{maxWidth: '100%'}}  />
        <Chip label={category}/>
        <h3>{title}</h3>
        <p className='blogItem-desc'>{description}</p>
        <footer>
            <div className="blogItem-author">
                <img src={authorAvatar} alt="avatar" style={{maxWidth: '300px'}} />
                <div>
                    <h6>{authorName}</h6>
                    <p>{createdAt}</p>
                </div>
                <Link className='blogItem-link' to={`/blog/${id}`}>➝</Link>
            </div>
        </footer>
    </div>
  );
};

export default BlogItem