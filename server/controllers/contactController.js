const Contact = require("../models/contactModel");
const sendEmail = require("../utils/sendEmail");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message, type } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message required" });
    }

    // 1. Save to DB
    const newContact = await Contact.create({
      name,
      email,
      message,
      type,
    });

    // 2. Send email notification
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `🚨 BugTrace Support (${type})`,
      html: `
    <h2>New Support Request</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email || "Not provided"}</p>
    <p><b>Type:</b> ${type}</p>
    <hr/>
    <p>${message}</p>
  `,
    });

    if (email) {
      await sendEmail({
        to: email,
        subject: "BugTrace — Request Received",
        html: `
      <p>Hi ${name},</p>
      <p>We received your request and will get back to you soon.</p>

      <br/>

      <p><b>Your message:</b></p>
      <p>${message}</p>

      <br/>

      <p style="color: gray; font-size: 12px;">
        BugTrace — Track bugs with precision.
      </p>
    `,
      });
    }

    res.status(201).json({
      message: "Request submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
