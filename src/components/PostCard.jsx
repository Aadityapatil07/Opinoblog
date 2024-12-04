import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {

  const getTruncatedText = (text, wordLimit = 10) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;  // Return the original text if less than the word limit
    }
    return words.slice(0, wordLimit).join(' ') + '...';  // Truncate and add ellipsis
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full sm:w-56 p-2 shadow-sm bg-[#FAEBD7] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg">
        <div
          className="w-full relative overflow-hidden mb-2 "
          style={{
            paddingTop: "66.67%", // Aspect ratio: (3648 / 5472) * 100
          }}
        >
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="text-base px-2 font-medium text-[#1E3A5F] hover:text-[#66A5AD] transition-all duration-300">
          {title}
        </div>
        <div className="text-xs py-1 px-2 font-medium text-[#1E3A5F] hover:text-[#66A5AD] transition-all duration-300">
          {parse(getTruncatedText(content, 15))}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
