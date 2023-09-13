
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const nodemailer = require('nodemailer');

const API_KEY = process.env.MAILGUN_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;


const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});


const sendEmail = (recipient,text,subject='test mail') => {
  new Promise((resolve, reject) => {
      const messageData = {
          from: 'Excited User <me@samples.mailgun.org>',
          to: recipient,
          subject: subject,
          text: text
        };
        client.messages.create(DOMAIN, messageData)
.then((res) => {
 console.log(res);
})
.catch((err) => {
 console.error(err);
});
  })
}


module.exports = {sendEmail}
