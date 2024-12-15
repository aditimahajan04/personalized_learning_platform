const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  academicProgress: [{ subject: String, score: Number }],
  fitnessData: {
    steps: Number,
    caloriesBurned: Number
  },
  careerInterests: [String],
  parentalInvolvement: {
    parentName: String,
    contactInfo: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
