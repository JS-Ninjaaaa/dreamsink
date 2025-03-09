import "./App.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoadingOverlay from "./components/loading/LoadingOverlay";
import { LoadingContext } from "./contexts/LoadingContext";
import MyDreamPage from "./pages/dreams/mine/MyDreamPage";
import PublicDreamPage from "./pages/dreams/public/PublicDreamPage";
import LoginPage from "./pages/login/LoginPage";
import OAuthLoginPage from "./pages/login/oauth/OAuthLoginPage";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <LoadingOverlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyDreamPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/oauth" element={<OAuthLoginPage />} />
          <Route path="/dreams/mine" element={<MyDreamPage />} />
          <Route path="/dreams/public" element={<PublicDreamPage />} />
        </Routes>
      </BrowserRouter>
    </LoadingContext.Provider>
  );
}

export default App;
