const express = require('express');
const sgMail = require('@sendgrid/mail');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 3325;

// Create a write stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use morgan middleware for request logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :date[web] - :remote-addr - :req[body]', { stream: accessLogStream }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :date[web] - :remote-addr - :req[body]')); // Log to console

app.use(express.json());

app.use(cors()); // Enable CORS for all routes

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Load the HTML template
const source = fs.readFileSync(path.join(__dirname, 'email-template.hbs'), 'utf8');
const template = handlebars.compile(source);

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const emailBodyData = {
    to,
    subject,
    text,
  };

  // Generate the HTML body using the Handlebars template
  const emailBody = template(emailBodyData);
  
  const emailOptions = {
    from: 'business.isaacrivera@proton.me',
    to,
    subject,
    html: emailBody,
  };

  try {
    const info = await sgMail.send(emailOptions);
    res.json({ success: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
