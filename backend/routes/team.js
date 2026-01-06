const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'אין אישור גישה' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'טוקן לא בתוקף' });
  }
};

// @route   GET /dashboard
// @desc    Get dashboard data based on role
router.get('/dashboard', auth, async (req, res) => {
  try {
    if (req.user.role === 'player') {
        const me = await User.findById(req.user.id).select('-password');
        return res.json(me);
    } else {
        const players = await User.find({ role: 'player' }).select('-password');
        return res.json({ 
            players: players, 
            user: { name: req.user.name, role: req.user.role }
        });
    }
  } catch (err) {
    res.status(500).json({ msg: 'שגיאת שרת' });
  }
});

// @route   GET /players
// @desc    Get all players
router.get('/players', auth, async (req, res) => {
  try {
    const players = await User.find({ role: 'player' }).select('-password');
    res.json(players);
  } catch (err) { res.status(500).json({ msg: 'Error' }); }
});

// @route   POST /propose-update/:playerId
// @desc    Directly update player plan (Coach only)
router.post('/propose-update/:playerId', auth, async (req, res) => {
  if (!['coach', 'head-coach'].includes(req.user.role)) {
    return res.status(403).json({ msg: 'גישה למאמנים בלבד' });
  }

  const { trainingPlan, nutritionPlan } = req.body;
  
  try {
    let player = await User.findById(req.params.playerId);
    if (!player) return res.status(404).json({ msg: 'שחקן לא נמצא' });

    // Direct update logic
    player.trainingPlan = trainingPlan;
    player.nutritionPlan = nutritionPlan;
    player.pendingUpdate = { active: false, approvals: [], proposedChanges: {} };
    
    await player.save();
    return res.json({ msg: 'התוכנית עודכנה בהצלחה!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'שגיאה בשמירה' });
  }
});

module.exports = router;