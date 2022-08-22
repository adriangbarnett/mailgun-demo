/*
    Summary:    Send an email via mailgun with file attachments
    Author:     adriangbarnett@gmail.com
    Updated:    2022.08.22
    Requires:   npm i express dotenv mailgun-js
    URL:        https://app.mailgun.com/
*/

const MAILGUN_PRIVATE_API_KEY = process.env.MAILGUN_PRIVATE_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN

//
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
const fsPromises = require('fs').promises;


// Get files from json, load and return array of attaments
async function setAttachment(newMessage) {

    const attachment = [];
    if(newMessage.files) {
        for (f = 0; f != newMessage.files.length; f++) {
            const newFile = {
                filename: newMessage.files[f].filename,
                data: await fsPromises.readFile(newMessage.files[f].filepath)
            };
            attachment.push(newFile);
        }
    }
    return attachment;
}


// Send a mail with HMTL content
async function sendMailWithHtml(newMessage) {

    try { 

        const mailgun = new Mailgun(formData);
        const client = mailgun.client({username: 'api', key: MAILGUN_PRIVATE_API_KEY});
 
        // load files as attachments
        const attachment = await setAttachment(newMessage);

        // data to send
        const messageData = {
            from: newMessage.from,
            to: newMessage.to,
            cc: newMessage.cc,
            ccc: newMessage.bcc,
            subject: newMessage.subject,
            text: newMessage.text,
            html: newMessage.html,
            attachment
          };

        // send
        const result = await client.messages.create(MAILGUN_DOMAIN, messageData).then((res) => {
           return res;
         })
         .catch((err) => {
           return err
         });
         return result;
    
      } catch (e) {
          console.log("EX: " + e.stack);
          return e.stack;
      }
}

// send and email
async function sendMailPlainText(newMessage) {

    try { 

        const mailgun = new Mailgun(formData);
        const client = mailgun.client({username: 'api', key: MAILGUN_PRIVATE_API_KEY});
    
        // load files as attachments
        const attachment = await setAttachment(newMessage);

        // data to send
        const messageData = {
            from: newMessage.from,
            to: newMessage.to,
            cc: newMessage.cc,
            ccc: newMessage.bcc,
            subject: newMessage.subject,
            text: newMessage.text,
            attachment
        };
        
        // send
        const result = await client.messages.create(MAILGUN_DOMAIN, messageData).then((res) => {
           return res;
         })
         .catch((err) => {
           return err
         });
         return result;
    
    
      } catch (e) {
          console.log("EX: " + e.stack);
          return e.stack;
      }

}

module.exports = {
    sendMailPlainText,
    sendMailWithHtml
}




