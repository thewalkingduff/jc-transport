const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const { google } = require('googleapis');
const nodemailer = require('nodemailer')
require('dotenv').config();



const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(){


    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bduffy@sickpress.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'bduffy@sickpress.com',
            to: 'senorduff@gmail.com',
            subject: "Hello from gmail using API",
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>'
    
        }

        const result =  await transport.sendMail(mailOptions)
        return result
        
    } catch (error) {
        return error
    }
    sendMail().then(result=> console.log('Email sent...', result))
.catch((error) => console.log(error.message))
};




    // const accessToken = await oAuth2Client.getAccessToken()
    // const output = `
    // <p>You have a new contact request</p>
    // <h3>Contact Details</h3>
    // <ul>
    //     <li>Name: ${req.body.name}</li>
    //     <li>Company: ${req.body.company}</li>
    //     <li>Email: ${req.body.email}</li>
    //     <li>Phone: ${req.body.phone}</li>
    // </ul>
    // <p>${req.body.message}</p>
    // `;
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: 'bduffy@sickpress.com',
    //         clientId: CLIENT_ID,
    //         clientSecret: CLIENT_SECRET,
    //         refreshToken: REFRESH_TOKEN,
    //         accessToken: accessToken
    //     },
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //   });
    
    //   send mail with defined transport object
    //   let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   });
    
//       console.log("Message sent: %s", info.messageId);
//       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
//       // Preview only available when sending through an Ethereal account
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

// -------------------------------------------------------------------------------

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT
const ejs = require("ejs");
// const exphbs = require('express-handlebars');
// const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config()

const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

// View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

const app = express()

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui sapien eget mi proin sed. Vitae ultricies leo integer malesuada nunc vel risus. At augue eget arcu dictum. Iaculis at erat pellentesque adipiscing commodo elit. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Pretium viverra suspendisse potenti nullam ac tortor. Amet dictum sit amet justo donec enim. Tellus in metus vulputate eu. Vitae semper quis lectus nulla at volutpat diam. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Id velit ut tortor pretium viverra suspendisse potenti nullam. Sollicitudin tempor id eu nisl nunc mi ipsum. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Dictum at tempor commodo ullamcorper a lacus.'

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('home')  
})

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

app.post('/contact', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'bduffy@sickpress.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <your@email.com>', // sender address
        to: 'RECEIVEREMAILS', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
    });
  
  app.listen(3000, () => console.log('Server started...'));


app.listen(port, function(){
    console.log(`Server is listening on port: ${port} `)
})


    //     try {
    //         const accessToken = await oAuth2Client.getAccessToken()
    
    //         const transport = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 type: 'OAuth2',
    //                 user: 'bduffy@sickpress.com',
    //                 clientId: CLIENT_ID,
    //                 clientSecret: CLIENT_SECRET,
    //                 refreshToken: REFRESH_TOKEN,
    //                 accessToken: accessToken
    //             }
    //         })
    
    //         const mailOptions = {
    //             from: req.body.email,
    //             to: 'senorduff@gmail.com',
    //             text: req.body.message
    //         }
    
    //         const result =  await transport.sendMail(mailOptions)
    //         return result
            
    //     } catch (error) {
    //         return error
    //     }
    //     sendMail().then(result=> console.log('Email sent...', result))
    // .catch((error) => console.log(error.message))
    // };
    // res.send('success')
    // res.render('contact', {msg: 'Email has been sent'});




// --------------------------------------------------------------------------
// server.js:

const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const { google } = require('googleapis');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
require('dotenv').config();



const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req, res)=>{ 

async function sendMail(){


    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bduffy@sickpress.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'bduffy@sickpress.com',
            to: 'senorduff@gmail.com',
            subject: "Hello from gmail using API",
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>'
    
        }

        const result =  await transport.sendMail(mailOptions)
        return result
        
    } catch (error) {
        return error
    }
    sendMail().then(result=> console.log('Email sent...', result))
.catch((error) => console.log(error.message))
};
}
// res.render('contact', {msg: 'Email has been sent'});

//   oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})







// // Middleware
// app.use(express.static('public'))
// app.use(express.json())

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/public/contactform.html')
// })

// app.post('/', (req, res)=>{           
//     const accessToken = oAuth2Client.getAccessToken()
//     const transporter = nodemailer.createTransport({   
//         type: 'OAuth2',
//                 user: 'bduffy@sickpress.com',
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken
    
        
//     })

//     const mailOptions = {
//         from: req.body.email,
//         to: 'senorduff@gmail.com',
//         text: req.body.message

//     }

//     transporter.sendMail(mailOptions, (error, info)=>{
//         if(error){
//             console.log(error);
//             res.send('error')
//         } else{
//             console.log('Email sent'  + info.response)
//             res.send('success')
//         }
//     })

// })

// app.listen(PORT, ()=> {
//     console.log(`Server running on port ${PORT}`)
// })


// --------------------------------------------------------------------
// app.js

const contactForm = document.querySelector('.contact-form')

let fullName = document.getElementById('fullName')
let company = document.getElementById('company')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let message = document.getElementById('message')


contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        fullName: fullName.value,
        company: company.value,
        email: email.value,
        phone: phone.value,
        message: message.value  
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            fullName.value = '';
            company.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
        } else{
            alert('Something went wrong!')
        }
        
    }
    xhr.send(JSON.stringify(formData))
})


// --------------------------------------------------------------
// conor.js
const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/contactform.html')
})

// ----------------------------------------------------------------------------
// travis

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);

const app = express();

View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs')

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.render('home')  
})

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

app.post('/contact', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'bduffy@sickpress.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <senorduff@gmail.com>', // sender address
      to: 'RECEIVEREMAILS', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));


// --------------------------------------------------------------------
// main.js

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm)

function submitForm(e){
    e.preventDefault();

    console.log(123)
}

// -------------------------------------------------------------------
// .env

CLIENT_ID = '725020510946-sqomfu343ivji7mr3ickabp87bnbkpvk.apps.googleusercontent.com';
CLIENT_SECRET = 'civllzMAF6YhBVR5vN8xYlQr';
REDIRECT_URI = 'https://developers.google.com/oauthplayground';
REFRESH_TOKEN = '4/0AY0e-g6bqn_8jZwfTenxWkP6ngB8YVRzFGsB5GWftjB8AQumWXHu366ncCl_rg-Gu-GopA';