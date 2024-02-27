const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a transporter using Microsoft 365 SMTP server settings
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "testaccount@geniehealthcare.com", // Your email address
    pass: "Letthiswork@2024", // Your password
  },
});

// API endpoint for sending referral email for referfriend form
app.post("/api/sendEmail", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    friendFirstName,
    friendLastName,
    friendEmail,
    friendPhone,
    profession,
    message,
    checkbox,
  } = req.body;

  // Validation logic
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !friendFirstName ||
    !friendLastName ||
    !friendEmail ||
    !friendPhone ||
    !profession ||
    !checkbox
  ) {
    return res.status(400).json({ error: "Please enter all required details" });
  }

  // Send email
  const mailOptions = {
    from: "testaccount@geniehealthcare.com",
    to: "testaccount@geniehealthcare.com",
    cc: "info@geniehealthcare.com",
    subject: "Received Referral from " + firstName + " " + lastName,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nFriend's Details:\nName: ${friendFirstName} ${friendLastName}\nEmail: ${friendEmail}\nPhone: ${friendPhone}\nProfession: ${profession}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

// API endpoint for sending referral email for referfacility form
app.post("/api/sendFacilityEmail", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    facilityName,
    facilityContactName,
    contactEmail,
    contactPhone,
    notes,
    workHere,
    checkbox,
  } = req.body;

  // Validation logic
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !facilityName ||
    !facilityContactName ||
    !contactEmail ||
    !contactPhone ||
    !workHere ||
    !checkbox
  ) {
    return res.status(400).json({ error: "Please enter all required details" });
  }

  // Send email
  const mailOptions = {
    from: "testaccount@geniehealthcare.com",
    to: "testaccount@geniehealthcare.com",
    cc: "info@geniehealthcare.com",
    subject: "Received Facility Referral from " + firstName + " " + lastName,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nFacility Details:\nFacility Name: ${facilityName}\nFacility Contact Name: ${facilityContactName}\nContact Email: ${contactEmail}\nContact Phone: ${contactPhone}\nNotes: ${notes}\nWork Here: ${workHere}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

// API endpoint to handle sending facility form email
app.post("/api/SendFacilityFormEmail", (req, res) => {
  // Extract form data from request body
  const {
    facilityName,
    facilityContact,
    facilityEmail,
    facilityPhone,
    notes,
    checkbox,
  } = req.body;

  // Validation logic
  if (
    !facilityName ||
    !facilityContact ||
    !facilityEmail ||
    !facilityPhone ||
    !checkbox
  ) {
    return res.status(400).json({ error: "Please enter all required details" });
  }

  // Send email
  const mailOptions = {
    from: "testaccount@geniehealthcare.com",
    to: "testaccount@geniehealthcare.com",
    cc: "info@geniehealthcare.com",
    subject: "New Facility Form Submission",
    text: `Facility Name: ${facilityName}\nFacility Contact: ${facilityContact}\nFacility Email: ${facilityEmail}\nFacility Phone: ${facilityPhone}\nNotes: ${notes}\nCheckbox: ${checkbox}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

// Define route handler for root URL
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js server!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
