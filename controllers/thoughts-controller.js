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
    Thoughts.findOne({ _id: params.thoughtId})
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
    Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, {new: true, runValidators: true })
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
    Thoughts.remove({ _id: params.thoughtId })
    .then(result => {
        if (!result) {
          res.status(400).json({ message: 'User not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));
  },



//reactions
  createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(results => {
        if (!results) {
          res.status(400).json({ message: 'User Not Found' });
          return;
        }
        res.json(results);
      })
      .catch(err => res.json(err));
  },

  removeReaction({ params }, res) {
    Thoughts.remove(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
        .then(results => {
        if (!results) {
          res.status(400).json({ message: 'User Not Found' });
          return;
        }
        res.json(results);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;