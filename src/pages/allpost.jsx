import React, { useEffect, useState } from "react";
import Postcard from "../components/postcard";
import appwriteService from "../appwrite/config";
import "../components/css/allpost.css";
import defaultPosts from '../API/post.json';

function Allpost() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result && result.documents && result.documents.length > 0) {
        setposts(result.documents);
      } else {
        setposts(defaultPosts);
      }
    });
  }, []);

  return (
    <div className="allpost-grid">
      {posts.map((post) => (
        <Postcard key={post.$id} post={post} />
      ))}
    </div>
  );
}

export default Allpost;
