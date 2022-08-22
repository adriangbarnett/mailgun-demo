const path = require("path");
require('dotenv').config({ path: '.env' });
const express = require("express");
app = express();

// required so we can read the body and json content.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// mailgun middleware
const mailgunService = require("./mailgun.service.js")

// send as text
app.post("/text", async (req, res) => {
    const ret = await mailgunService.sendMailWithHtml(req.body);
    res.send(ret);
})

// text with html
app.post("/html", async (req, res) => {
    const ret = await mailgunService.sendMailPlainText(req.body);
    res.send(ret);
})

// error
app.get("*", (req, res) => {
    res.send("404");
})

// start
app.listen(3000, function() { 
    console.log("Listening...")
});