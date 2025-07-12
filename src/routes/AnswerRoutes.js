// src/routes/TagRoutes.js

import express from 'express';
import {
  addAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswersByQuestion,
  getSingleAnswer,
  voteAnswer
} from '../Controller/AnswerController.js';

import { Authorization } from '../middleware/Auth.js';

const AnsRouter = express.Router();

// ✅ Add an answer (requires auth)
AnsRouter.post('/api/add-answer', Authorization, addAnswer);

// ✅ Update an answer (requires auth)
AnsRouter.put('/api/update-answer/:id', Authorization, updateAnswer);

// ✅ Delete an answer (requires auth)
AnsRouter.delete('/api/delete-answer/:id', Authorization, deleteAnswer);

// ✅ Get all answers for a question (public)
AnsRouter.get('/api/answers/:questionId', getAnswersByQuestion);

// ✅ Get single answer by ID (public)
AnsRouter.get('/api/answer/:id', getSingleAnswer);

// ✅ Vote on an answer (requires auth)
AnsRouter.put('/api/vote-answer/:id', Authorization, voteAnswer);

export  {AnsRouter};
