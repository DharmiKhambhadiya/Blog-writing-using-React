import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import "./css/postcard.css";

function Postcard({ post }) {
  if (!post) return null; // ✅ prevent crash if post is undefined

  const getImageUrl = () => {
    const imageField = post.featuredimage;
    
    if (!imageField) return null;
    
    // If it's a local image path (starts with / or http)
    if (typeof imageField === 'string' && (imageField.startsWith('/') || imageField.startsWith('http'))) {
      return imageField;
    }
    
    // If it's an Appwrite file ID, use getFileView
    return appwriteService.getFileView(imageField);
  };

  const imageUrl = getImageUrl();

  return (
    <Link
      to={`/post/${post.$id}`}
      state={post.isDefault ? { post } : undefined}
      className="postcard-link"
    >
      <div className="postcard">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="postcard-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="postcard-no-image" style={{ display: imageUrl ? 'none' : 'flex' }}>
          <span>📷 {post.title}</span>
        </div>
        <h2 className="postcard-title">{post.title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
