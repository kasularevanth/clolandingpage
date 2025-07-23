import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LineSVG from "../assets/line.svg";

const CTA = ({ email, setEmail, onSubmit, isSubmitting }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="email-collection">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="email-collection-content"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2 className="email-title">
              Join our waiting List now to secure your spot
            </h2>
            <img
              src={LineSVG}
              alt="decorative line"
              style={{
                width: "100%",
                maxWidth: 608,
                margin: "1.5rem auto",
                display: "block",
              }}
            />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={onSubmit}
            className="email-form"
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
              className="email-input"
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="email-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {isSubmitting ? "Joining..." : "Join Waiting List"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
