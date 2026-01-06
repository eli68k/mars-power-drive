const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  // Personal Details & Authentication
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'player' },

  // Professional Profile
  externalId: { type: Number },
  jerseyNumber: { type: String },
  position: { type: String },
  height: { type: String },
  birthDate: { type: String },
  imageUrl: { type: String },

  // Training Plan
  trainingPlan: {
    shooting: { type: String, default: '300 זריקות' },
    shootingDrills: { type: String },
    fitness: { type: String, default: 'אירובי קל' },
    fitnessDrills: { type: String },
    weightTarget: { type: Number }
  },

  // Nutrition
  nutritionPlan: { type: String, default: 'תפריט מאוזן' },
  nutritionMenu: { type: String }
});

module.exports = mongoose.model('Player', PlayerSchema);