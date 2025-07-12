// routes/QuestionRoutes.js

import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  acceptAnswer
} from '../controllers/QuestionController.js';

import { protect } from '../middleware/Auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllQuestions); // ?page=1&limit=10&filter=newest
router.get('/search', searchQuestions);
router.get('/:id', getQuestionById);

// Protected routes
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);

// Accept answer route (only question owner)
router.put('/:questionId/accept/:answerId', protect, acceptAnswer);

export default router;
