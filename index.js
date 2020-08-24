const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");

/**
 * Calling passport default functions.
 */
require("./services/passport");

/**
 * Mongoose Models
 */
require("./models/User");

/**
 * Mongoose Connectivity
 */
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * New Express App
 */
const app = express();

/**
 * Passing express app to auth routes
 */
authRoutes(app);

/**
 * Default Routes
 */
app.get("/", (req, res) => {
  res.send({ hi: "i changed something" });
});

/**
 * Dynamic Port Handling. For Heroku
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
