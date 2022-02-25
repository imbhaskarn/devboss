const express = require('express');
const router = express.Router()
const submitHandle = require('../customMiddlewares/submitHandle')
const isLoggedIn = require('../auth/authenticate');
const BlogController = require("../controllers/blog.controller");
const multer = require('multer');
const upload = multer({
    dest: './public/uploads'
})
router.get('', BlogController.AllPost);
router.get('/post/new', BlogController.newPost)
router.get("/post/saved/:id", BlogController.viewPost);
router.post("post/new", isLoggedIn, upload.single('cover'), submitHandle, BlogController.newPostAction)
module.exports = router;