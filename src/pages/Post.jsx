import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-2">
          <Container>
            {/* Image at the top-center with reduced height */}
            {isAuthor && (
                <div className="flex justify-end mb-4">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button  className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button  onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            <div className="w-full flex justify-center mb-6">
              
              <div className="relative w-full max-w-screen-xl">
                {/* Container to maintain aspect ratio, but with reduced height */}
                <div className="relative pb-[34.125%] w-full">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="absolute inset-0 w-3/4 h-full left-0 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
      
            {/* Post Content Section */}
            <div className="w-full">
              {/* Edit/Delete buttons for the author */}
              
      
              {/* Post Title */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
              </div>
      
              {/* Post Content */}
              <div className="browser-css">
                {parse(post.content)}
              </div>
            </div>
          </Container>
        </div>
      ) : null;
      
      
}