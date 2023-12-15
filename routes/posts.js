const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {getPosts, getPost, addPost, searchPosts, deletePost} = require('../controllers/posts');

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);
router.delete("/:id", auth, deletePost);
router.post("/", auth, addPost);


module.exports = router;