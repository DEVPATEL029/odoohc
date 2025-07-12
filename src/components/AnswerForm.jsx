import { useState } from "react";

const AnswerForm = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AnswerForm;
