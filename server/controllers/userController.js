

const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
    const loggedInUserId = req.userId;

    const allUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select("-password"); // hide password

    res.send({
      message: "All users fetched successfully",
      success: true,
      data: allUsers
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false
    });
  }
});



module.exports = router;
