const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail", // ya kisi bhi SMTP server ka use kar sakte ho
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD, 
  },
});

// Email sending route
app.post("/sendmail", async (req, res) => {
  const { emailList, subject, body } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: emailList, // yeh ek array hona chahiye, multiple emails ko handle karega
    subject: subject,
    html: body, // Body as HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});