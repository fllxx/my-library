import { Routes, Route, Link } from "react-router-dom";
import FlipBook from "./FlipBook";
import "./index.css";
function App() {
  return (
    <div>
      <h1>My Library</h1>

      {/* Links to books 
      <nav>
        <Link to="/book/math">Math Book</Link> |{" "}
        <Link to="/book/science">Science Book</Link> |{" "}
        <Link to="/book/sample">sample Book</Link>
      </nav>
*/}
      {/* Routes */}
      <Routes>
        <Route path="/book/math" element={<FlipBook pdfUrl="/math.pdf" />} />
        <Route path="/book/science" element={<FlipBook pdfUrl="/sample.pdf" />} />
        <Route path="/book/sample" element={<FlipBook pdfUrl="/sample.pdf" />} />
      </Routes>
    </div>
  );
}

export default App;