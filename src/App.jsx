import { Routes, Route, Link } from "react-router-dom";
import FlipBook from "./FlipBook";
import "./index.css";

function Home() {
  return (
    <div>
      <h2>Select a Book</h2>

      <nav>
        <Link to="/book/math">
  Math Book
</Link>

<br />

<Link to="/book/sample">
  Sample Book
</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>My Library</h1>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/book/math"
          element={
            <FlipBook
              pdfUrl={import.meta.env.BASE_URL + "math.pdf"}
            />
          }
        />

        <Route
          path="/book/sample"
          element={
            <FlipBook
              pdfUrl={import.meta.env.BASE_URL + "sample.pdf"}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;