const nodemailer = require("nodemailer");
const otp = require("./Otpgenerator");
const { registetionController } = require("../Controllers/authController");

async function Sendemail(email ,type) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.send_otp_email,
      pass: process.env.send_otp_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.send_otp_email,
    to: email,
    subject: "verify your email",
   
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Exclusive</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Please use this OTP to complete your verification. The OTP is valid for the next 2 minutes.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">mr mango,<br />Exclusive</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p> connect with us  </p>
      <p>Dhaka</p>
      <p>bangladesh</p>
    </div>
  </div>
</div>`,
  });
}

module.exports = Sendemail;
