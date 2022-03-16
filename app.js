const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
  }



app.set('view engine', 'ejs')

// app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { body, validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  
  


app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        from: data.name,
        to: 'senorduff@gmail.com',
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).render('thankyou');
        }
      });
    });
  });
  

app.get('/', (req, res) =>{
    res.render('home')  
})

const aboutContent = "Based just north of Dallas, JC Transport's offers unmatched service at competitive rates to lanes all over the Texarkana region. We take pride in our ability to provide timely and reliable service, with our promise of satisfaction delivered with each shipment we move. Our dedicated staff works closely with all of our customers to maintain the highest levels of communication and support.  We invest greatly in all services provided, and no project is ever too big or small. Our primary goal is to always provide quality services to our customers."

app.get('/about', (req, res) =>{
    res.render('about', {
        aboutContent: aboutContent
    })
})

app.get('/contact', (req, res) =>{
    res.render('contact')
})

app.get('/driverapp', (req, res) =>{
    res.render('driverapp')
})

app.get('/why', (req, res) =>{
    res.render('why')
})
app.get('/thankyou', (req, res) =>{
    res.render('thankyou')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
