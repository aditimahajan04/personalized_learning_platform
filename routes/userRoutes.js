const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, academicProgress, fitnessData, careerInterests, parentalInvolvement } = req.body;
  try {
    const user = new User({
      name,
      email,
      academicProgress,
      fitnessData,
      careerInterests,
      parentalInvolvement
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
