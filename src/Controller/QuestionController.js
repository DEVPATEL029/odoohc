// src/controllers/QuestionController.js

import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

// Create Question
export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const newQuestion = new Question({
      title,
      description,
      tags,
      user: req.user.id
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ message: 'Server error while creating question.' });
  }
};

// Get All Questions with Filters + Pagination
export const getAllQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter = 'newest' } = req.query;

    let sort = { createdAt: -1 }; // Newest by default
    let query = {};

    if (filter === 'unanswered') {
      query.acceptedAnswer = null;
    }

    const questions = await Question.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'username')
      .populate('tags');

    const total = await Question.countDocuments(query);

    res.status(200).json({
      data: questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error while fetching questions.' });
  }
};

// Get Question By ID with Answers
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', 'username')
      .populate('tags');

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const answers = await Answer.find({ question: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({ question, answers });
  } catch (err) {
    console.error('Error fetching question by ID:', err);
    res.status(500).json({ message: 'Server error while fetching question.' });
  }
};

// Update Question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ message: 'Server error while updating question.' });
  }
};

// Delete Question
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Question deleted successfully.' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ message: 'Server error while deleting question.' });
  }
};

// Search Questions (by keyword & tag)
export const searchQuestions = async (req, res) => {
  const { keyword, tag } = req.query;

  let filter = {};

  if (keyword) {
    filter.title = { $regex: keyword, $options: 'i' };
  }

  if (tag) {
    filter.tags = tag;
  }

  try {
    const questions = await Question.find(filter).populate('tags');
    res.status(200).json(questions);
  } catch (err) {
    console.error('Error searching questions:', err);
    res.status(500).json({ message: 'Server error while searching questions.' });
  }
};

// Accept Answer
export const acceptAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (question.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to accept answer' });
    }

    question.acceptedAnswer = req.params.answerId;
    await question.save();

    res.status(200).json({ message: 'Answer accepted successfully.', acceptedAnswer: req.params.answerId });
  } catch (err) {
    res.status(500).json({ message: 'Server error while accepting answer.' });
  }
};
