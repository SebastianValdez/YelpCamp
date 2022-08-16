const Campground = require('../models/campground') // * Gets the campground model for easy use
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id) // * Gets the id from the url in the method argument
    const review = new Review(req.body.review) // * The response has all the information for a review model, also remember that review[body] puts it under the object called review
    review.author = req.user._id
    campground.reviews.push(review) // * Add this to the campground object in mongoose, gets a reference to the new review
    await review.save()
    await campground.save()
    req.flash('success', 'Successfully made a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/campgrounds/${id}`)
}