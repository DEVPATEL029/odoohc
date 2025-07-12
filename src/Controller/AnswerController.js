import Answer from '../models/Answer.js';

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
