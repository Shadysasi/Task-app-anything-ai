const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    
    const user = await User.create({ username, password, role });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};