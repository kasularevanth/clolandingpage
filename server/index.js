const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const SEND_EMAILS = process.env.SEND_EMAILS !== "false"; // Default to true unless explicitly set to false
const APP_READY = process.env.APP_READY === "true"; // Default to false
const MONGODB_URI = process.env.MONGODB_URI;

// File-based fallback storage
const EMAILS_FILE = path.join(__dirname, "emails.json");
const STATUS_FILE = path.join(__dirname, "status.json");

function loadEmails() {
  try {
    if (fs.existsSync(EMAILS_FILE)) {
      const data = fs.readFileSync(EMAILS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading emails from file:", error);
  }
  return [];
}

function saveEmails(emails) {
  try {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
  } catch (error) {
    console.error("Error saving emails to file:", error);
  }
}

function loadStatus() {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      const data = fs.readFileSync(STATUS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading status from file:", error);
  }
  return { notified: false };
}

function saveStatus(status) {
  try {
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
  } catch (error) {
    console.error("Error saving status to file:", error);
  }
}

// MongoDB setup
let db, emailsCollection, statusCollection;

async function connectToMongoDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URI exists:", !!MONGODB_URI);
    console.log(
      "MongoDB URI starts with:",
      MONGODB_URI ? MONGODB_URI.substring(0, 20) + "..." : "undefined"
    );

    const client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
      tls: true,
    });

    await client.connect();
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
    const { email, fullName } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    // Use MongoDB if connected, otherwise use file storage
    if (emailsCollection) {
      // MongoDB is connected - use it
      const existing = await emailsCollection.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: "Email already registered" });
      }

      await emailsCollection.insertOne({
        email,
        fullName: fullName || "",
        createdAt: new Date(),
      });
    } else {
      // MongoDB not connected - use file storage
      console.log("Using file-based storage for email collection");
      const emails = loadEmails();

      if (emails.some((e) => e.email === email)) {
        return res.status(409).json({ error: "Email already registered" });
      }

      emails.push({ email, fullName: fullName || "", createdAt: new Date() });
      saveEmails(emails);
    }

    // Send welcome email only if enabled
    if (SEND_EMAILS) {
      await sendWelcomeEmail(email, fullName);
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
async function sendWelcomeEmail(email, fullName) {
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
          <p>Hi${fullName ? ` ${fullName}` : ""}!</p>
          <p>Thank you for joining the CLO beta waitlist! We're excited to have you on board.</p>
          <p><strong>What's CLO?</strong></p>
          <p>CLO is your voice-first AI confidant, designed to help you reflect on your romantic and professional relationships. Just talk—and CLO listens, learns, and gives you actionable insights.</p>
          <p>We'll notify you as soon as the beta is ready.</p>
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
    res.json({
      emails: emails.map((e) => ({ email: e.email, fullName: e.fullName })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read emails" });
  }
});
