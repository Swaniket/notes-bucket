import nodemailer from "nodemailer";

const userName = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userName,
    pass: password,
  },
});

export const generateMailOptions = (recipientsEmail, subject, body) => {
  return {
    from: userName,
    to: recipientsEmail,
    subject,
    text: body,
  };
};

export const sendEmail = (emailOptions, callbackFn) => {
  transporter.sendMail(emailOptions, callbackFn);
};
