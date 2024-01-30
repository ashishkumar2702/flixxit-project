var express = require("express");
const { Content, User } = require("../database/mongo_connection");
const { checkAuth } = require("../global_functions/content");
var app = express.Router();

/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.get("/content", (req, res) => {
  Content.find()
    .then(async (content) => {
      const userId = await checkAuth(req, res);
      console.log("found user id ", userId);
      if (userId != "") {
        User.findById(userId)
          .then((user) => {
            // console.log(userId, user)
            const watchlist = user.watchlist;
            const recentlyWatched = user.recentlyWatched;

            const res_watchlist = [];
            const res_recentlyWatched = [];
            // find the lists ids in the content
            for (let i of content) {
              let ind = watchlist.indexOf(i._id);
              let ind2 = recentlyWatched.indexOf(i._id);
              // console.log(ind, ind2)
              if (ind >= 0) {
                res_watchlist.push(i);
              } else if (ind2 >= 0) {
                res_recentlyWatched.push(i);
              }
            }

            res.json({
              content: content,
              watchlist: res_watchlist,
              recentlyWatched: res_recentlyWatched,
            });
          })
          .catch((err) => {
            res.json({ content: content, error: "token expired" });
          });
      } else {
        res.json({ content: content });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching content" });
    });
});

app.get("/content/:contentId", (req, res) => {
  const { contentId } = req.params;

  Content.findById(contentId)
    .then((content) => {
      if (content) {
        res.json(content);
      } else {
        res.status(404).json({ error: "Content not found" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the content" });
    });
});

// Create Content
app.post("/content", (req, res) => {
  let {
    poster,
    title,
    rating,
    genre,
    releaseDate,
    description,
    cast,
    videoUrl,
    intro_skip,
  } = req.body;
  releaseDate = new Date(releaseDate);

  // Create a new content
  const newContent = new Content({
    poster,
    title,
    rating,
    genre,
    releaseDate,
    description,
    cast,
    videoUrl,
    intro_skip,
  });

  // Save the content to the database
  newContent
    .save()
    .then(() => {
      res.status(201).json({ message: "Content created successfully" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the content" });
    });
});

app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  Content.find({ title: { $regex: query, $options: "i" } })
    .then((movies) => {
      // Handle the search results
      res.json(movies);
    })
    .catch((error) => {
      // Handle errors
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while searching movies" });
    });
});

module.exports = app;
