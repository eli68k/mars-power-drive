const User = require('../models/User');     
const Player = require('../models/Player'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;
    let collectionName = '';

    // First, check if the user exists in the Coaches collection (Users)
    user = await User.findOne({ email });
    if (user) {
        collectionName = 'users';
    }

    // If not found, check the Players collection
    if (!user) {
      user = await Player.findOne({ email });
      if (user) {
          collectionName = 'players';
      }
    }

    if (!user) {
      return res.status(400).json({ msg: 'משתמש לא קיים' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'סיסמה שגויה' });
    }

    // Generate JWT with role and collection info
    const payload = {
      user: {
        id: user.id,
        role: user.role || 'player',
        collection: collectionName
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '12h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
};