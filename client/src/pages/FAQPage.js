import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FAQPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeQuestion, setActiveQuestion] = useState(0);

  // Auto-scroll to FAQ heading when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "What is CLO AI?",
      answer:
        "CLO AI is your voice-first relationship assistant that helps you better understand your personal and professional relationships through voice recordings, emotional insights, and pattern detection.",
    },
    {
      question: "How does CLO AI work?",
      answer:
        "You record voice notes or upload chats. CLO listens, processes emotional and conversational patterns, and gives you real-time insights about your relationships—like emotional imbalances, red flags, and topic diversity.",
    },
    {
      question: "Do I have to speak out loud or can I type?",
      answer:
        "CLO is optimized for voice input to capture tone and emotion, but in future versions, you may be able to type or upload written chats.",
    },
    {
      question: "What types of relationships can I track?",
      answer:
        "You can add romantic partners, friends, family, or even professional relationships. CLO tailors its insights to the type of relationship you define.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "Yes, your voice notes and personal data are encrypted and stored securely. CLO AI does not sell your data to third parties.",
    },
    {
      question: "What kind of insights will I get?",
      answer:
        "You'll get insights about emotional patterns, communication styles, red flags, topic diversity, and relationship health metrics.",
    },
    {
      question: "How can I join CLO AI?",
      answer:
        "You can join our beta program by signing up through the registration form on our website.",
    },
    {
      question: "Is CLO AI a therapy or counseling?",
      answer:
        "CLO AI is not a replacement for therapy or professional counseling. It's a tool for self-reflection and relationship insights.",
    },
    {
      question: "Gotta add the person to analyze?",
      answer:
        "No, you don't need to add the other person. CLO analyzes your voice notes and reflections about your relationships.",
    },
  ];

  const handleQuestionClick = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div
      className="faq-page"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "40px 20px",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
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
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255, 255, 255, 0.8)")
                }
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
          className="faq-header"
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
              marginBottom: "20px",
                textAlign: "left",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Frequently Asked Questions
            </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              Want to know more about the app features?
            </p>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: "8px 0 0 0",
              }}
            >
              Get detailed product information in{" "}
              <Link
                to="/"
                style={{
                  color: "#ffffff",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                How it works
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          className="faq-content"
          style={{
            display: "flex",
            gap: "60px",
            alignItems: "flex-start",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Questions List */}
          <motion.div
            className="faq-questions"
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              position: "relative",
            }}
          >
            {/* Active indicator line */}
            <motion.div
              style={{
                position: "absolute",
                left: "-12px",
                top: `${activeQuestion * 60}px`,
                width: "4px",
                height: "60px",
                background: "#FFFFFF",
                borderRadius: "2px",
                transition: "top 0.3s ease",
              }}
            />

            {/* Inactive indicator line */}
            <div
              style={{
                position: "absolute",
                left: "-12px",
                top: "0px",
                width: "4px",
                height: `${faqs.length * 60}px`,
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "2px",
              }}
            />

            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                onClick={() => handleQuestionClick(index)}
                style={{
                  padding: "16px 24px",
                  cursor: "pointer",
                  color:
                    index === activeQuestion
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "18px",
                  fontWeight: index === activeQuestion ? 600 : 400,
                  fontFamily: "DM Sans, sans-serif",
                  lineHeight: "1.4",
                  transition: "all 0.3s ease",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
                whileHover={{
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {faq.question}
              </motion.div>
            ))}
          </motion.div>

          {/* Answers */}
          <motion.div
            className="faq-answers"
            style={{
              flex: 1,
              maxWidth: "700px",
            }}
          >
            <motion.div
              key={activeQuestion}
              style={{
                background:
                  "linear-gradient(135deg, rgba(125, 68, 245, 0.3) 0%, rgba(255, 31, 162, 0.3) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "16px",
                padding: "32px",
                minHeight: "200px",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#ffffff",
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: "20px",
                }}
              >
                {activeQuestion + 1}. {faqs[activeQuestion].question}
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.9)",
                  fontFamily: "DM Sans, sans-serif",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {faqs[activeQuestion].answer}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Responsive Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .faq-content {
              flex-direction: column !important;
              gap: 40px !important;
            }

            .faq-questions {
              width: 100% !important;
            }

            .faq-answers {
              max-width: 100% !important;
            }

            h1 {
              font-size: 2.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FAQPage;
