import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import PostDetail from "../components/postdetail";

export default function Post() {
  const location = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state?.post || null);
  const userData = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    if (!post && slug) {
      appwriteService.getPost(slug).then((result) => {
        if (result) setPost(result);
        else navigate("/");
      });
    }
  }, [slug, post, navigate]);

  if (!post) return null;

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  return (
    <div className="py-8">
      <button
        className="custom-btn"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>
      <PostDetail
        post={post}
        isAuthor={isAuthor}
        onEdit={() => navigate(`/edit-post/${post.$id}`)}
        onDelete={() => {
          appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
              appwriteService.deleteFile(post.featuredimage);
              navigate("/");
            }
          });
        }}
      />
    </div>
  );
}
