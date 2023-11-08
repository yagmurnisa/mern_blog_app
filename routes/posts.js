const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {getPosts, getPost, addPost, searchPosts} = require('../controllers/posts');

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);
router.post("/", auth, addPost);


module.exports = router;