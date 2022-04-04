const Queue = require("bull");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// 1. Initiating the Queue
try {
  const sendMailQueue = new Queue("sendMail", {
    redis: {
      host: "127.0.0.1",
      port: 6379,
    },
  });
  const data = {
    email: "nicola.rowe97@ethereal.email",
  };

  const options = {
    delay: 10000, // 1 min in ms
    attempts: 2,
  };
  // 2. Adding a Job to the Queue
  sendMailQueue.add(data, options);

  // 3. Consumer
  sendMailQueue.process(async (job) => await sendMail(job.data.email));
} catch (e) {
  console.log("-----------------------");
  console.log(e.getMessage());
}
function sendMail(email) {
  console.log("-----------------------");

  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "samia.saeed@invozone.com",
      to: email,
      subject: "Bull - npm",
      text: "This email is from bull job scheduler tutorial.",
    };
    const mailConfig = {
      service: process.env.HOST,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    };
    nodemailer
      .createTransport(mailConfig)
      .sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
  });
}
