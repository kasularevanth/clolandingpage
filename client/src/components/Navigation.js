import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import WaitlistModal from "./WaitlistModal";
import axios from "axios";
import Asset2 from "../assets/Asset 2.svg";
import toast from "react-hot-toast";

const Navigation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleJoin = async ({ fullName, email }) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/collect-email", { fullName, email });
      setModalOpen(false);
      toast.success("Welcome to CLO! Check your inbox for a welcome email.", {
        duration: 4000,
        position: "top-center",
      });
    } catch (e) {
      setModalOpen(false);
      toast.error(
        e.response?.data?.error || "Something went wrong. Try again.",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 16,
          width: "100vw",
          zIndex: 1000,
        }}
      >
        <motion.nav
          className="navbar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={Asset2}
              alt="CLO AI Logo"
              style={{ width: 23, height: 23 }}
            />
            <span>CLO AI</span>
            <motion.div
              className="beta-badge"
              whileHover={{ scale: 1.1 }}
              style={{
                padding: "10px 20px",
                borderRadius: "46.78px",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "-0.16px",
                marginLeft: "18px",
              }}
            >
              Beta version
            </motion.div>
          </motion.div>

          <div className="navbar-center">
            <ul className="navbar-nav">
              <li>
                {isHomePage ? (
                  <a href="#home" onClick={() => scrollToSection("home")}>
                    Home
                  </a>
                ) : (
                  <Link to="/">Home</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a
                    href="#how-it-works"
                    onClick={() => scrollToSection("how-it-works")}
                  >
                    How it Works
                  </a>
                ) : (
                  <Link to="/">How it Works</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#why-clo" onClick={() => scrollToSection("why-clo")}>
                    Why CLO AI
                  </a>
                ) : (
                  <Link to="/">Why CLO AI</Link>
                )}
              </li>
            </ul>
          </div>

          <motion.button
            className="navbar-register"
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Register
          </motion.button>
        </motion.nav>
      </div>

      {/* Remove the top banner popup and fixed success message */}
      {/* Only WaitlistModal remains for registration */}
      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleJoin}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default Navigation;
