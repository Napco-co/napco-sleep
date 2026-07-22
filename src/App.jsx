import Welcome from "./pages/Welcome";
import { useSleep } from "./context/SleepContext";
import { Navigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SleepCheck from "./pages/SleepCheck";
import Question from "./pages/Question";
import Loading from "./pages/Loading";
import Result from "./pages/Result";
import Recommendation from "./pages/Recommendation";
import Progress from "./pages/Progress";
import SleepAudio from "./pages/SleepAudio";
import NappiAI from "./pages/NappiAI";
import Profile from "./pages/Profile";

function App() {
  const { userName } = useSleep();
    return (
  <Routes>

    <Route
      path="/welcome"
      element={<Welcome />}
    />

    <Route
      path="/"
      element={
        userName
          ? <Home />
          : <Navigate to="/welcome" replace />
      }
    />

    <Route path="/sleep-check" element={<SleepCheck />} />

    <Route path="/question" element={<Question />} />

    <Route path="/loading" element={<Loading />} />

    <Route path="/result" element={<Result />} />

    <Route
      path="/recommendation"
      element={<Recommendation />}
    />

    <Route path="/progress" element={<Progress />} />

    <Route path="/audio" element={<SleepAudio />} />

    <Route path="/ai" element={<NappiAI />} />

    <Route path="/profile" element={<Profile />} />

  </Routes>
);
}

export default App;