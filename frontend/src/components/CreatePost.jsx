import React, { useState } from "react";
import Avatar from "./Avatar";

const CreatePost = ({ newPost, setNewPost, handlePost, user }) => {
  return (
    <div className=" bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex space-x-3">
        <Avatar
          src={user.avatar}
          className={` w-10 h-10 rounded-full aspect-square `}
        />

        <textarea
          className=" w-full bg-gray-700 text-white p-2 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What's happening"
          rows="3"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePost();
          }}
        ></textarea>
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={handlePost}
          className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
