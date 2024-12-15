const mongoose = require('mongoose');

const FitnessLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  steps: Number,
  caloriesBurned: Number,
  workoutDetails: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FitnessLog', FitnessLogSchema);
