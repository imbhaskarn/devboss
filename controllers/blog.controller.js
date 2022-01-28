const fs = require('fs');
const conn = require('../model/db');
const queryAsync = require('../promisify');
const mime = require('mime');
const moment = require('moment')


const AllPost = (req, res) => {
  queryAsync('Select * from Posts', []).then((result) => {
    console.log(result)
    return res.render('all-posts', {
      posts: result
    })
  }).catch((err) => {
    return console.log(err.message);
  });
}

// Get request handling for new post
const newPost = async (req, res) => {
  res.render("new-post", {
    user: req.user
  });
};

// Post request handling for new post submission
const newPostAction = (req, res) => {
  const file = req.file
  const body = req.body

  conn.queryAsync(`INSERT INTO Posts(userId, postedAt, content, title, image) VALUES [?,?,?,?,?]`,
    [1001, moment().format('lll'), req.body.base64Content, req.body.title, req.file.filename]).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err.message)
    return res.render('new-post', {
      user: req.user
    });
  });
};

module.exports = {
  AllPost,
  newPost,
  newPostAction
}