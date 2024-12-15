const express = require('express');
const router = express.Router();
const FitnessLog = require('../models/FitnessLog');

// Add a fitness log
router.post('/', async (req, res) => {
  const { userId, date, steps, caloriesBurned, workoutDetails } = req.body;

  // Validate required fields
  if (!userId || !date) {
    return res.status(400).json({ message: 'userId and date are required' });
  }

  try {
    const fitnessLog = new FitnessLog({ userId, date, steps, caloriesBurned, workoutDetails });
    await fitnessLog.save();
    res.status(201).json(fitnessLog);
  } catch (error) {
    console.error('Error adding fitness log:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get fitness logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const logs = await FitnessLog.find({ userId: req.params.userId });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No fitness logs found for this user' });
    }

    res.json(logs);
  } catch (error) {
    console.error('Error retrieving fitness logs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
