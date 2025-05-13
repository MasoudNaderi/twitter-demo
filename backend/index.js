const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ limit: "50mb" }));

const DB = [
  {
    id: "1",
    author: {
      name: "Jane Cooper",
      username: "jane",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    content:
      "Just finished building a new feature for our app. Can't wait to share it with everyone!",
    timestamp: 1745146299000,
  },
  {
    id: "2",
    author: {
      name: "Alex Morgan",
      username: "alexm",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    content:
      "The weather is perfect today for a hike. Anyone interested in joining?",
    timestamp: 1738483859000,
  },
  {
    id: "3",
    author: {
      name: "Taylor Swift",
      username: "taylorswift",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    content:
      "Working on a new song today. The creative process is always so unpredictable but rewarding.",
    timestamp: 1722833619000,
  },
  {
    id: "4",
    author: {
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    content:
      "The future of sustainable energy is closer than you think. We're making significant progress on our latest solar technology.",
    timestamp: 1722632679000,
  },
  {
    id: "5",
    author: {
      name: "Mark Johnson",
      username: "markj",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    content:
      "Just read an amazing book on artificial intelligence. It's fascinating how quickly this field is evolving.",
    timestamp: 1698784200000,
  },
];

app.get("/api/posts", (_req, res) => {
  return res.json(DB);
});

app.post("/api/posts", (req, res) => {
  const text = req.body;
  if (text) DB.unshift(text);

  return res.json();
});

app.listen(5000);
