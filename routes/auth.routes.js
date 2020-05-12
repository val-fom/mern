const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();

router.post('/register', [
  check('email', 'Wrong email').isEmail().normalizeEmail(),
  check('password', 'min length is 6').isLength({ min: 6 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong registration data',
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error}` });
  }
});

router.post('/login', [
  check('email', 'Wrong email').isEmail().normalizeEmail(),
  check('password', 'Please enter the password').exists(),
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong login data',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ massage: 'Wrong password' });
    }

    const token = jwt.sign({ user: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

    res.json({ token, user: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
