// File: src/pages/Home.jsx
import QuestionCard from "../components/QuestionCard";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Newest");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreRef = useRef();

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(storedQuestions);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  let filtered = [...questions];
  if (activeFilter === "Unanswered") {
    filtered = filtered.filter((q) => !q.answers || q.answers.length === 0);
  } else if (activeFilter === "Most Answered") {
    filtered.sort((a, b) => (b.answers?.length || 0) - (a.answers?.length || 0));
  } else if (activeFilter === "Least Answered") {
    filtered.sort((a, b) => (a.answers?.length || 0) - (b.answers?.length || 0));
  } else if (activeFilter === "Oldest First") {
    filtered.sort((a, b) => a.timestamp - b.timestamp);
  } else if (activeFilter === "My Questions") {
    filtered = filtered.filter((q) => q.username === "Guest");
  }

  filtered = filtered.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">StackIt</h1>
        <div className="flex items-center gap-2">
          <Link to="/ask">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ask New Question
            </button>
          </Link>
          <button className="px-3 py-1 border rounded">Login</button>
        </div>
      </header>

      <div className="flex gap-2 flex-wrap mb-4 relative">
        <button
          onClick={() => {
            setActiveFilter("Newest");
            setShowMoreOptions(false);
          }}
          className={`px-2 py-1 border rounded ${
            activeFilter === "Newest" ? "bg-blue-100 border-blue-500 text-blue-700" : ""
          }`}
        >
          Newest
        </button>
        <button
          onClick={() => {
            setActiveFilter("Unanswered");
            setShowMoreOptions(false);
          }}
          className={`px-2 py-1 border rounded ${
            activeFilter === "Unanswered" ? "bg-blue-100 border-blue-500 text-blue-700" : ""
          }`}
        >
          Unanswered
        </button>

        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className={`px-2 py-1 border rounded ${
              ["Most Answered", "Least Answered", "Oldest First", "My Questions"].includes(activeFilter)
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : ""
            }`}
          >
            More ▾
          </button>
          {showMoreOptions && (
            <div className="absolute z-10 bg-white border rounded shadow w-48 mt-1">
              {["Most Answered", "Least Answered", "Oldest First", "My Questions"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveFilter(option);
                    setShowMoreOptions(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                    activeFilter === option ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search"
          className="border px-2 py-1 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div className="relative" key={idx}>
            <QuestionCard id={idx + 1} {...q} />
            <div className="absolute top-2 right-2 bg-gray-100 text-sm px-2 py-1 rounded">
              {(q.answers?.length || Math.floor(Math.random() * 6) + 1)} ans
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center gap-2 text-sm">
        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
          <button
            key={page}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;