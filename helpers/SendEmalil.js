const nodemailer = require("nodemailer");
const otp = require("./Otpgenerator");

async function Sendemail(email) {
  const transporter = nodemailer.createTransport({
   service:"gmail", // true for port 465, false for other ports
    auth: {
      user: process.env.send_otp_email,
      pass: process.env.send_otp_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.send_otp_email, // sender address
    to: email, // list of receivers
    subject: "send otp", // Subject line // plain text body
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Your Brand Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`,
  });
}

module.exports = Sendemail;
