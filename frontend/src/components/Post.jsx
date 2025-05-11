import React from "react";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Post = ({ post }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className=" flex items-center space-x-3 mb-4">
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
      <p className="text-gray-300">{post.content}</p>
    </div>
  );
};

export default Post;
