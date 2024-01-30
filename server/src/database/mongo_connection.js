const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://flixxit:flixxit@cluster0.7q5wvus.mongodb.net/flixxit",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

const userSchema = new mongoose.Schema({
  token: String,
  name: String,
  email: String,
  password: String,
  preferredVideoQuality: String,
  subscription: Boolean,
  ratings: [String],
  downvote: [String],
  recentlyWatched: [String],
  watchlist: [String],
  resetToken: String,
  resetTokenExpiration: String,
});

const contentSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  genre: String,
  releaseDate: Date,
  description: String,
  cast: [String],
  videoUrl: String,
  intro_skip: String,
  poster: String,
});

const User = mongoose.model("User", userSchema);
const Content = mongoose.model("Content", contentSchema);

module.exports = {
  mongoose,
  User,
  Content,
};
/**
 * users:
 *      (each user)
 *      name:string
 *      email
 *      password hashed
 *      prefered video quality
 *      subscription:boolean
 *      recently watched:content collection id
 *      watchlist:content collection id
 * content collection:
 *      geners(horror, animation, action):
 *          (each movie)
 *          title
 *          rating
 *          genere
 *          release date
 *          description
 *          cast(string array)
 */
