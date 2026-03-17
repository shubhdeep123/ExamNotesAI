import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./pages/Notes";
import History from "./pages/History";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Studio from "./pages/Studio";
import WIPFeature from "./pages/WIPFeature";
import Loader from "./components/Loader";
export const serverUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData, isLoading } = useSelector((state) => state.user);

  // Show loader while checking auth
  if (isLoading) {
    return <Loader/>;
  }

  console.log(userData);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/generate/notes"
          element={userData ? <Notes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/studio"
          element={userData ? <Studio /> : <Navigate to="/login" replace />}
        />
        <Route path="/generate/*" element={<WIPFeature />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
};

export default App;
