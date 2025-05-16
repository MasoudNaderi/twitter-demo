import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import Login from "./layouts/Login";
import Post from "./components/Post";
import { ToastContainer } from "react-toastify";
import Header from "./layouts/Header";

document.body.classList.add("bg-gray-900");

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postMedia, setPostMedia] = useState(null);

  user && localStorage.setItem("user", JSON.stringify(user));
  const { name, username, avatar } = user ?? {};

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setData(data);
    }

    fetchPosts();
  }, [data]);

  const handlePost = async () => {
    const newEntry = {
      id: crypto.randomUUID(),
      author: {
        name,
        username,
        avatar,
      },
      content: newPost,
      img: postMedia,
      timestamp: Date.now(),
      likedBy: [],
      dislikedBy: [],
    };
    setData((prev) => [newEntry, ...prev]);

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });
    setNewPost("");
    setPostMedia(null);
  };

  return (
    <>
      <ToastContainer />
      {!user && <Login setUser={setUser} user={user} />}
      {user && (
        <div className=" max-w-2xl mx-auto p-6 min-h-screen text-white ">
          <Header user={user} setUser={setUser} />
          <div>
            <CreatePost
              user={user}
              newPost={newPost}
              setNewPost={setNewPost}
              handlePost={handlePost}
              postMedia={postMedia}
              setPostMedia={setPostMedia}
            />
            <div className="space-y-4">
              {data.map((post) => (
                <Post key={post.id} user={user} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
