import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import voiceorb from "../assets/voiceorb.json";
import toast from "react-hot-toast";

const WaitlistModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Reset fields when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setEmail("");
      setError("");
    }
  }, [isOpen]);

  const validate = () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return false;
    }
    if (/\d/.test(fullName)) {
      setError("Name cannot contain numbers.");
      return false;
    }
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please fill in both fields.", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    try {
      await onSubmit({ fullName: fullName.trim(), email: email.trim() });
      // Close modal immediately after submit
      onClose();
    } catch (err) {
      // Show backend error as toast on right
      toast.error(err?.message || "Something went wrong.", {
        duration: 2000,
        position: "top-right",
      });
      // Modal is already closed
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const lottieVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "backOut" },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              variants={itemVariants}
            >
              &times;
            </motion.button>

            <motion.div className="modal-voiceorb" variants={lottieVariants}>
              <Lottie
                animationData={voiceorb}
                loop
                autoplay
                style={{ width: 80, height: 80 }}
              />
            </motion.div>

            <motion.h2 className="modal-title" variants={itemVariants}>
              Join Waitlist
            </motion.h2>

            <motion.form
              className="modal-form"
              onSubmit={handleSubmit}
              variants={itemVariants}
            >
              <motion.label variants={itemVariants} whileHover={{ x: 5 }}>
                Full Name
                <motion.input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.label>

              <motion.label variants={itemVariants} whileHover={{ x: 5 }}>
                Email Address
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.label>

              {/* Remove fixed error message, show only toast */}

              <motion.button
                type="submit"
                className="modal-submit"
                disabled={isSubmitting || !fullName.trim() || !email.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
