// src/routes/TagRoutes.js

import express from 'express';
import { createTag, getAllTags, deleteTag } from '../Controller/TagController.js';
import { Authorization } from '../middleware/Auth.js'; // optional if only admins can create/delete

const TagRouter = express.Router();

TagRouter.post('/api/tags', Authorization, createTag);
TagRouter.get('/api/get-tags', getAllTags);
TagRouter.delete('/api/tags/:id', Authorization, deleteTag);

export  {TagRouter};
