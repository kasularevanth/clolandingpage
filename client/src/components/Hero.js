import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitlistModal from "./WaitlistModal";
import axios from "axios";
import Lottie from "lottie-react";
import voiceorb from "../assets/voiceorb.json";
import LineSVG from "../assets/line.svg";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleJoin = async ({ fullName, email }) => {
    setIsSubmitting(true);
    setSuccessMsg("");
    try {
      await axios.post("/api/collect-email", { fullName, email });
      setSuccessMsg("Welcome to CLO! Check your inbox for a welcome email.");
      setModalOpen(false);
    } catch (e) {
      setSuccessMsg(
        e.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="hero-section"
      id="home"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#100417",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "0px",
        paddingBottom: "0px",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #100417 0%, #2D1B4E 50%, #4A2C6B 100%)",
          zIndex: 0,
        }}
      />

      {/* Hero Content Container */}
      <div
        className="hero-content-flex hero-figma-layout"
        style={{
          position: "relative",
          width: "100vw",
          maxWidth: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "0px",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        {/* Left Content */}
        <motion.div
          className="hero-left-figma"
          initial={{ x: -120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: "50px",
            position: "absolute",
            width: 525,
            height: 357,
            left: 100,
            top: 170, // Add more space below navbar
            zIndex: 2,
          }}
        >
          {/* Top Text and Line */}
          <div
            style={{
              width: 222,
              height: 45,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 17,
            }}
          >
            <div
              style={{
                width: 222,
                height: 27,
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: "27px",
                letterSpacing: "-0.16px",
                color: "rgba(255,255,255,0.8)",
                textAlign: "left",
              }}
            >
              Talk It Out.{" "}
              <span style={{ fontWeight: 500, fontStyle: "italic" }}>
                Grow Closer
              </span>
            </div>
            <img
              src={LineSVG}
              alt="decorative line"
              style={{
                width: "100%",
                maxWidth: 222,
                marginTop: 8,
                display: "block",
              }}
            />
          </div>

          {/* Main Headline */}
          <div style={{ width: 525, height: 153, textAlign: "left" }}>
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 34,
                lineHeight: "51px",
                color: "#fff",
                letterSpacing: 0,
              }}
            >
              Your relationships
            </span>
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 34,
                lineHeight: "51px",
                color: "#fff",
                letterSpacing: 0,
              }}
            >
              ,{" "}
            </span>
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 34,
                lineHeight: "51px",
                color: "#8349ff",
                letterSpacing: 0,
              }}
            >
              reimagined
            </span>
            <span
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 34,
                lineHeight: "51px",
                color: "#fff",
                letterSpacing: 0,
              }}
            >
              —<br />
              through conversation
              <br />
              and clarity.
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "10px 30px",
              gap: "10px",
              width: 232,
              height: 59,
              background:
                "linear-gradient(110.12deg, #1E2ADC -6.17%, #91187F 45.94%, #8434F1 105.76%)",
              borderRadius: 50,
              border: "none",
              color: "#F5F5F5",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "30px",
              letterSpacing: "-0.175532px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(131, 73, 255, 0.3)",
              marginTop: 20,
            }}
          >
            Join Beta Testing
          </button>
        </motion.div>

        {/* Centered Voice Orb */}
        <div
          className="hero-orb-center-figma"
          style={{
            position: "absolute",
            left: 600,
            top: 120,
            width: 400,
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Lottie
            animationData={voiceorb}
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              filter: "drop-shadow(0 0 50px rgba(131, 73, 255, 0.3))",
            }}
          />
        </div>
      </div>

      {/* Bottom Right Text */}
      <motion.div
        className="hero-bottom-right-figma"
        initial={{ x: 120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        style={{
          position: "absolute",
          width: 402,
          height: 142,
          right: 100,
          top: 500,
          zIndex: 2,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "140%",
            letterSpacing: "-0.17px",
            color: "#8349ff",
          }}
        >
          CLO
        </span>
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: 20,
            lineHeight: "140%",
            letterSpacing: "-0.17px",
            color: "#fff",
          }}
        >
          {" "}
          is your voice-first AI confidant. Just speak—
        </span>
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "140%",
            letterSpacing: "-0.17px",
            color: "#fff",
          }}
        >
          CLO listens, understands, & reflects back powerful insights
        </span>
        <span
          style={{
            fontFamily: "Poppins",
            fontWeight: 300,
            fontSize: 20,
            lineHeight: "140%",
            letterSpacing: "-0.17px",
            color: "#fff",
          }}
        >
          {" "}
          to help you navigate your relationships with more self-awareness
        </span>
      </motion.div>

      {/* Success Message */}
      {successMsg && (
        <motion.div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: successMsg.includes("Welcome")
              ? "rgba(16, 185, 129, 0.9)"
              : "rgba(239, 68, 68, 0.9)",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            fontFamily: "Poppins",
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {successMsg}
        </motion.div>
      )}

      {modalOpen && (
        <WaitlistModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleJoin}
          isSubmitting={isSubmitting}
        />
      )}
    </section>
  );
};

export default Hero;
