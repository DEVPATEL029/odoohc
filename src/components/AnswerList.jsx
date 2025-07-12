const AnswerList = ({ answers }) => {
  return (
    <div className="space-y-4">
      {answers.length === 0 && (
        <p className="text-sm text-gray-500">No answers yet. Be the first to answer!</p>
      )}
      {answers.map((ans, index) => (
        <div key={index} className="p-4 border rounded-md bg-gray-50">
          <p className="text-gray-800">{ans.text}</p>
          <p className="mt-1 text-sm text-gray-500">
            — {ans.username} • {new Date(ans.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
