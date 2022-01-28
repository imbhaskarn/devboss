const express = require('express');
const router = express.Router()
const submitHandle = require('../customMiddlewares/submitHandle')

const isLoggedIn = require('../auth/authenticate');
const BlogController = require("../controllers/blog.controller");
const multer = require('multer');
const upload = multer({
    dest: './public/uploads'
})

router.get('/', BlogController.AllPost);
router.get("/new", BlogController.newPost);
router.post("/new", upload.single('cover'), submitHandle, BlogController.newPostAction)

module.exports = router