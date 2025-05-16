import React from "react";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

import { useLikeDislike } from "../hooks/useLikeDislike";

const Post = ({ post, user }) => {
  const userId = user.username;
  const {
    liked,
    disliked,
    likedCount,
    dislikedCount,
    toggleLike,
    toggleDislike,
  } = useLikeDislike({
    postId: post.id,
    userId,
    likedBy: post.likedBy,
    dislikedBy: post.dislikedBy,
  });

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className=" flex items-center space-x-3 mb-2">
        <Avatar
          src={post.author.avatar}
          className={` w-8 h-8 rounded-full aspect-square `}
        />
        <div className="text-gray-50 text-md font-semibold">
          {post.author.name}
          <span className=" text-gray-400 text-sm font-normal ml-2">
            {"@"}
            {post.author.username} . {dayjs(post.timestamp).from(dayjs())}
          </span>
        </div>
      </div>
      <div>
        <p className="text-gray-300">{post.content}</p>
        {post.img && (
          <img
            src={post.img}
            alt={`${post.author.name} post`}
            className="mt-2"
          />
        )}
      </div>
      <div className="flex gap-8 mt-4 pl-5">
        <div className="flex gap-2 items-center  cursor-pointer">
          {liked ? (
            <AiFillLike
              onClick={toggleLike}
              className="w-5 h-5 hover:scale-110 text-blue-600"
            />
          ) : (
            <AiOutlineLike
              onClick={toggleLike}
              className="w-5 h-5 hover:scale-110 text-blue-600"
            />
          )}
          {likedCount}
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          {disliked ? (
            <AiFillDislike
              onClick={toggleDislike}
              className="w-5 h-5 hover:scale-110 text-red-500"
            />
          ) : (
            <AiOutlineDislike
              onClick={toggleDislike}
              className="w-5 h-5 hover:scale-110 text-red-500"
            />
          )}
          {dislikedCount}
        </div>
      </div>
    </div>
  );
};

export default Post;
