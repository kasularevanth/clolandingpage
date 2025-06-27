import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import WhyCLO from "./components/WhyCLO";
import UseCases from "./components/UseCases";
import CTA from "./components/CTA";
import EmailCollection from "./components/EmailCollection";
import "./App.css";
import "./components.css";

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="App">
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

      <Hero />
      <HowItWorks />
      <WhyCLO />
      <UseCases />
      <EmailCollection
        email={email}
        setEmail={setEmail}
        onSubmit={handleEmailSubmit}
        isSubmitting={isSubmitting}
      />
      <CTA />
    </div>
  );
}

export default App;
