import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnswerForm = ({ onAddAnswer }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate(); // for redirecting to home

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddAnswer(text.trim());
    setText(""); // optional: clear the textarea
  };

  const handleCancel = () => {
    navigate("/"); // Go back to Home page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        rows="4"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Write your answer here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all"
        >
          Post Answer
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AnswerForm;
