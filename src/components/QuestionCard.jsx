import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ id, title, description, username, createdAt, tags = [] }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      <Link to={`/question/${id}`}>
        <h2 className="text-lg font-semibold text-indigo-700 hover:underline">{title}</h2>
      </Link>

      {/* Render description as HTML */}
      <div
        className="mt-1 text-sm text-gray-700"
        dangerouslySetInnerHTML={{
          __html:
            description.length > 200
              ? description.slice(0, 200) + "..."
              : description,
        }}
      ></div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Asked by <strong>{username}</strong> on{" "}
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default QuestionCard;
