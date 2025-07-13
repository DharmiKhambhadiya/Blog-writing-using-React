import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Postcard from "../components/postcard";
import "../components/css/home.css";
import defaultPosts from "../API/post.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [post, setpost] = useState([]);
  const userdata = useSelector((state) => state.auth.userdata);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result && result.documents && result.documents.length > 0) {
        setpost(result.documents);
      } else {
        setpost(defaultPosts);
      }
    });
  }, []);

  const handleStartWriting = () => {
    if (userdata && userdata.$id) {
      navigate("/add-post");
    } else {
      alert("Please sign in to write a post.");
    }
  };

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="hero-content" style={{ textAlign: "left" }}>
          <img src="/logo.svg" alt="BlogNest Logo" className="hero-logo-left" />
          <h2 className="hero-headline" style={{ textAlign: "left" }}>
            Share Your Story
          </h2>
          <p className="hero-desc" style={{ marginTop: 0, textAlign: "left" }}>
            Your voice matters. Whether you have a passion to share, a story to
            tell, or insights to inspire, creating a blog is your platform to
            make a difference. Join our community of writers and storytellers
            today and let your creativity shine. Start crafting your next
            masterpiece and share it with the world.
          </p>
          <button className="custom-btn hero-btn" onClick={handleStartWriting}>
            Start Writing
          </button>
        </div>
        <div className="hero-image">
          <img src="/images/blogging.webp" alt="Blogging Illustration" />
          {/* Use your own SVG or PNG illustration here */}
        </div>
      </section>
      <h1 className="home-title"></h1>
      <div className="home-posts">
        {post.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          post.map((p) => <Postcard key={p.$id} post={p} />)
        )}
      </div>
    </div>
  );
}

export default Home;
