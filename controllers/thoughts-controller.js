const { Thoughts } = require('../models');

const thoughtsController = {
  //find all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },

  //find thought by id
  getThoughtById({ params}, res) {
    Thoughts.findOne({ _id: params.id})
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },
  //create new thought
  createThought({ body }, res) {
    Thoughts.create(body) 
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  }
}