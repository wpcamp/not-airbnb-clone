//backend/routes/api/reviews.js
const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { validateReview, validateEditReview, validateReviewImage } = require('../../utils/validators')

//Add an image to a Review
router.post('/:reviewId/images', requireAuth, validateReviewImage, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    const totalReview = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if (totalReview.length > 9) {
        return res.status(403).json({ message: 'Maximum number of images for this resource was reached' })
    }
    if (review.userId === req.user.id) {
        const newImage = await ReviewImage.create({
            reviewId: parseInt(review.id),
            url: req.body.url
        })
        return res.json({ id: newImage.id, url: newImage.url })
    } else {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
})

//Get all reviews of Current User
router.get('/current', restoreUser, requireAuth, async(req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [{
                    model: SpotImage,
                    attributes: ['url'],
                }]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    const reviewArr = [];
    const reviewImagesArr = [];
    reviews.forEach(review => {
        review.ReviewImages.forEach(img => {
            reviewImagesArr.push({
                id: img.id,
                url: img.url
            });
        });
        //change to ternary 
        let previewImage = null;
        if (review.Spot.SpotImages.length > 0) {
            previewImage = review.Spot.SpotImages[0].url;
        }
        //try to refactor old code to fix nesting (instead of manually creating)
        reviewArr.push({
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: {
                id: review.User.id,
                firstName: review.User.firstName,
                lastName: review.User.lastName
            },
            Spot: {
                id: review.Spot.id,
                ownerId: review.Spot.ownerId,
                address: review.Spot.address,
                city: review.Spot.city,
                state: review.Spot.state,
                country: review.Spot.country,
                lat: review.Spot.lat,
                lng: review.Spot.lng,
                name: review.Spot.name,
                price: review.Spot.price,
                previewImage: previewImage
            },
            ReviewImages: reviewImagesArr
        });
    });
    if (reviewArr.length) {
        return res.json({ Reviews: reviewArr });
    } else {
        return res.status(400).json({ message: "Reviews couldn't be found" });
    }
})

//Edit a Review
router.put('/:reviewId', requireAuth, validateEditReview, async(req, res) => {
    let review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    if (req.user.id === review.userId) {
        if (req.body.review) {
            review.review = req.body.review
        }
        if (req.body.stars) {
            review.stars = req.body.stars
        }
        review.updatedAt = new Date()

        await review.save()
        return res.json(review)
    } else {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
})

//Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
    let spot = await Spot.findByPk(review.spotId, {
        attributes: ['ownerId']
    })
    if (review.userId === req.user.id) {
        review.destroy()
        return res.json({ message: 'Successfully deleted' })
    } else {
        return res.status(404).json({ message: "Review couldn't be found" })
    }
})


module.exports = router;