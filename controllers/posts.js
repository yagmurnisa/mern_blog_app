const Post = require('../models/Post');
const User = require('../models/User');

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({_id:-1}).populate('user', ['name']);;
        res.status(200).json(posts);     
        console.log(posts);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
      }
};

const searchPosts = async (req,res) => {
  try {
      const text= req.query.q;
      console.log(text);
      const posts = await Post.find( { text: { $regex: text, $options: "i" }}).populate('user', ['name']);
      res.status(200).json(posts);     
      console.log(posts);
  } catch (err) {
      console.error(err.message);
      res.status(404).json(err.message);
    }
};

const getPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', ['name']);
        res.status(200).json(post);
        console.log(post);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);        
    }
};

const addPost = async (req,res) => {
  const user = await User.findById(req.user.id).select('-password');
  console.log(user);
  console.log(req.body);
  try {
        const newPost = new Post({
          user: user.id,
          text: req.body.text,
          image: req.body.file,
          });
        const save = await newPost.save();
        const post = await Post.findById(save._id).populate('user', ['name']);
        console.log(post);
        res.status(200).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
    }
};

const deletePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(400).json({ msg: 'Post not found' });
        }
    
        // Check user
        if (post.user._id.toString() != req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.deleteOne();
        res.status(200).json({ msg: 'Post deleted' });
      } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
          return res.status(400).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
      }
};

module.exports = {getPosts, getPost, addPost, searchPosts, deletePost};

