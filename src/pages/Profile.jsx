import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";

export default function Profile() {
  const { userId } = useParams();
  const [pic, setPic] = useState(null);
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (userId) {
      authService
        .getCurrentUser()
        .then((user) => {
          setProfile(user);
          setPic(appwriteService.getFilePreview(userId));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setPic]);
 
  useEffect(() => {
      
      appwriteService.getMyPosts(userId).then((posts) => {
          if (posts) {
              setPosts(posts.documents)
          }
      })
     
  }, [])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; 
    if (file) {
      await appwriteService.uploadProfile(file, userId);
      setPic(appwriteService.getFilePreview(userId)); // Update picture preview

    }
  }
  const handleFileUpdate = async (event) => {
    await appwriteService.deleteFile(userId)
    const file = event.target.files[0];
    console.log("update")
    if (file) {
      await appwriteService.uploadProfile(file, userId);
      setPic(appwriteService.getFilePreview(userId)); // Update picture preview

    }
  }


  return (
    <div className="w-full py-4">
      <header className="text-center text-2xl font-bold py-2">User Profile</header>
      {profile ? (
        <div className="w-full flex flex-col items-center">
          {/* Profile Section */}
          <div className="w-full flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={pic || appwriteService.getFilePreview("674ded9d0028b0035365")} // Use `pic` if available, otherwise fallback to default
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
              />
              {/* Edit icon overlay */}
              <div
                className="absolute bottom-2 right-2 bg-gray-200 p-1 rounded-full cursor-pointer hover:bg-gray-300"
                onClick={() => document.getElementById("fileUpload").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487a2.25 2.25 0 113.182 3.182l-9.273 9.273a4.5 4.5 0 01-1.933 1.123l-4.365 1.454 1.454-4.365a4.5 4.5 0 011.123-1.933l9.273-9.273z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5L14.25 5.25"
                  />
                </svg>
              </div>
              <input type="file" id="fileUpload" onChange={pic? handleFileUpdate : handleFileUpload} className="hidden" />
            </div>
            <div className="text-lg font-medium mt-2">{profile.name}</div>
          </div>
  
          {/* Posts Section */}
          <div className="w-full px-4">
            <h2 className="text-xl font-semibold mb-4">My Posts</h2>
            <div className="flex flex-wrap -m-2">
              {posts.map((post) => (
                <div key={post.$id} className="p-2">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
  

  
   
}

