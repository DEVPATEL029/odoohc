import { Link } from "react-router-dom";

const QuestionCard = ({ id, title, description, username }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold text-blue-600">
        <Link to={`/question/${id}`}>{title}</Link>
      </h3>
      <p className="text-gray-700">{description}</p>
      <small className="text-gray-500">Asked by {username}</small>
    </div>
  );
};

export default QuestionCard;
