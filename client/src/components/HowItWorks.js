import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mic, Brain, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: <Mic size={40} />,
      title: "Speak Freely",
      description:
        "Record voice notes about your relationships—what's going well, what's confusing, what's hurting. No judgment. Just your raw thoughts.",
    },
    {
      icon: <Brain size={40} />,
      title: "Get Instant Insight",
      description:
        "CLO processes your reflections and delivers personalized takeaways—patterns, blind spots, emotional flags, and even progress over time.",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Deepen Awareness",
      description:
        "The more you talk, the more CLO learns—helping you spot red flags, recognize your triggers, or just appreciate what's working.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
        delay: 0.3,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 0.1,
      },
    },
  };

  return (
    <section className="section how-it-works">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            💡 How It Works
          </motion.h2>
        </motion.div>

        <motion.div
          className="steps-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="step-card"
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div className="step-number" variants={numberVariants}>
                {index + 1}
              </motion.div>
              <motion.div
                className="step-icon"
                variants={iconVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
              >
                {step.icon}
              </motion.div>
              <motion.h3
                className="step-title"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="step-description"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
