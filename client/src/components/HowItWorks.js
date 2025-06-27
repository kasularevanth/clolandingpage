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
          <h2 className="section-title">💡 How It Works</h2>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="step-card"
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
