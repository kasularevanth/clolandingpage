import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import WhyCLO from "./components/WhyCLO";
import UseCases from "./components/UseCases";
import CTA from "./components/CTA";
// import EmailCollection from "./components/EmailCollection";
import "./App.css";
import "./components.css";

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger page load animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/collect-email", { email });

      if (response.data.success) {
        toast.success("Welcome to CLO! Check your inbox for updates.");
        setEmail("");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("This email is already registered!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="App"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            color: "#333",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <AnimatePresence>
        {isLoaded && (
          <>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Hero />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <HowItWorks />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <WhyCLO />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <UseCases />
            </motion.div>

            {/* <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <EmailCollection
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div> */}

            {/* <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <CTA />
            </motion.div> */}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
