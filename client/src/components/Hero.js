import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Waitlist from "./Waitlist";
import WaitlistModal from "./WaitlistModal";
import Lottie from "lottie-react";
import voiceorb from "../assets/voiceorb.json";
import axios from "axios";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [waitlist, setWaitlist] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch waitlist on mount
  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const res = await axios.get("/api/emails");
      setWaitlist(res.data.emails || []);
    } catch (e) {
      setWaitlist([]);
    }
  };

  const handleJoin = async ({ fullName, email }) => {
    setIsSubmitting(true);
    setSuccessMsg("");
    try {
      await axios.post("/api/collect-email", { fullName, email });
      setSuccessMsg(
        "Welcome to the waitlist! Check your inbox for a welcome email."
      );
      setModalOpen(false);
      fetchWaitlist();
    } catch (e) {
      setSuccessMsg(
        e.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="hero-section">
      {/* Animated background elements */}
      <motion.div
        className="floating-orb-1"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: "50%",
          opacity: 0.1,
          zIndex: 1,
        }}
      />
      <motion.div
        className="floating-orb-2"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "40px",
          height: "40px",
          background: "linear-gradient(135deg, #f093fb, #f5576c)",
          borderRadius: "50%",
          opacity: 0.08,
          zIndex: 1,
        }}
      />
      <motion.div
        className="floating-orb-3"
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "50px",
          height: "50px",
          background: "linear-gradient(135deg, #4facfe, #00f2fe)",
          borderRadius: "50%",
          opacity: 0.06,
          zIndex: 1,
        }}
      />

      <div className="hero-content-wrapper">
        <div className="hero-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="hero-logo"
              style={{ marginBottom: "2.5rem" }}
            >
              <motion.img
                src="/assets/logo.svg"
                alt="CLO Logo"
                className="logo-image"
                variants={pulseVariants}
                animate="animate"
              />
            </motion.div>

            <motion.h1
              className="hero-headline"
              style={{ textAlign: "left" }}
              variants={textVariants}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ display: "inline-block" }}
              >
                Talk It Out.
              </motion.span>{" "}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ display: "inline-block" }}
              >
                Grow Closer.
              </motion.span>
            </motion.h1>

            <motion.p
              className="hero-subheadline"
              style={{ textAlign: "left" }}
              variants={textVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Your relationships, reimagined—through conversation and clarity.
            </motion.p>

            <motion.div
              style={{
                margin: "2.5rem 0 2rem 0",
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
              }}
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div
                style={{ width: 70, height: 70 }}
                variants={pulseVariants}
                animate="animate"
              >
                <Lottie animationData={voiceorb} loop autoplay />
              </motion.div>
              <motion.button
                className="cta-button"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={pulseVariants}
                animate="animate"
              >
                Join Waitlist
              </motion.button>
            </motion.div>

            {successMsg && (
              <motion.div
                style={{
                  color: successMsg.includes("Welcome") ? "#059669" : "#e11d48",
                  fontWeight: 500,
                  marginTop: 10,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {successMsg}
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Waitlist users={waitlist} />
        </motion.div>
      </div>

      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleJoin}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default Hero;
