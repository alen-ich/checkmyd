import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import SignUp from "./pages/SignUp/SignUp";
import SignUpSubmitter from "./pages/SignUp/SignUpSubmitter";
import SignUpRater from "./pages/SignUp/SignUpRater";
import Raters from "./pages/Raters/Raters";
import UploadPhoto from "./pages/Upload/UploadPhoto";
import Dashboard from "./pages/Dashboard/Dashboard";
import RaterProfile from "./pages/RaterProfile/RaterProfile";
import SubmitterProfile from "./pages/SubmitterProfile/SubmitterProfile";
import ViewUploads from "./pages/ViewUploads/ViewUploads";
import UploadDetails from "./pages/UploadDetails/UploadDetails";
import Notifications from "./pages/Notifications/Notifications";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";
import RaterView from "./pages/RaterView/RaterView";
import RaterUploadDetails from "./pages/RaterUploadDetails/RaterUploadDetails";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/submitter" element={<SignUpSubmitter />} />
      <Route path="/signup/rater" element={<SignUpRater />} />
      <Route path="/raters" element={<Raters />} />
      <Route path="/upload" element={<UploadPhoto />} />
      <Route path="/stats" element={<Dashboard />} />
      <Route path="/rater-profile" element={<RaterProfile />} />
      <Route path="/submitter-profile" element={<SubmitterProfile />} />
      <Route path="/view-uploads" element={<ViewUploads />} />
      <Route path="/upload-details/:id" element={<UploadDetails />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/rater-view" element={<RaterView />} />
      <Route path="/rater-upload-details/:id" element={<RaterUploadDetails />} />
    </Routes>
  </BrowserRouter>,
);
