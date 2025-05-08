import "./tailwind.css";
import Home from "./Pages/home";
import Exercises from "./Pages/exercises";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  // Oprava názvu stavu a výchozí hodnoty

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercises" element={<Exercises />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}
