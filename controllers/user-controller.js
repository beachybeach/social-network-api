//run validators 
const { User } = require('../models');

const userController = {
  //get all users
  getAllUser(req, res) {
    User.find({})
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },
  //get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },
  //create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  },

  //update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
      .then(result => {
        if (!result) {
          res.status(400).json({ message: 'User not found'});
          return;
        }
        res.json(result)
      })
      .catch(err => res.status(400).json(err));
  },

  //delete user
  deleteUser({ params, res }) {
    User.findOneAndDelete({ _id: params.id })
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

module.exports = userController;