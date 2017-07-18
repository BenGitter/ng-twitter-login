const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const config = require("./config")[process.env.NODE_ENV || "production"];

const express = require("express");
const app = express();

app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
  consumerKey: config.CONSUMER_KEY,
  consumerSecret: config.CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
(token, tokenSecret, profile, callback) => {
  console.log(token);
  return callback(null, profile);
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get("/auth/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/failure" }), (req, res) => {
  // Redirect to dev server or to "/"
  res.redirect(config.LOGIN_CALLBACK);
});

app.get('/api/profile', loggedIn, (req, res) => {
    res.json({ user: req.user });
});

app.get("/failure", (req, res) => {
  res.json({msg: "FAILURE"});
});

app.listen(3000, () => {
  console.log("App started");
});

function loggedIn(req, res, next){
  if(req.user){
    next();
  }else{
    res.json({error: "Not logged in"});
  }
}