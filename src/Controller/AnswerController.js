import Answer from '../models/Answer.js';
import Question from '../models/Question.js';

export const addAnswer = async (req, res) => {
  const { content, questionId } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const newAnswer = new Answer({
      content,
      user: req.user.id,  // assuming authenticate middleware sets req.user
      question: questionId
    });

    await newAnswer.save();

    res.status(201).json({ message: 'Answer added successfully.', answer: newAnswer });
  } catch (err) {
    console.error('Error adding answer:', err);
    res.status(500).json({ message: 'Server error while adding answer.' });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const updated = await Answer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    res.status(200).json({ message: 'Answer updated successfully.', updated });
  } catch (err) {
    console.error('Error updating answer:', err);
    res.status(500).json({ message: 'Server error while updating answer.' });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const deleted = await Answer.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    res.status(200).json({ message: 'Answer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting answer:', err);
    res.status(500).json({ message: 'Server error while deleting answer.' });
  }
};

export const getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'first_name last_name');
    res.status(200).json(answers);
  } catch (err) {
    console.error('Error fetching answers:', err);
    res.status(500).json({ message: 'Server error while fetching answers.' });
  }
};

export const getSingleAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('user', 'first_name last_name');

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    res.status(200).json(answer);
  } catch (err) {
    console.error('Error fetching answer:', err);
    res.status(500).json({ message: 'Server error while fetching answer.' });
  }
};

export const voteAnswer = async (req, res) => {
  const { voteType } = req.body; // frontend sends voteType: 'up' or 'down'

  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    if (voteType === 'up') {
      answer.votes += 1;
    } else if (voteType === 'down') {
      answer.votes -= 1;
    } else {
      return res.status(400).json({ message: 'Invalid vote type.' });
    }

    await answer.save();
    res.status(200).json({ message: `Answer ${voteType}voted successfully.`, votes: answer.votes });
  } catch (err) {
    console.error('Error voting answer:', err);
    res.status(500).json({ message: 'Server error while voting answer.' });
  }
};
