const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ limit: "50mb" }));

//mock DB
const DB = [
  {
    id: "a70b183b-4bb3-4602-8823-8225019c6cd6",
    author: {
      name: "Jane Cooper",
      username: "jane",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    content:
      "Just finished building a new feature for our app. Can't wait to share it with everyone!",
    likedBy: ["alirezaii", "mahdihsi", "farshidarden"],
    dislikedBy: [
      "naserzeyn",
      "mehradhidden",
      "mahyar",
      "tylerdurden",
      "sami low",
    ],
    timestamp: 1745146299000,
  },
  {
    id: "eed7ad70-46b5-45be-bcb9-12efe17e614e",
    author: {
      name: "Arthur Morgan",
      username: "arhurm",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    content:
      "The weather is perfect today for a hike. Anyone interested in joining?",
    likedBy: ["ali", "reza", "karim", "kazem", "kiomars", "kamran", "armin"],
    dislikedBy: ["erfan", "seyed", "asghar", "akbar", "ahmagh"],
    timestamp: 1738483859000,
  },
  {
    id: "52dbdf29-64ce-45aa-ae53-d45048ae42ef",
    author: {
      name: "Taylor Swift",
      username: "taylorswift",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    content:
      "Working on a new song today. The creative process is always so unpredictable but rewarding.",
    likedBy: ["ali", "reza"],
    dislikedBy: [
      "ali",
      "reza",
      "karim",
      "kazem",
      "kiomars",
      "kamran",
      "armin",
      "ahmad",
      "asghar",
      "seyed",
    ],
    timestamp: 1722833619000,
  },
  {
    id: "0b28c1c0-44cb-49fb-8f47-7f2cdddefcf3",
    author: {
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    content:
      "The future of sustainable energy is closer than you think. We're making significant progress on our latest solar technology.",
    likedBy: [
      "ali",
      "reza",
      "karim",
      "kazem",
      "kiomars",
      "kamran",
      "armin",
      "eli",
      "sonia",
    ],
    dislikedBy: ["maryam", "atefe", "atena", "asena", "aseman", "arezo"],
    timestamp: 1722632679000,
  },
  {
    id: "65bcdbe9-a905-420c-a99a-6840c36393e1",
    author: {
      name: "Mark Johnson",
      username: "markj",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    content:
      "Just read an amazing book on artificial intelligence. It's fascinating how quickly this field is evolving.",
    likedBy: [
      "amir",
      "amirabbas",
      "amirali",
      "aboli",
      "mashti",
      "parviz",
      "mostafa",
      "mehrdad",
    ],
    dislikedBy: ["mojtaba", "mehdi", "mohammad", "azim", "hosein"],
    timestamp: 1698784200000,
  },
];

//GET all posts
app.get("/api/posts", (_req, res) => {
  return res.json(DB);
});

// CREATE a new post
app.post("/api/posts", (req, res) => {
  const entry = req.body;
  if (entry) DB.unshift(entry);

  return res.json();
});

//UPDATE like/dislike
app.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const { userId, action } = req.body;

  const post = DB.find((post) => post.id === id);
  if (!post) {
    return res.status(400).json({ error: "Post not Found" });
  }

  const hasLiked = post.likedBy.includes(userId);
  const hasDisliked = post.dislikedBy.includes(userId);

  if (action === "like") {
    if (!hasLiked) {
      post.likedBy.push(userId);
    }
    post.dislikedBy = post.dislikedBy.filter((uid) => uid !== userId);
  }

  if (action === "dislike") {
    if (!hasDisliked) {
      post.dislikedBy.push(userId);
    }
    post.likedBy = post.likedBy.filter((uid) => uid !== userId);
  }

  //Undo like
  if (hasLiked && action === "like") {
    post.likedBy = post.likedBy.filter((uid) => uid !== userId);
  }

  //Undo dislike
  if (hasDisliked && action === "dislike") {
    post.dislikedBy = post.dislikedBy.filter((uid) => uid !== userId);
  }

  res.json(post);
});
app.listen(5000);
