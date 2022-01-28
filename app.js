const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const AppController = require("./controllers/app.controller");
const passport = require('passport')
const authRoute = require('./routes/auth.route')
const flash = require('connect-flash');
const session = require('express-session')
const conn = require("./model/db");
const blogRoute = require('./routes/blog.route')
require('./auth/passport.config')
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(session({
  secret: 'hidden',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 7
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts);
app.set("view engine", "ejs");

app.set("layout", "layouts/layout.ejs");

// Routes
app.use('/auth', authRoute)
app.use('/blog', blogRoute)



//home route
app.get('/', AppController.HomePage)

app.use((req, res, next) => {
  res.status(404).render('page-not-found.ejs');
  next()
})


// app listening
app.listen(3000, () => {
  return console.log("server running..");
});