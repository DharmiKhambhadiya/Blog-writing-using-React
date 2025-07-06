import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwrieservice from "../appwrite/config";

function EditPost() {
  const navigate = useNavigate();
  const [post, setpost] = useState([]);
  const { url } = useParams();

  useEffect(
    (url) => {
      if (url) {
        appwrieservice.getposts(url).then((post) => setpost(post));
      } else {
        navigate("/");
      }
    },
    [url, navigate]
  );

  return post ? (
    <>
      <Postform post={post} />
    </>
  ) : null;
}

export default EditPost;
