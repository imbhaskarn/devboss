const conn = require("../dbConnection/db");
const fs = require("fs");
const base64 = require("base-64");

//Home route

const HomePage = (req, res) => {
  res.redirect('/blog')
};

// all posts route

module.exports = {
  HomePage
};