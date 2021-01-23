const express = require("express");
const bodyParser = require("body-parser");

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
  }

const ejs = require("ejs");

const app = express()

const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui sapien eget mi proin sed. Vitae ultricies leo integer malesuada nunc vel risus. At augue eget arcu dictum. Iaculis at erat pellentesque adipiscing commodo elit. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Pretium viverra suspendisse potenti nullam ac tortor.'


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

app.listen(port);
