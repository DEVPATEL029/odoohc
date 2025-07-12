const AnswerList = ({ answers }) => {
  return (
    <ul className="space-y-2">
      {answers.map((ans, index) => (
        <li
          key={index}
          className="border rounded p-2 flex justify-between items-center"
        >
          <span>{ans.text}</span>
          <button className="text-blue-600 hover:underline">▲ Upvote</button>
        </li>
      ))}
    </ul>
  );
};

export default AnswerList;