// src/controllers/AnswerController.js

import Answer from '../models/Answer.js';
import Question from '../models/Question.js';

// Add answer
export const addAnswer = async (req, res) => {
  const { content } = req.body;

  try {
    const newAnswer = new Answer({
      content,
      question: req.params.questionId,
      user: req.user.id
    });

    await newAnswer.save();

    // Add answer to Question (for ref, optional if not stored in array)
    await Question.findByIdAndUpdate(req.params.questionId, {
      $push: { answers: newAnswer._id }
    });

    res.status(201).json(newAnswer);
  } catch (err) {
    console.error('Error adding answer:', err);
    res.status(500).json({ message: 'Server error while adding answer.' });
  }
};

// Vote Answer (upvote/downvote only once per user)
export const voteAnswer = async (req, res) => {
  const { voteType } = req.body;
  const answerId = req.params.answerId;
  const userId = req.user.id;

  try {
    const answer = await Answer.findById(answerId);

    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (answer.votedUsers.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted.' });
    }

    if (voteType === 'upvote') {
      answer.votes++;
    } else if (voteType === 'downvote') {
      answer.votes--;
    }

    answer.votedUsers.push(userId);
    await answer.save();

    res.status(200).json(answer);
  } catch (err) {
    console.error('Voting error:', err);
    res.status(500).json({ message: 'Server error while voting answer.' });
  }
};
