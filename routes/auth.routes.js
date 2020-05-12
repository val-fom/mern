const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: add validation
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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
