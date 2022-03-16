const express = require("express");
const app = express()
const bodyParser = require('body-parser')
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

app.post('/email',
    body('email').isEmail().normalizeEmail(),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        res.status(200).render('thankyou')
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
