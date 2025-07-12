import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/question/:id" element={<QuestionDetail />} />
    </Routes>
  );
}

export default App;
