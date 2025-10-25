// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import Request from "./pages/Request";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-poppins">
        <Navbar />

        <main className="grow mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/request" element={<Request />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
