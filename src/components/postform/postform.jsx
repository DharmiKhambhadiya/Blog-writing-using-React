import React from "react";
import Button from "../button";
import { Input } from "../input";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import RTE from "../RTE";
import "../css/postform.css";

function Postform({ post }) {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);
  
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    // Check if user is logged in
    if (!userdata || !userdata.$id) {
      alert("❌ Please log in to create a post!");
      return;
    }
    
    // Check if title is provided
    if (!data.title || !data.title.trim()) {
      alert("❌ Please enter a title for your post!");
      return;
    }
    
    // Check if image is provided for new posts
    if (!post && (!data.image || data.image.length === 0)) {
      alert("❌ Please select an image for your post!");
      return;
    }
    
    try {
      if (post) {
        // Update existing post
        let fileId = post.featuredimage;
        
        if (data.image && data.image[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            if (post.featuredimage) {
              appwriteService.deleteFile(post.featuredimage);
            }
            fileId = file.$id;
          }
        }
        
        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredimage: fileId,
        });

        if (dbPost) {
          alert("✅ Post updated successfully!");
          navigate(`/post/${dbPost.$id}`);
        } else {
          alert("❌ Failed to update post. Please try again.");
        }
      } else {
        // Create new post
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();

          const dbPost = await appwriteService.createPost({
            title: data.title,
            content: data.content,
            status: data.status,
            slug: slug,
            featuredimage: file.$id,
            userId: userdata.$id,
          });
          
          if (dbPost) {
            alert("✅ Post published successfully!");
            navigate(`/post/${dbPost.$id}`);
          } else {
            alert("❌ Failed to publish post. Please try again.");
          }
        } else {
          alert("❌ Failed to upload image. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error: " + (error.message || "Something went wrong"));
    }
  };

  return (
    <div className="postform-container">
      <form onSubmit={handleSubmit(submit)} className="postform-form">
        <Input
          type="text"
          placeholder="Enter Title for the post"
          {...register("title", { required: true })}
        />

        <Input
          type="file"
          placeholder="Upload image"
          {...register("image", { required: !post })}
          accept="image/png, image/jpg, image/jpeg, image/gif"
        />

        {post && post.featuredimage && (
          <div className="postform-image-preview">
            <img
              src={appwriteService.getFileView(post.featuredimage)}
              alt={post.title}
              className="postform-img"
            />
          </div>
        )}

        <div className="postform-rte">
          <RTE
            label="Write Your Blog:"
            name="content"
            control={control}
            defaultvalue={post?.content || ""}
          />
        </div>

        <div className="postform-btn-row">
          <Button type="submit">
            {post ? "Update" : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Postform;