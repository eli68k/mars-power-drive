const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  // Authentication & Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['head-coach', 'coach', 'player'], default: 'player' },
  
  // Player Profile (Relevant only if role is 'player')
  externalId: Number,
  position: String,
  jerseyNumber: String,
  height: String,
  birthDate: String,
  imageUrl: String,
  
  // Professional Plans
  trainingPlan: {
    shooting: { type: String, default: 'טרם הוגדר' },
    shootingDrills: { type: String, default: '' },
    fitness: { type: String, default: 'טרם הוגדר' },
    weightTarget: { type: Number, default: 0 }
  },
  nutritionPlan: { type: String, default: 'טרם הוגדר' },

  // Update Approval Workflow
  pendingUpdate: {
    active: { type: Boolean, default: false },
    proposedChanges: { type: Object },
    approvals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }
});

// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);