import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTags = (e) => {
    setTagsInput(e.target.value);
    const newTags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setTags(newTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim() || tags.length === 0) {
      setError("All fields are required.");
      return;
    }

    const plainDesc = desc.replace(/<[^>]*>/g, "").trim(); // Strip HTML tags

    const newQuestion = {
      title,
      description: plainDesc,
      tags,
      username: "Guest",
      createdAt: new Date().toISOString(),
    };

    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.unshift(newQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mb-5 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-xl font-bold text-gray-800">Ask a Question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <div className="overflow-hidden border border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="What do you want to ask?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <div className="overflow-hidden border border-gray-300 rounded-lg">
            <ReactQuill
              value={desc}
              onChange={setDesc}
              placeholder="Explain your question in detail..."
              theme="snow"
              className="custom-quill"
            />
          </div>
          <p className="mt-1 text-xs text-right text-gray-500">
            {desc.replace(/<[^>]*>/g, "").length} characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Tags</label>
          <div className="overflow-hidden border border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="e.g. react, css, javascript"
              value={tagsInput}
              onChange={handleTags}
              className="w-full p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit Question
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-800 transition bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestion;
