import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LineSVG from "../assets/line.svg";

const WhyCLO = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      title: "Real Insights That Shift Perspective",
      description:
        "You'll hear yourself more clearly—with space to reflect, process, and find what's really going on beneath the surface.",
      size: "small",
    },
    {
      title: "Built to Understand Human Emotions",
      description:
        "Trained in the dynamics of human relationships, it captures the nuances of words, pauses, and emotional undertones, interpreting communication with precision.",
      size: "large",
    },
    {
      title: "Gentle Nudges That Drive Growth",
      description:
        "From subtle patterns to profound realizations, this app empowers you to navigate your journey with enhanced self-awareness and emotional ease. It offers tools and insights that encourage personal growth, helping you to reflect on your experiences and make meaningful progress in your life.",
      size: "full",
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section why-clo" id="why-clo">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="section-header"
        >
          <motion.h2
            className="why-clo-title"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
          >
            Why CLO AI
          </motion.h2>

          <motion.img
            src={LineSVG}
            alt="decorative line"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{
              width: "100%",
              maxWidth: 608,
              margin: "24px auto",
              display: "block",
              position: "relative",
              zIndex: 2,
            }}
          />

          <motion.p
            className="why-clo-description"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          >
            CLO helps you uncover what you're really feeling—by reflecting your
            voice, tone, and emotional patterns back to you in ways you never
            expected. It's clarity, without overthinking.
          </motion.p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="feature-card"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "17px",
                  width: "100%",
                  height: "116px",
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <motion.h3
                  className="feature-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  style={{ textAlign: "left", fontWeight: 400 }}
                >
                  {(() => {
                    if (feature.title.includes("That Shift Perspective")) {
                      return (
                        <>
                          <span style={{ fontStyle: "italic" }}>
                            Real Insights{" "}
                          </span>
                          <span
                            style={{ fontWeight: 700, fontStyle: "italic" }}
                          >
                            That Shift Perspective
                          </span>
                        </>
                      );
                    }
                    if (feature.title.includes("Drive Growth")) {
                      return (
                        <>
                          <span style={{ fontStyle: "italic" }}>
                            Gentle Nudges That{" "}
                          </span>
                          <span
                            style={{ fontWeight: 700, fontStyle: "italic" }}
                          >
                            Drive Growth
                          </span>
                        </>
                      );
                    }
                    if (feature.title.includes("Human Emotions")) {
                      return (
                        <>
                          <span style={{ fontStyle: "italic" }}>
                            Built to Understand{" "}
                          </span>
                          <span
                            style={{ fontWeight: 700, fontStyle: "italic" }}
                          >
                            Human Emotions
                          </span>
                        </>
                      );
                    }
                    return feature.title;
                  })()}
                </motion.h3>
                <motion.p
                  className="feature-description"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  style={{ textAlign: "left" }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCLO;
