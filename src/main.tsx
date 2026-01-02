import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from "./pages/SignUp/SignUp";
import SignUpSubmitter from "./pages/SignUp/SignUpSubmitter";
import SignUpRater from "./pages/SignUp/SignUpRater";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup/submitter" element={<SignUpSubmitter />} />
      <Route path="/signup/rater" element={<SignUpRater />} />
    </Routes>
  </BrowserRouter>,
);
