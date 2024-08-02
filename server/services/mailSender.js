const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body, attachment = "") => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send mail
    let info;
    if (attachment == "") {
      info = await transporter.sendMail({
        from: `${process.env.MAIL_USER}`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      });
    } else {
      info = await transporter.sendMail({
        from: "Health Sevior",
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
        attachments:[
          {
            filename:attachment.filename,
            path:attachment.path
          }
        ]
      });
    }

    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
