import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage.jsx"// Make sure this path is correct
import HomePage from "./HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<h2>Welcome to Dashboard</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
