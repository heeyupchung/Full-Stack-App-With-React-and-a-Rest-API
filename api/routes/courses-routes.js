const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth-user');
router.use(express.json());
const { Courses } = require('../models');
const { Users } = require('../models');

// Handler function to wrap each route.
asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler.
      console.log(error);
      next(error);
    }
  };
};

// CREATES a new course.
router.post(
  '/',
  authenticateUser,
  asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
      const course = await Courses.create(req.body);
      res.location(`/api/courses/${course.id}`);
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

// READS/RETRIEVES all courses.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const course = await Courses.findAll({
      include: [
        {
          model: Users,
        },
      ],
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course was not found' });
    }
  })
);

// READS/RETRIEVES a course with corresponding ID.
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Courses.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course was not found' });
    }
  })
);

// UPDATES a course with corresponding ID.
router.put(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Courses.findByPk(req.params.id);
      if (course) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(404).end();
      }
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

// DELETES a course with corresponding ID.
router.delete(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Courses.findByPk(req.params.id);
    if (course) {
      await Courses.destroy({ where: { id: req.params.id } });
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Course was not found' });
    }
  })
);

module.exports = router;
