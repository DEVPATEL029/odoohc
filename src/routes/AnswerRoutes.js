// src/routes/TagRoutes.js

import express from 'express';
import { voteAnswer } from '../Controller/AnswerController.js';
import { Authentication } from '../middleware/Auth.js'; // optional if only admins can create/delete

const AnsRouter = express.Router();

AnsRouter.post('/api/:id/vote', Authentication, voteAnswer);

export  {AnsRouter};
