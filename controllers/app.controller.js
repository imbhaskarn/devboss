const conn = require("../model/db");
const fs = require("fs");
const base64 = require("base-64");

//Home route

const HomePage = (req, res) => {
  console.log(req.user)
  return res.render('index', {
    user: req.user
  })

};

// all posts route

module.exports = {
  HomePage
};