import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, MessageCircle, Heart, Shield, Star } from "lucide-react";

const UseCases = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const useCases = [
    {
      icon: <Users size={32} />,
      title: "Navigating a complex romantic relationship",
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Venting after a tough team meeting",
    },
    {
      icon: <Heart size={32} />,
      title: "Processing a breakup or betrayal",
    },
    {
      icon: <Star size={32} />,
      title: "Celebrating progress with a partner",
    },
    {
      icon: <Shield size={32} />,
      title: "Rebuilding trust—with yourself or someone else",
    },
  ];

  return (
    <section className="section use-cases">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">🔍 Use CLO For…</h2>
        </motion.div>

        <div className="use-cases-grid">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="use-case-card"
            >
              <div className="use-case-icon">{useCase.icon}</div>
              <p className="use-case-text">{useCase.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="therapy-note"
        >
          <h3>📈 It's Like Therapy Meets Journaling—With a Smart Mirror</h3>
          <p>
            CLO isn't a replacement for therapy. It's a daily companion for
            emotional reflection, perfect for the moments between.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
