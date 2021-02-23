const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughts-controller');

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:thoughtId')
  .get(getThoughtById);

router 
  .route('/:userId')
  .post(createThought);

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(deleteThought);

  module.exports = router;