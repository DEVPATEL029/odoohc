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

    const newQuestion = {
      title,
      description: desc,
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
    navigate("/"); // go back to home
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-5">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Ask a Question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Title
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
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
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Description
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              value={desc}
              onChange={setDesc}
              placeholder="Explain your question in detail..."
              theme="snow"
              className="custom-quill"
            />
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {desc.replace(/<[^>]*>/g, "").length} characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Tags
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
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
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Question
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestion;
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

    const newQuestion = {
      title,
      description: desc,
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
    navigate("/"); // go back to home
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-5">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Ask a Question</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Title
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
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
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Description
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <ReactQuill
              value={desc}
              onChange={setDesc}
              placeholder="Explain your question in detail..."
              theme="snow"
              className="custom-quill"
            />
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {desc.replace(/<[^>]*>/g, "").length} characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Tags
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
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
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Question
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestion;
