import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import WhyCLO from "../components/WhyCLO";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function HomePage() {
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
        toast.error("Email already registered");
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(17, 4, 46, 0.95)",
            color: "#ffffff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(131, 73, 255, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <AnimatePresence>
        {isLoaded && (
          <>
            {/* Hero Section */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Hero />
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <HowItWorks />
            </motion.div>

            {/* Why CLO Section */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <WhyCLO />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <CTA
                email={email}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>

            {/* Footer */}
            <Footer />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default HomePage;
