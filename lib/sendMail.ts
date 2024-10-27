import nodemailer from "nodemailer";
import { randomInt } from "crypto";

const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

// Function to send the OTP email
interface MailBody {
  email: string;
  subject: string;
  recipientName: string;
  confirmationCode: string;
}

export const SendEmail = async ({
  email,
  subject,
  recipientName,
  confirmationCode,
}: MailBody): Promise<boolean> => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instagram Confirmation Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
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
        margin-bottom: 20px;
      }
      .header img {
        max-width: 150px;
        height: auto;
      }
      .content {
        text-align: center;
        margin-bottom: 20px;
      }
      .code {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        padding: 10px 20px;
        border-radius: 4px;
        background-color: #f3f3f3;
        color: #333;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #888;
        margin-top: 20px;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo">
      </div>
      <div class="content">
        <h1>Confirmation Code</h1>
        <p>Hello ${recipientName},</p>
        <p>Thank you for registering with Instagram! To complete your registration, please enter the following confirmation code:</p>
        <div class="code">
          ${confirmationCode}
        </div>
        <p>This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>Instagram, Inc. | <a href="https://www.instagram.com/about/legal/privacy/">Privacy Policy</a> | <a href="https://www.instagram.com/about/legal/terms/">Terms of Use</a></p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `Instagram <${SENDER_EMAIL}>`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("Confirmation code sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending confirmation code:", error);
    return false;
  }
};

export const generateOTP = () => {
  if (process.env.NEXT_PUBLIC_OTP_OPTIONAL) {
    return 111111;
  }
  return randomInt(100000, 999999); // Generates a 6-digit OTP
};
