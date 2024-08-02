const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.medicineReminderEmail = (
  username,
  medicineName,
  date,
  time,
  medicationLogId
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Medicine Reminder</title>
      <style>
          body {
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              padding-bottom: 20px;
          }
  
          .header img {
              max-width: 150px;
          }
  
          .content {
              text-align: left;
              padding: 20px 0;
          }
  
          .content h1 {
              font-size: 24px;
              color: #333;
              margin-bottom: 20px;
          }
  
          .content p {
              font-size: 16px;
              color: #666;
              line-height: 1.6;
              margin-bottom: 20px;
          }
  
          .highlight {
              font-weight: bold;
              color: #000;
          }
  
          .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50; /* Green */
            color: white;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .cta-button:hover {
            background-color: #45a049; /* Darker Green on Hover */
          }
  
          .footer {
              text-align: center;
              font-size: 14px;
              color: #999;
              margin-top: 30px;
          }
  
          .footer a {
              color: #999;
              text-decoration: none;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="header">
          <h2>Health Savior</h2>
          </div>
          <div class="content">
              <h1>Medicine Reminder</h1>
              <p>Dear <span class="highlight">${username}</span>,</p>
              <p>This is a friendly reminder to take your medication as scheduled.</p>
              <p><strong>Medicine Name:</strong> <span class="highlight">${medicineName}</span></p>
              <p><strong>Date:</strong> <span class="highlight">${date}</span></p>
              <p><strong>Time:</strong> <span class="highlight">${time}</span></p>
              <p>Please take your medicine on time. If you have already taken it, please mark it as done using the button below.</p>
              <a style="color:white;" href="http://localhost:3000/medication/done?id=${jwt.sign(medicationLogId,process.env.JWT_SECRET)}" class="cta-button">Mark as Done</a>
          </div>
          <div class="footer">
              <p>If you have any questions or need assistance, please contact us at <a href="mailto:info@company.com">info@company.com</a>.</p>
          </div>
      </div>
  </body>
  
  </html>`;
};
