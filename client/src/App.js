import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import "./App.css";
import "./components.css";

function App() {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Add this inner component to use useLocation
  function AppContent() {
    const location = useLocation();
    const hideNav = ["/faq", "/privacy"].includes(location.pathname);
    return (
      <motion.div
        className="App"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {!hideNav && <Navigation />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </motion.div>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
