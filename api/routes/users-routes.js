const { authenticateUser } = require('../auth-user');
const express = require('express');
const router = express.Router();
router.use(express.json());
const { Users } = require('../models');

// Handler function to wrap each route.
asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
};

// READS/RETRIEVES a user according to authentication.
router.get(
  '/',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await req.currentUser;
    res.json(user);
  })
);

// CREATES a new user.
router.post(
  '/',
  asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
      const user = await Users.create(req.body);
      res.location('/');
      res.status(201).end();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
