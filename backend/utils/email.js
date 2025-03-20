import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure SMTP transport (Use your email provider's SMTP settings)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password or SMTP password
  },
});

export const sendEmailWithPDF = async (to, subject, text, pdfURL) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: to, // Receiver email
      subject: subject,
      text: text,
      attachments: [
        {
          filename: "Career_Report.pdf", // Attachment name
          path: pdfURL, // Cloudinary PDF URL
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Email Error:", error);
  }
};
