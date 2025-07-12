import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AnswerList from "../components/AnswerList";
import AnswerForm from "../components/AnswerForm";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const found = storedQuestions[parseInt(id) - 1]; // ID assumed to be 1-indexed
    if (found) {
      setQuestion(found);
      setAnswers(found.answers || []);
    }
  }, [id]);

  const handleAddAnswer = (text) => {
    const updatedAnswer = {
      text,
      timestamp: Date.now(),
      username: "Guest",
    };

    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    const index = parseInt(id) - 1;
    if (storedQuestions[index]) {
      storedQuestions[index].answers = [...(storedQuestions[index].answers || []), updatedAnswer];
      localStorage.setItem("questions", JSON.stringify(storedQuestions));
      setAnswers(storedQuestions[index].answers);
    }
  };

  if (!question) {
    return <div className="p-4 text-lg text-center text-gray-500">⚠️ Question not found.</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        {/* Question Title */}
        <h1 className="mb-2 text-2xl font-bold text-indigo-700">{question.title}</h1>

        {/* Question Description */}
        <p className="mb-4 text-gray-700 whitespace-pre-line">{question.description}</p>

        {/* Tags */}
        {question.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 text-xs text-indigo-700 bg-indigo-100 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr className="my-6" />

        {/* Answers */}
        <div>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">
            Answers ({answers.length})
          </h2>
          <AnswerList answers={answers} />
        </div>

        <hr className="my-6" />

        {/* Add New Answer */}
        <div>
          <h2 className="mb-2 text-lg font-medium text-gray-800">Your Answer</h2>
          <AnswerForm onAddAnswer={handleAddAnswer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
