const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * GET logged-in user
 */
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.send({
            message: "User fetched successfully",
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

/**
 * GET all users except logged-in user
 */
router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const allUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password");

        res.send({
            message: "All users fetched successfully",
            success: true,
            data: allUsers
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;

