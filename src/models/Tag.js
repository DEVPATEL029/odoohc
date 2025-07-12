// src/models/Tag.js

import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

export default mongoose.model('Tag', tagSchema);
