//run validators 
const { User } = require('../models');

const userController = {
  //get all users
  getAllUser(req, res) {
    User.find({})
  },
  //get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
  },
  //create a new user
  createUser({ body }, res) {
    User.create(body)
  },

  //update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
  },

  //delete user
  deleteUser({ params, res }) {
    User.findOneAndDelete({ _id: params.id })
  }
}

module.exports = userController;