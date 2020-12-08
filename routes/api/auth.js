const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

const router = express.Router();

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
});

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public
router.post(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      const isMatch = user && (await bcrypt.compare(password, user.password));

      if (!user || !isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) console.error(err);
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server error' });
    }
  },
);

// @route    DELETE api/auth
// @desc     Delete user, profile and posts
// @access   Private
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;
