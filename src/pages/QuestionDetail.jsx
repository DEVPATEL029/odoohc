import { useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList";
import AnswerForm from "../components/AnswerForm";

const dummyAnswers = [
  { text: "Use the CONCAT() function" },
  { text: "Try using the + operator" }
];

const QuestionDetail = () => {
  const { id } = useParams();

  const addAnswer = (answerText) => {
    dummyAnswers.push({ text: answerText });
    alert("Answer submitted (but not saved - use backend/localStorage)!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <nav className="mb-4 text-gray-600">
        <span>Home / Question {id}</span>
      </nav>
      <h2 className="text-xl font-semibold mb-2">
        How to join 2 columns in SQL?
      </h2>
      <p className="mb-4">
        I want to combine first and last name in SQL using CONCAT...
      </p>

      <h3 className="text-lg font-semibold mb-2">Answers:</h3>
      <AnswerList answers={dummyAnswers} />

      <h4 className="text-lg font-semibold mt-6">Submit Your Answer</h4>
      <AnswerForm onSubmit={addAnswer} />
    </div>
  );
};

export default QuestionDetail;
