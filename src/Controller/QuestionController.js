// src/controllers/QuestionController.js

import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const newQuestion = new Question({
      title,
      description,
      tags,
      user: req.user.id  // Assuming user is set by auth middleware
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ message: 'Server error while creating question.' });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('user', 'username').populate('tags');
    res.status(200).json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error while fetching questions.' });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('user', 'username').populate('tags');
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json(question);
  } catch (err) {
    console.error('Error fetching question by ID:', err);
    res.status(500).json({ message: 'Server error while fetching question.' });
  }
};

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

export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Question deleted successfully.' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ message: 'Server error while deleting question.' });
  }
};

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

export const acceptAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;

  try {
    const question = await Question.findById(questionId);

    // Ensure the logged-in user is the question owner
    if (question.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the question owner can accept an answer.' });
    }

    // Check if the answer belongs to this question
    const answer = await Answer.findOne({ _id: answerId, question: questionId });
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found for this question.' });
    }

    question.acceptedAnswer = answerId;
    await question.save();

    res.status(200).json({ message: 'Answer accepted successfully.', acceptedAnswer: answerId });
  } catch (err) {
    console.error('Error accepting answer:', err);
    res.status(500).json({ message: 'Server error while accepting answer.' });
  }
};
