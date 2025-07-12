// src/routes/QuestionRoutes.js

import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  acceptAnswer
} from '../Controller/QuestionController.js';
import { Authorization } from '../middleware/Auth.js';

const QueRouter = express.Router();

//create a question
QueRouter.post('/api/create-Question', Authorization, createQuestion);

//get all questions of users
QueRouter.get('/api/get-all-questions', getAllQuestions);

//search any question
QueRouter.get('/api/search', searchQuestions);

//get a question 
QueRouter.get('/api/get-question/:id', getQuestionById);

//update a question only logged in user can
QueRouter.put('/api/update-question/:id', Authorization, updateQuestion);

//delete a question only logged in user can
QueRouter.delete('/api/delete-question/:id', Authorization, deleteQuestion);

// For accepting answer
QueRouter.put('api/:questionId/accept-answer/:answerId', Authorization, acceptAnswer);

export {QueRouter};
