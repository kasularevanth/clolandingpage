import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section cta-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="cta-content"
        >
          <h2 className="cta-title">Ready to Transform Your Relationships?</h2>
          <p className="cta-description">
            Start your journey with CLO today and discover deeper connections
            through conversation.
          </p>

          <motion.a
            href="https://heyclo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Visit heyclo.com</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
