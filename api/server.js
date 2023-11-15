const express = require('express');
const nodemailer = require('nodemailer');
// const nodemailerSendgrid = require('nodemailer-sendgrid');
const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();
const app = express();
const port = 3325;

app.use(express.json());

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_APP_USER,
//       pass: process.env.EMAIL_APP_PASSWORD, 
//     },
//   });
  
  const mailOptions = {
    from: 'business.isaacrivera@proton.me',
    to,
    subject,
    text,
  };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res.status(500).json({ error: 'Failed to send email', details: error.message });
  //   }

  //   res.json({ success: 'Email sent successfully', info });
  // });
  try {
    // Send the email using SendGrid
    const info = await sgMail.send(mailOptions);

    res.json({ success: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
