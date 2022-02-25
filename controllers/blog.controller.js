const fs = require('fs');
const conn = require('../dbConnection/db');
const base64 = require('base-64')
const moment = require('moment')
const {
  queryAsync
} = require('../promisify');

const AllPost = (req, res) => {
  // queryAsync('Select * from Posts', []).then((result) => {
  //   console.log(result[0])
  //   // Create a buffer from the string
  //   let bufferObj = Buffer.from(result[0].content, "base64");

  //   // Encode the Buffer as a utf8 string
  //   result.content = bufferObj
  //   return res.render('index', {
  //     posts: result
  //   })
  // }).catch((err) => {
  //   return console.log(err.message);
  // });
  res.render('index.ejs', {
    user: req.user,
    msg:req.flash('logout'),
    success:req.flash('success')
  })
}
const viewPost = (req, res) => {
  // queryAsync('Select * from Posts where id = ?', [req.params.id]).then((result) => {
  //   console.log(result)
  //   return res.render('post', {
  //     post: result
  //   })
  // }).catch(err => {
  //   return err.message
  // })
  res.render('post.ejs')
}
// Get request handling for new post
const newPost = async (req, res) => {
  res.render("new-post.ejs", {
    user: req.user,
    error: req.flash('error')
  });
};

// Post request handling for new post submission
const newPostAction = (req, res) => {
  console.log(req.body)
  queryAsync(`INSERT INTO Posts (userId, postedAt, content, title, image, tags) values (?,?,?,?,?,?)`, [1001, moment().format('lll'), req.body.base64Content, req.body.title, req.file.fileName, 'General'])
    .then(result => {
      req.flash('saved', 'Post saved succefully!')
      return res.redirect('/blog')
    })
    .catch(err => {
      console.log(err)
      req.flash('saved', 'Post not saved!')
      return res.render('new-post', {
        body: req.body
      })
    })
};

module.exports = {
  AllPost,
  viewPost,
  newPost,
  newPostAction
}