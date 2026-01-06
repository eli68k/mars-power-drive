const Player = require('../models/Player');

// Fetch all players from the database
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({}); 
    res.json(players);
  } catch (err) {
    console.error('Error fetching players:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update player's training and nutrition plans
exports.updatePlayerPlan = async (req, res) => {
  const playerId = req.params.id;
  const { trainingPlan, nutritionPlan } = req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { $set: { trainingPlan, nutritionPlan } },
      { new: true }
    );
    
    if (!updatedPlayer) {
        return res.status(404).json({ msg: 'שחקן לא נמצא' });
    }
    
    res.json({ msg: 'התוכנית עודכנה בהצלחה!', data: updatedPlayer });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ msg: 'שגיאה בשמירה' });
  }
};

// Fetch a single player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ msg: 'שחקן לא נמצא' });
        }
        res.json(player);
    } catch (err) {
        console.error('Get by ID error:', err.message);
        res.status(500).send('Server Error');
    }
};