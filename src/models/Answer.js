// src/models/Answer.js

import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    votes:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Answer', answerSchema);
