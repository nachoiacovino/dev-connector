const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [authMiddleware, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server error' });
    }
  },
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    GET api/posts/:post_id
// @desc     Get post by ID
// @access   Private
router.get('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    DELETE api/posts/:post_id
// @desc     Delete post by ID
// @access   Private
router.delete('/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    PUT api/posts/like/:post_id
// @desc     Like a post
// @access   Private
router.put('/like/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    DELETE api/posts/like/:post_id
// @desc     Unlike a post
// @access   Private
router.delete('/like/:post_id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id,
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    POST api/posts/comment/:post_id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:post_id',
  [authMiddleware, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server error' });
    }
  },
);

// @route    DELETE api/posts/comment/:post_id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete(
  '/comment/:post_id/:comment_id',
  authMiddleware,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id,
      );

      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id,
      );

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server error' });
    }
  },
);

module.exports = router;
