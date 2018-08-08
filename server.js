const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    fs.appendFile('server.log', `${log}\n`, (err) => {
        if(err) {
            console.log('unable to save log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })


app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        page_title: 'Home Page',
        welcome_message: 'Welcome dude',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page_title: 'About Page',
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})