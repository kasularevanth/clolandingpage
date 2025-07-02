import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Send } from "lucide-react";

const EmailCollection = ({ email, setEmail, onSubmit, isSubmitting }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section email-collection">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="email-collection-content"
        >
          <div className="email-header">
            <Mail size={48} className="email-icon" />
            <h2 className="email-title">🧠 Try CLO – Free Beta Now</h2>
            <p className="email-description">
              Join the waitlist and be among the first to experience CLO when we
              launch.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={onSubmit}
            className="email-form"
          >
            <div className="form-group">
              {/* The following UI is commented out as it's no longer needed:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="email-input"
                required
              />
              */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Join Beta</span>
                  </>
                )}
              </button>
            </div>

            <p className="form-note">
              We'll notify you as soon as the beta is ready. No spam, just
              updates.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailCollection;
