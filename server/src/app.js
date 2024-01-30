const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, "dist");
console.log(__dirname);
// Serve all the files in the "dist" directory
app.use("", express.static(buildPath));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

// Serve all the files in the "dist" directory
app.use("*", express.static(buildPath));
const port = process.env.PORT || 5050;
app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

module.exports = app;
