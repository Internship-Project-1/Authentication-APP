const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth = google.auth.OAuth2;
const oAuth2Client = new oAuth(
  "611449063704-3pv6bqccko2jggb87k4v87ujpg82463s.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token: `1//04DWYvAQL-HdaCgYIARAAGAQSNgF-L9Ir9vBFKGScEdEzhkXeyUWJCodaOvxf3ptKKw7ctyKkA4Y058GDlOPKWS6LL1K1lq_KJg`,
});
const accessToken = oAuth2Client.getAccessToken();

console.log(process.env.CLIENT_ID, "TEST");

const config = {
  host: "smtp.gmail.com",
  port: 400,
  secure: true,
  service: "gmail",
  // requireTLS: true,

  auth: {
    user: "admin@workcycle.co",
    pass: "tfbpourwrfjsbnre",
  },
  tls: {
    rejectUnauthorized: false, // Local Host Only
  },
};

const transporter = nodemailer.createTransport(config);

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("error with email connection", error);
  } else {
    console.log("nodemailer running");
  }
});

let defaultMail = {
  from: "Me <farhan@uwindsor.ca>",
  to: "",
  subject: "Welcome! Verify Your Email to Activate Your Account",
};

module.exports = function ({ to, text, html }) {
  // use default setting
  const mail = { ...defaultMail, to, text, html };

  // send email
  transporter.sendMail(mail, function (error, info) {
    if (error) return console.log(error);
    console.log("mail sent:", info.response);
  });
};
