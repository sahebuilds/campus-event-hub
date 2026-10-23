const User = require('../models/User');

// @desc Register or login user
const authenticateUser = async (req, res) => {
  try {
    const { name, identifier, role, email } = req.body;
    let user = await User.findOne({ identifier });
    
    if (!user) {
      user = new User({ name, identifier, role, email: email || `${identifier.toLowerCase()}@campus.edu` });
      await user.save();
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { authenticateUser };