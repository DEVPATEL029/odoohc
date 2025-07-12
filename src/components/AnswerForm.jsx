import { useState } from "react";

const AnswerForm = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Answer cannot be empty!");
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="submit-form">
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer here..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AnswerForm;
