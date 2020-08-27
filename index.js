const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");

/**
 * Mongoose Models
 */
require("./models/User");

/**
 * Calling passport default functions.
 */
require("./services/passport");

/**
 * Mongoose Connectivity
 */
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * New Express App
 */
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
