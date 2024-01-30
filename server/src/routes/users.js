var express = require("express");
const { User } = require("../database/mongo_connection");
var app = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  verifyToken,
  verifyTokenNext,
  verifyTokenBoolean,
} = require("../global_functions/auth");

// User specific
app.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
});

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with the same email already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      // Generate a unique token for the user
      // const token = crypto.randomBytes(20).toString('hex');
      const token = "";

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while hashing the password" });
        }

        // Create a new user with the hashed password and token
        const newUser = new User({
          token: token,
          name,
          email,
          password: hashedPassword,
          preferredVideoQuality: "",
          subscription: false,
          recentlyWatched: [],
          watchlist: [],
          resetToken: "",
          resetTokenExpiration: "",
          ratings: [],
        });

        // Save the user to the database
        newUser
          .save()
          .then(() => {
            res.status(201).json({ user: "User created successfully" });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ error: "A DB error occurred while creating the user" });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    });
});

// User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the entered password is correct
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while comparing passwords" });
        }

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, "A!B@C#D$E%", {
          expiresIn: "5d",
        });
        user.token = token;
        // Save the user to the database
        user
          .save()
          .then(() => {
            // Return user details and token
            res.json({ user });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: "A DB error occurred while creating the token" });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while logging in" });
    });
});

// Ratings Push
app.post("/ratings", verifyToken, (req, res) => {
  const { id } = req.body;
  const { cat } = req.body;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (cat == "rating") {
        const index = user.ratings.indexOf(id);
        if (index !== -1) {
          user.ratings.splice(index, 1);
        } else {
          user.ratings.push(id);
        }
      } else {
        const index = user.downvote.indexOf(id);
        if (index !== -1) {
          user.downvote.splice(index, 1);
        } else {
          user.downvote.push(id);
        }
      }
      user
        .save()
        .then(() => {
          res.json({ message: "Rating updated successfully" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ error: "An error occurred while saving the rating" });
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

//Ratings Get
app.get("/ratings/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Retrieve the rating from the user's ratings object
      const index = user.ratings.indexOf(id);

      if (index !== -1) {
        res.json({ [id]: true });
      } else {
        // Retrieve the rating from the user's ratings object
        const index = user.downvote.indexOf(id);

        if (index !== -1) {
          res.json({ [id]: false });
        } else {
          res.status(404).json({ error: "Rating not found" });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

// Update Subscription
app.put("/:userId/subscription", (req, res) => {
  const { userId } = req.params;
  const { subscription } = true;

  // Find the user by ID and update the subscription status
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.subscription = true;
      user
        .save()
        .then((user) => {
          res.json(user);
        })
        .catch((er) => {
          console.log(er);
          res.status(500).json({});
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the subscription" });
    });
});

app.get("/:userId/subscription", (req, res) => {
  const { userId } = req.params;

  // Find the user by ID and update the subscription status
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: user });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the subscription" });
    });
});

app.get("/profile", verifyToken, (req, res) => {
  const userId = req.userId;
  console.log(userId);
  // Find the user by ID
  User.findById(userId)
    .then((user) => {
      console.log(user, " Logged in");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the user profile" });
    });
});

app.put("/profile", verifyToken, (req, res) => {
  const userId = req.userId;
  const { name } = req.body;
  console.log(userId);
  // Find the user by ID
  User.findByIdAndUpdate(userId, { name }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while updating user Name" });
    });
});

app.put("/profile/preferences", verifyToken, (req, res) => {
  const userId = req.userId;
  const { preferredVideoQuality } = req.body;

  // Find the user by ID and update their preferences
  User.findByIdAndUpdate(userId, { preferredVideoQuality }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User preferences updated successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while updating user preferences" });
    });
});

app.post("/watchlist", verifyToken, async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const index = user.watchlist.indexOf(id);

      if (index !== -1) {
        // Remove the ID from user's watchlist
        user.watchlist.splice(index, 1);
      } else {
        // Add the ID to user's watchlist
        user.watchlist.push(id);
      }

      user
        .save()
        .then(() => {
          res.json({ message: "watchlist updated successfully" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ error: "An error occurred while saving the watchlist" });
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

//watchlist Get
app.get("/watchlist/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Retrieve the rating from the user's ratings object
      const index = user.watchlist.indexOf(id);

      if (index !== -1) {
        res.json({ [id]: true });
      } else {
        res.status(404).json({ error: "Rating not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

app.post("/recently-watched", verifyToken, (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const index = user.watchlist.indexOf(id);

      if (index === -1) {
        // Add the ID to user's recentlyWatched
        user.recentlyWatched.push(id);
        user
          .save()
          .then(() => {
            res.json({ message: "Recently Watched updated successfully" });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              error: "An error occurred while saving the Recently Watched",
            });
          });
      } else {
        res.json({ message: "Already added to Recently Watched" });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

module.exports = app;
