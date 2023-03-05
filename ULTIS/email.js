const nodemailer = require("nodemailer");
const { 
   verifyEmailTemplate, 
   forgotPasswordTemplate, 
   fA2AuthTemplate,
   adminMessageTemplate,
   updateEmailMessageTemplate,
   withDrawalRequestTemplate
  } = require('../email-views/index')

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.gmailUsername, 
      pass: process.env.gmailPassword
    }
  });

  // Remember to refactor the payload code

  const sendEmail = async (to, subject, payload) => {
  let template;
  const {username, pin} = payload 
  
  if(subject == 'Verify Email KuCoin'){
   template = verifyEmailTemplate({username, pin})
  }

  else if (subject == 'Reset Password'){
    template = forgotPasswordTemplate({username, pin})
  }

  else if(subject == "Enter 2FA Code") {
    template = fA2AuthTemplate({username, pin})
  }
  
  else if(subject == "Update Email Kucoin"){
    template = updateEmailMessageTemplate({username, pin})
  }
  
  else if(subject == "Token Resent"){
    template = fA2AuthTemplate({username, pin})
  }
  
  else if (subject == "Admin Message"){
    const {username, description} = payload
    template = adminMessageTemplate({username, description})
  }

  else if (subject == "Withdrawal Request") {
    const {username, amount } = payload
    template = withDrawalRequestTemplate({username, amount})
  }

  const info = {
    from: "support@kucoinoptions.live",
    to,
    subject,
    html:template
  }
  
  await transporter.sendMail(info)
}

module.exports = sendEmail
