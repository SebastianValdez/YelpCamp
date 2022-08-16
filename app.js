if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate') // * The layout stuff, allows for similar code for all views
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError') // * How express errors are handled
const methodOverride = require('method-override') // * Use this to be able to do requests other than get and post on html forms
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const users = require('./routes/users')
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

mongoose.connect('mongodb://localhost:27017/yelp-camp') // ! Connects this to our database - yelpCamp

// ! Checks if the app connected to the server or not
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs') // ! Basically tells express that I am going to be using EJS as my templating language
// ! Telling express that our templates that I am creating (using EJS) will come from a directory (folder) called 'views
app.set('views', path.join(__dirname, 'views')) // ! Allows this code to be run outside of this directory (YelpCamp), dont worry about it

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => { // ! This gives us access to this in all templates
    console.log(req.session)
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', users)
app.use('/campgrounds', campgrounds) // ! Used by the router!
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'Oh no, something went wrong'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000')
})