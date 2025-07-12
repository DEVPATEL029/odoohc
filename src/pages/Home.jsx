import QuestionCard from "../components/QuestionCard";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Newest");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [pageCount, setPageCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    const updatePageCount = () => {
      const width = window.innerWidth;
      if (width < 500) setPageCount(3);
      else if (width < 768) setPageCount(5);
      else setPageCount(7);
    };
    updatePageCount();
    window.addEventListener("resize", updatePageCount);
    return () => window.removeEventListener("resize", updatePageCount);
  }, []);

  // Filter logic
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

  // Pagination
  const questionsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / questionsPerPage);
  const paginatedQuestions = filtered.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative mb-6 shadow bg-gradient-to-r from-indigo-500 to-purple-700">
        <div className="relative z-10 flex items-center justify-between w-full px-4 py-4">
          <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">StackIt</h1>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-white transition-all border border-white rounded-full hover:bg-white hover:text-indigo-600">
              Login
            </button>
            <button className="px-3 py-1 text-white transition-all border border-white rounded-full hover:bg-white hover:text-indigo-600">
              Signup
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/20 via-indigo-500/10 to-transparent pointer-events-none" />
      </header>

      {/* Filter + Search + Ask */}
      <div className="max-w-4xl px-4 mx-auto mb-6">
        <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
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
                <div className="absolute z-10 w-48 mt-1 bg-white border rounded shadow">
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
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded flex-1 min-w-[120px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Ask Button */}
          <Link to="/ask">
            <button className="px-4 py-2 text-white transition-all bg-indigo-600 rounded-full shadow hover:bg-indigo-700 whitespace-nowrap">
              Ask New Question
            </button>
          </Link>
        </div>
      </div>

      {/* Questions List */}
      <main className="max-w-4xl p-4 mx-auto">
        {/* Show how many questions */}
        <p className="mb-4 text-gray-600">
          Showing {filtered.length} of {questions.length} available question{questions.length !== 1 ? "s" : ""}
        </p>

        <div className="space-y-4">
          {paginatedQuestions.map((q, idx) => (
            <div className="relative" key={idx}>
              <QuestionCard id={(currentPage - 1) * questionsPerPage + idx + 1} {...q} />
              <div className="absolute px-2 py-1 text-sm bg-gray-100 rounded top-2 right-2">
                {(q.answers?.length || Math.floor(Math.random() * 6) + 1)} ans
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded hover:bg-gray-100 ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
