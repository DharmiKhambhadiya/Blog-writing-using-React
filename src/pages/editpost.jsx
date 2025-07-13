import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwrieservice from "../appwrite/config";
import Postform from "../components/postform/postform";

function EditPost() {
  const navigate = useNavigate();
  const [post, setpost] = useState(null); // post is an object, not array
  const { slug } = useParams();
  useEffect(() => {
    console.log("URL param:", slug); // ✅ Debug URL param

    if (slug) {
      appwrieservice
        .getPost(slug)
        .then((post) => {
          console.log("Fetched Post:", post); // ✅ Debug post data
          if (post) {
            setpost(post);
          } else {
            console.warn("Post not found, redirecting to home");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        });
    } else {
      console.warn("URL param missing, redirecting to home");
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? <Postform post={post} /> : null;
}

export default EditPost;
