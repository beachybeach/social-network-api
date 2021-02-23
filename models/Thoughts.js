const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
 
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: dateValue => dateFormat(dateValue)
    },

    username: {
      type: String,
      required: true
    },

    reactions: [ReactionSchema]
  },
   {
    toJson: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);




ThoughtSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;