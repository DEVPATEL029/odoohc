const AnswerList = ({ answers, onUpvote, onDownvote }) => {
  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.id} className="answer-card">
          <div className="text-center">
            <button
              className="vote-btn"
              onClick={() => onUpvote(answer.id)}
              disabled={answer.upvoted}
            >
              ▲
            </button>
            <div>{answer.votes}</div>
            <button
              className="vote-btn"
              onClick={() => onDownvote(answer.id)}
              disabled={answer.downvoted}
            >
              ▼
            </button>
          </div>
          <div className="answer-text">{answer.text}</div>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
