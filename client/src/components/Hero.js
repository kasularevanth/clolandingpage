import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import Lottie from "lottie-react";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="voice-orb-container">
          <Lottie
            animationData={require("../assets/voiceorb.json")}
            className="voice-orb-image"
            loop
            autoplay
          />
        </div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hero-logo"
          >
            <img src="/assets/logo.svg" alt="CLO Logo" className="logo-image" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-headline"
          >
            Talk It Out. <span className="gradient-text">Grow Closer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subheadline"
          >
            Your relationships, reimagined—through conversation and clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-description"
          >
            CLO is your voice-first AI confidant, designed to help you reflect
            on your romantic and professional relationships. Just talk—and CLO
            listens, learns, and gives you actionable insights that deepen your
            self-awareness and connection.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-cta"
          >
            <a
              href="https://heyclo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <Mic size={24} />
              <span>Start Talking with CLO</span>
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
