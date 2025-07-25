import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MobileScreensSVG from "../assets/mobile screens.svg";
import Step3ScreensSVG from "../assets/step3screens.svg";
import MenAvatar from "../assets/men.jpg";
import WomenAvatar from "../assets/women.jpg";
import LineSVG from "../assets/line.svg";
import Step1ScreenSVG from "../assets/step1screen.svg";

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 60 },
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
    <section
      className="section how-it-works"
      id="how-it-works"
      style={{
        position: "relative",
        background: "#100417",
        padding: "100px 0",
        zIndex: 1,
      }}
    >
      {/* Background ellipses and shapes */}
      <div
        style={{
          position: "absolute",
          width: "2046px",
          height: "729px",
          left: "calc(50% - 2046px/2 + 130px)",
          top: "200px",
          background: "rgba(55, 31, 107, 0.5)",
          opacity: 0.4,
          filter: "blur(151.688px)",
          zIndex: 0,
        }}
      />

      {/* Section Title */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          marginBottom: "80px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "36px",
            lineHeight: "54px",
            textAlign: "center",
            color: "#F3EDFF",
            margin: 0,
          }}
        >
          How it Works
        </h2>
        <img
          src={LineSVG}
          alt="decorative line"
          style={{
            width: "100%",
            maxWidth: 608,
            margin: "24px auto",
            display: "block",
          }}
        />
      </motion.div>

      {/* Steps Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Step Number 01 */}
        <div
          style={{
            position: "absolute",
            right: "0px",
            top: "50px",
            fontFamily: "DM Serif Text",
            fontWeight: 400,
            fontSize: "97.14px",
            lineHeight: "133px",
            color: "#FFFFFF",
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          01
        </div>

        {/* Step 1: Add Relationships */}
        <div
          className="step-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4rem",
            // marginBottom: "150px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left side content with animation */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ flex: 1, maxWidth: "600px" }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: "48px",
                color: "#fff",
                margin: "0 0 20px 0",
                textAlign: "left",
              }}
            >
              Add Relationships
            </h3>
            <p
              style={{
                fontFamily: "DM Sans",
                fontWeight: 200,
                fontSize: 24,
                lineHeight: "31px",
                color: "#fff",
                margin: 0,
                textAlign: "left",
              }}
            >
              Add and define relationships under romantic professional friends
              or family or even customize your own relationship, Upload chats or
              answer few questions to get quick insights
            </p>
          </motion.div>

          {/* Right side SVG with badges (step1screen.svg) */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{
              flex: "0 0 520px",
              position: "relative",
              height: "390px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Step1ScreenSVG}
              alt="Step 1 Screens"
              style={{
                width: 520,
                height: 390,
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "0 auto",
                zIndex: 2,
                position: "relative",
              }}
            />
          </motion.div>
        </div>

        {/* Step Number 02 */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "400px",
            fontFamily: "DM Serif Text",
            fontWeight: 400,
            fontSize: "97.14px",
            lineHeight: "133px",
            color: "#FFFFFF",
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          02
        </div>

        {/* Step 2: Speak Freely (Figma style) */}
        <div
          className="step-container speak-freely-figma"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "4rem",
            // marginBottom: "150px",
            position: "relative",
            zIndex: 2,
            minHeight: 500,
          }}
        >
          {/* Background Circles */}
          <div
            style={{
              position: "absolute",
              width: 680.86,
              height: 498.29,
              left: 0,
              top: 0,
              opacity: 0.15,
              transform: "rotate(-25.83deg)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 548.37,
                height: 440.46,
                left: 84.5,
                top: 105,
                background:
                  "linear-gradient(258.8deg, rgba(115, 0, 255, 0.8) 16.35%, rgba(255, 0, 132, 0.8) 77.56%)",
                filter: "blur(48.7px)",
                transform: "matrix(-0.79, -0.62, 0.89, -0.45, 0, 0)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 495.87,
                height: 285.13,
                left: 152.61,
                top: 183.35,
                background: "rgba(255, 255, 255, 0.35)",
                filter: "blur(48.7px)",
                transform: "matrix(-0.85, -0.52, 0.88, -0.47, 0, 0)",
                borderRadius: "50%",
              }}
            />
          </div>

          {/* Single phone SVG with left-to-right animation, no background circles */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              flex: "0 0 400px",
              position: "relative",
              height: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* 02 number overlay, styled like step 3
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                fontFamily: "DM Serif Text",
                fontWeight: 400,
                fontSize: "90px",
                lineHeight: "1",
                color: "#FFFFFF",
                opacity: 0.08,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              02
            </div> */}
            <img
              src={MobileScreensSVG}
              alt="Mobile Screens"
              style={{
                width: 400,
                height: 500,
                display: "block",
                margin: "0 auto",
                zIndex: 2,
                position: "relative",
              }}
            />
          </motion.div>

          {/* Text (right) */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{
              flex: 1,
              maxWidth: 600,
              minWidth: 300,
              zIndex: 2,
              marginLeft: 40,
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: "48px",
                color: "#fff",
                margin: "0 0 20px 0",
                textAlign: "left",
              }}
            >
              Speak Freely
            </h3>
            <p
              style={{
                fontFamily: "DM Sans",
                fontWeight: 200,
                fontSize: 24,
                lineHeight: "31px",
                color: "#fff",
                margin: 0,
                textAlign: "left",
              }}
            >
              Got something on your mind? Record voice notes about your
              relationships—what feels good, what feels off, and everything in
              between. No judgment. Just honesty.
            </p>
          </motion.div>
        </div>

        {/* Step 3: Get Instant Insight */}
        <div
          className="step-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4rem",
            position: "relative",
            zIndex: 2,
            // marginTop: "100px",
          }}
        >
          {/* Left side content with animation */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ flex: "1", maxWidth: "600px" }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "32px",
                lineHeight: "48px",
                color: "#ffffff",
                margin: "0 0 20px 0",
                textAlign: "left",
              }}
            >
              Get Instant Insight
            </h3>
            <p
              style={{
                fontFamily: "DM Sans",
                fontWeight: 200,
                fontSize: "24px",
                lineHeight: "31px",
                color: "#ffffff",
                margin: 0,
                textAlign: "left",
              }}
            >
              CLO turns your thoughts into a real-time clarity—spotting
              emotional flags, repeating patterns, blind spots, and even help
              your personal growth over time.
            </p>
          </motion.div>

          {/* Overlay the number 03 in the correct position */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{ flex: "0 0 600px", position: "relative", height: 350 }}
          >
            {/* 03 number overlay, styled as in the reference image */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                fontFamily: "DM Serif Text",
                fontWeight: 400,
                fontSize: "90px",
                lineHeight: "1",
                color: "#FFFFFF",
                opacity: 0.08,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              03
            </div>
            <img
              src={Step3ScreensSVG}
              alt="Step 3 Screens"
              style={{
                width: 600,
                height: 350,
                display: "block",
                margin: "0 auto",
                zIndex: 2,
                position: "relative",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
