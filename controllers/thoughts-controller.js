const { Thoughts, User } = require('../models');

const thoughtsController = {

  //find all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },

  //find thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.thoughtsId})
      .then(result => {
        if (!result) {
          res.status(400).json({ message: 'Thought not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));
  },


  //create new thought
  createThought({ params, body }, res) {
    Thoughts.create(body)
    .then(({ _id }) => { 
      return User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { thoughts: _id } },
      { new: true }
      );
    })
  .then(result => {
        if (!result) {
          res.status(400).json({ message: 'User not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));
  },

  updateThought({ params, body}, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughts.Id }, body, {new: true, runValidators: true })
     .then(result => {
        if (!result) {
          res.status(400).json({ message: 'User not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));

    },

  deleteThought({ params}, res) {
    Thoughts.remove({ _id: params.thoughtsId })
    .then(result => {
        if (!result) {
          res.status(400).json({ message: 'User not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));
  }
};