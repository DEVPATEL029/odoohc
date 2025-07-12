import Answer from '../models/Answer.js';

export const upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    // Remove user from downvotes if present
    answer.downvotes = answer.downvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Toggle upvote
    if (answer.upvotes.includes(req.user.id)) {
      answer.upvotes = answer.upvotes.filter(
        (userId) => userId.toString() !== req.user.id
      );
    } else {
      answer.upvotes.push(req.user.id);
    }

    await answer.save();
    res.status(200).json({ message: 'Upvote updated successfully.', upvotes: answer.upvotes.length, downvotes: answer.downvotes.length });
  } catch (err) {
    console.error('Error upvoting answer:', err);
    res.status(500).json({ message: 'Server error while upvoting answer.' });
  }
};

export const downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    // Remove user from upvotes if present
    answer.upvotes = answer.upvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Toggle downvote
    if (answer.downvotes.includes(req.user.id)) {
      answer.downvotes = answer.downvotes.filter(
        (userId) => userId.toString() !== req.user.id
      );
    } else {
      answer.downvotes.push(req.user.id);
    }

    await answer.save();
    res.status(200).json({ message: 'Downvote updated successfully.', upvotes: answer.upvotes.length, downvotes: answer.downvotes.length });
  } catch (err) {
    console.error('Error downvoting answer:', err);
    res.status(500).json({ message: 'Server error while downvoting answer.' });
  }
};
