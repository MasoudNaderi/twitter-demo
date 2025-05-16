import { useState } from "react";

export const useLikeDislike = ({
  postId,
  userId,
  likedBy = [],
  dislikedBy = [],
}) => {
  const [liked, setLiked] = useState(likedBy.includes(userId));
  const [disliked, setDisliked] = useState(dislikedBy.includes(userId));
  const [likedUsers, setLikedUsers] = useState(likedBy);
  const [dislikedUsers, setDislikedUsers] = useState(dislikedBy);

  const toggle = async (action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const updatedPost = await res.json();

      setLiked(updatedPost.likedBy.includes(userId));
      setDisliked(updatedPost.dislikedBy.includes(userId));
      setLikedUsers(updatedPost.likedBy);
      setDislikedUsers(updatedPost.dislikedBy);
    } catch (error) {
      console.error("Failed to update like/dislike", error);
    }
  };

  return {
    liked,
    disliked,
    likedCount: likedUsers.length,
    dislikedCount: dislikedUsers.length,
    toggleLike: () => toggle("like"),
    toggleDislike: () => toggle("dislike"),
  };
};
