const express = require('express')
const router = express.Router({ mergeParams : true})
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground') // * Gets the campground model for easy use
const Review = require('../models/review')
const reviews = require('../controllers/reviews')

const { reviewSchema } = require('../schemas') // *Joi Schema that determines what is the correct input for a model

const ExpressError = require('../utils/ExpressError') // * How express errors are handled
const catchAsync = require('../utils/catchAsync') // * Quick way of using a try-catch block on a method, this way we can just pass the function into this function

router.post('/', isLoggedIn , validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router