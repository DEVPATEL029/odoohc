// routes/AnswerRoutes.js

import express from 'express';
import {
  addAnswer,
  voteAnswer
} from '../controllers/AnswerController.js';

import { protect } from '../middleware/Auth.js';

const router = express.Router();

// Answer to a question
router.post('/:questionId', protect, addAnswer);

// Vote on an answer
router.post('/vote/:answerId', protect, voteAnswer);

export default router;
