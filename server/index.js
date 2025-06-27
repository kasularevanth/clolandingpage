const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const SEND_EMAILS = process.env.SEND_EMAILS !== "false"; // Default to true unless explicitly set to false
const APP_READY = process.env.APP_READY === "true"; // Default to false
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB setup
let db, emailsCollection, statusCollection;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    db = client.db();
    emailsCollection = db.collection("emails");
    statusCollection = db.collection("status");
    console.log("Connected to MongoDB successfully");
    return true;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    console.log(
      "Starting server without MongoDB - email collection will be disabled"
    );
    return false;
  }
}

// Start server with or without MongoDB
connectToMongoDB()
  .then((mongoConnected) => {
    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Email sending: ${
          SEND_EMAILS && mongoConnected ? "ENABLED" : "DISABLED"
        }`
      );
      console.log(`App ready: ${APP_READY ? "YES" : "NO"}`);

      if (mongoConnected) {
        console.log("Checking if app ready notification should be sent...");

        // Auto-notify all users if APP_READY is true and not already notified
        if (APP_READY && statusCollection) {
          const notified = await statusCollection.findOne({ _id: "notified" });
          if (!notified || notified.value !== true) {
            console.log("Triggering app ready notification for all users...");
            try {
              const emails = await emailsCollection.find({}).toArray();
              console.log(
                "Found emails:",
                emails.map((e) => e.email)
              );
              for (const { email } of emails) {
                console.log("Sending app ready email to:", email);
                await sendAppReadyEmail(email);
              }
              await statusCollection.updateOne(
                { _id: "notified" },
                { $set: { value: true, notifiedAt: new Date() } },
                { upsert: true }
              );
              console.log("All users notified automatically on APP_READY=true");
            } catch (error) {
              console.error("Failed to notify users automatically:", error);
            }
          } else {
            console.log(
              "Users have already been notified. Skipping notification."
            );
          }
        } else {
          console.log(
            "APP_READY is not true or statusCollection not ready. Skipping notification."
          );
        }
      }
    });
  })
  .catch((err) => {
    console.error("Critical error starting server:", err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Email collection endpoint
app.post("/api/collect-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    // Check if MongoDB is connected
    if (!emailsCollection) {
      console.log("MongoDB not connected - email collection disabled");
      return res.status(503).json({
        error:
          "Email collection temporarily unavailable. Please try again later.",
      });
    }

    // Check if email already exists
    const existing = await emailsCollection.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Add new email
    await emailsCollection.insertOne({ email, createdAt: new Date() });

    // Send welcome email only if enabled and MongoDB is connected
    if (SEND_EMAILS) {
      await sendWelcomeEmail(email);
    }

    res.json({
      success: true,
      message: SEND_EMAILS
        ? "Email collected successfully! Check your inbox for updates."
        : "Email collected successfully! We'll notify you when the beta is ready.",
    });
  } catch (error) {
    console.error("Error collecting email:", error);
    res.status(500).json({ error: "Failed to collect email" });
  }
});

// Email sending function
async function sendWelcomeEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to CLO Beta! 🎤",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1; text-align: center;">Welcome to CLO! 🎤</h1>
          <p>Hi there!</p>
          <p>Thank you for joining the CLO beta waitlist! We're excited to have you on board.</p>
          <p><strong>What's CLO?</strong></p>
          <p>CLO is your voice-first AI confidant, designed to help you reflect on your romantic and professional relationships. Just talk—and CLO listens, learns, and gives you actionable insights.</p>
          <p>We'll notify you as soon as the beta is ready. In the meantime, you can learn more at <a href="https://heyclo.com">heyclo.com</a></p>
          <p>Best regards,<br>The CLO Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

// Send "App is Ready" email to all users
async function sendAppReadyEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "CLO is Ready! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1; text-align: center;">CLO is Ready! 🎉</h1>
          <p>Hi there!</p>
          <p>We're excited to announce that CLO is now live and ready for you to use.</p>
          <p>Visit <a href="https://heyclo.com">heyclo.com</a> to get started and experience your voice-first AI confidant.</p>
          <p>Thank you for being an early supporter!</p>
          <p>Best regards,<br>The CLO Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("App ready email sent to:", email);
  } catch (error) {
    console.error("Error sending app ready email:", error);
  }
}

// Notify all users endpoint
app.post("/api/notify-all", async (req, res) => {
  if (!APP_READY) {
    return res
      .status(403)
      .json({ error: "APP_READY is not set to true in .env" });
  }

  // Check if MongoDB is connected
  if (!statusCollection || !emailsCollection) {
    return res.status(503).json({
      error: "Database not connected. Please try again later.",
    });
  }

  const notified = await statusCollection.findOne({ _id: "notified" });
  if (notified && notified.value === true) {
    return res.status(409).json({ error: "Users have already been notified." });
  }
  try {
    const emails = await emailsCollection.find({}).toArray();
    for (const { email } of emails) {
      await sendAppReadyEmail(email);
    }
    await statusCollection.updateOne(
      { _id: "notified" },
      { $set: { value: true, notifiedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true, message: "All users notified." });
  } catch (error) {
    res.status(500).json({ error: "Failed to notify users." });
  }
});

// Get all collected emails (admin endpoint)
app.get("/api/emails", async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!emailsCollection) {
      return res.status(503).json({
        error: "Database not connected. Please try again later.",
      });
    }

    const emails = await emailsCollection.find({}).toArray();
    res.json({ emails: emails.map((e) => e.email) });
  } catch (error) {
    res.status(500).json({ error: "Failed to read emails" });
  }
});
