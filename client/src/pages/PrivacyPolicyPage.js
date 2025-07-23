import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicyPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-page" style={{ 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%)",
      padding: "40px 20px"
    }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <Link 
            to="/" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.8)",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 500,
              transition: "color 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.color = "#ffffff"}
            onMouseLeave={(e) => e.target.style.color = "rgba(255, 255, 255, 0.8)"}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="privacy-header"
          style={{ marginBottom: "60px" }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "left",
              marginBottom: "0",
            }}
          >
            Privacy Policy
          </motion.h1>
        </motion.div>

        {/* Privacy Content */}
        <motion.div
          className="privacy-content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: "rgba(131, 73, 255, 0.14)",
            borderRadius: "16px",
            padding: "48px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "DM Sans, sans-serif",
              lineHeight: "1.7",
              maxWidth: "100%",
              textAlign: "left",
            }}
          >
            <p style={{ marginBottom: "32px", fontSize: "20px", lineHeight: "1.6" }}>
              At CLO AI, your privacy and emotional safety matter. This Privacy Policy outlines how we collect, use, and protect your information when you use our app.
            </p>

            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: 600, 
                color: "#ffffff", 
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif"
              }}>
                1. Information We Collect
              </h3>
              <p style={{ marginBottom: "16px" }}>We may collect the following types of data:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#ffffff" }}>Voice Recordings:</strong> You may upload or record voice notes within the app for analysis.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#ffffff" }}>Usage Data:</strong> Information about how you use the app (e.g., interaction time, features used).
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#ffffff" }}>Device Info:</strong> Type of device, OS, and general system info for app performance.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#ffffff" }}>Optional Inputs:</strong> Relationship type, names (optional), or tags you may use
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: 600, 
                color: "#ffffff", 
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif"
              }}>
                2. How We Use Your Data
              </h3>
              <p style={{ marginBottom: "16px" }}>We use your data to:</p>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "12px" }}>
                  Provide you with emotional insights and relationship intelligence.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Improve the quality of our AI models and user experience.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Customize insights based on your interaction history.
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: 600, 
                color: "#ffffff", 
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif"
              }}>
                3. Data Privacy & Security
              </h3>
              <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "12px" }}>
                  Your voice notes and personal data are encrypted and stored securely.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  CLO AI does not sell your data to third parties.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  Data is anonymized for internal analysis and model training when applicable.
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{ 
                fontSize: "24px", 
                fontWeight: 600, 
                color: "#ffffff", 
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif"
              }}>
                4. Your Control
              </h3>
              <ul style={{ paddingLeft: "24px" }}>
                <li style={{ marginBottom: "12px" }}>
                  You can delete your recordings and insights at any time.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  You may request a full data deletion by emailing us at{" "}
                  <a 
                    href="mailto:privacy@cloai.app" 
                    style={{ 
                      color: "#ffffff", 
                      textDecoration: "underline" 
                    }}
                  >
                    privacy@cloai.app
                  </a>.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  You are not required to submit identifiable information to use CLO AI.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Responsive Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .privacy-content {
              padding: 32px 24px !important;
            }
            
            h1 {
              font-size: 2.5rem !important;
            }
            
            h3 {
              font-size: 20px !important;
            }
            
            .privacy-content div {
              font-size: 16px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;