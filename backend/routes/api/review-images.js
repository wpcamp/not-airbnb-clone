//backend/routes/api/review-images.js
const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// delete an image for a spot
router.delete('/:imageId', requireAuth, async(req, res) => {
    const reviewImg = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImg) {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }
    const review = await Review.findByPk(reviewImg.reviewId, {
        attributes: ['userId']
    })
    const spot = await Spot.findByPk(review.userId, {
        attributes: ['ownerId']
    })
    if (spot.ownerId === req.user.id) {
        reviewImg.destroy()
        res.json({ message: 'Successfully deleted' })
    } else {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }
})


module.exports = router;