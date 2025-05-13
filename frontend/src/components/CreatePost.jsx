import React, { useRef } from "react";
import Avatar from "./Avatar";

const CreatePost = ({
  newPost,
  setNewPost,
  handlePost,
  postMedia,
  setPostMedia,
  user,
}) => {
  const textAreaRef = useRef(null);

  const handleInput = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  const handlePostImage = async (e) => {
    return new Promise((res, _rej) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPostMedia(reader.result);
        console.log(reader.result);
        res();
      };
    });
  };
  return (
    <div className=" bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex space-x-3 mt-2">
        <Avatar
          src={user.avatar}
          className={` w-10 h-10 rounded-full aspect-square `}
        />

        <textarea
          className=" w-full bg-gray-800 text-white p-1 border-none rounded-md resize-none focus:outline-none"
          placeholder="What's happening"
          ref={textAreaRef}
          rows="3"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onInput={handleInput}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "Enter") handlePost();
          }}
        ></textarea>
      </div>

      {postMedia && <img src={postMedia} alt="post-image" />}

      <hr className="text-gray-300 mx-auto w-[34rem] h-2 opacity-65" />

      <div className="flex items-center gap-x-[29rem] pl-4 mt-2">
        <label htmlFor="post-media">
          <ion-icon
            name="image-outline"
            className="text-2xl cursor-pointer text-blue-600"
          >
            <input
              type="file"
              id="post-media"
              accept="image/*"
              onChange={handlePostImage}
            />
          </ion-icon>
        </label>

        <button
          onClick={handlePost}
          className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md "
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
