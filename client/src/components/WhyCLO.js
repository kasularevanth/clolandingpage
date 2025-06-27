import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Zap, Target, Smile, MessageCircle, Users } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const features = [
  {
    icon: <Heart size={40} />, // Voice-first = Human-first
    title: "Voice-first = Human-first",
    description:
      "Typing is filtered. Talking is raw. CLO taps into your true tone and subtext to surface deeper insights.",
  },
  {
    icon: <Zap size={40} />, // Emotional Intelligence Meets AI
    title: "Emotional Intelligence Meets AI",
    description:
      "Powered by large language models trained for nuance, empathy, and relationship dynamics.",
  },
  {
    icon: <Target size={40} />, // Not Just Tracking—Transforming
    title: "Not Just Tracking—Transforming",
    description:
      "CLO doesn't just listen; it nudges growth. Expect thoughtful prompts, emotional trendlines, and perspective shifts.",
  },
  {
    icon: <Smile size={40} />, // Positive Feedback
    title: "Celebrate Progress",
    description:
      "CLO helps you recognize and celebrate your growth and positive relationship moments.",
  },
  {
    icon: <MessageCircle size={40} />, // Conversation
    title: "Conversational Insights",
    description:
      "Get actionable insights from your conversations, not just data points.",
  },
  {
    icon: <Users size={40} />, // Community
    title: "Built for Real Connections",
    description:
      "CLO is designed to help you connect better with yourself and others, every day.",
  },
];

const WhyCLO = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 600px)": { slides: { perView: 2, spacing: 24 } },
      "(min-width: 900px)": { slides: { perView: 3, spacing: 32 } },
    },
    renderMode: "performance",
    dragSpeed: 1.2,
    created(s) {
      setTimeout(() => s.moveToIdx(1), 500);
    },
    animation: { duration: 800, easing: (t) => t },
    autoplay: true,
  });

  React.useEffect(() => {
    let interval;
    if (sliderRef.current) {
      interval = setInterval(() => {
        sliderRef.current.next();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [sliderRef]);

  return (
    <section className="section why-clo">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">🧠 Why CLO?</h2>
          <div className="testimonial">
            <blockquote>
              "I didn't realize how much I was holding in—until CLO reflected it
              back."
            </blockquote>
          </div>
        </motion.div>
        <div ref={sliderRef} className="features-grid keen-slider">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card keen-slider__slide"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 32px rgba(37,99,235,0.12)",
              }}
            >
              <div className="feature-icon pulse-anim">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCLO;
