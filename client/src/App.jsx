import React, { use, useEffect } from "react";
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
export const serverUrl = "https://examnotesaiserver-0u6p.onrender.com/api";
// export const serverUrl = "http://localhost:8000/api";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
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
          path="/notes"
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
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
};

export default App;
