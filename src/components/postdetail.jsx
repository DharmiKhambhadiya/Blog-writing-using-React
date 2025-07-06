import React from "react";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import "./css/postdetail.css";

const PostDetail = ({ post, isAuthor, onEdit, onDelete }) => (
  <div className="postdetail-container">
    <h1 className="postdetail-title">{post.title}</h1>
    <div className="postdetail-image-wrapper">
      {post.featuredimage && (
        <img
          src={(() => {
            const imageField = post.featuredimage;
            
            // If it's a local image path (starts with / or http)
            if (typeof imageField === 'string' && (imageField.startsWith('/') || imageField.startsWith('http'))) {
              return imageField;
            }
            
            // If it's an Appwrite file ID, use getFileView
            return appwriteService.getFileView(imageField);
          })()}
          alt={post.title}
          className="postdetail-img"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
    <div className="postdetail-content-wrapper">
      <div className="postdetail-content">{parse(post.content)}</div>
    </div>
    {isAuthor && !post.isDefault && (
      <div className="postdetail-actions postdetail-actions-center">
        <button className="custom-btn edit-btn" onClick={onEdit}>
          ✏️ Edit
        </button>
        <button className="custom-btn delete-btn" onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    )}
  </div>
);

export default PostDetail;
