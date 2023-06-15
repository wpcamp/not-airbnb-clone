//backend/routes/api/spots.js

const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { setTokenCookie, restoreUser } = require('../../utils/auth');

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Address must be longer than 5 characters.')
    .notEmpty()
    .withMessage('Address cannot be empty'),
    check('city')
    .notEmpty()
    .withMessage('City cannot be empty')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('City must be at least 3 characters.'),
    check('state')
    .notEmpty()
    .withMessage('State cannot be empty')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 30 })
    .withMessage('State must be between 2 and 30 characters.'),
    check('country')
    .notEmpty()
    .withMessage('Country cannot be empty')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Country must be more than 2 characters.'),
    check('lat')
    .notEmpty()
    .withMessage('Latitude cannot be empty')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90.'),
    check('lng')
    .notEmpty()
    .withMessage('Longitude cannot be empty')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180.'),
    check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long.'),
    check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description cannot be empty.'),
    check('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0.00.'),
    check('ownerId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Owner ID must be an integer'),
    handleValidationErrors
];

//get all spots from current user
router.get('/current', requireAuth, async(req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country',
            'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
        ]
    })
    const avgStarSpot = []
    for (const spot of allSpots) {
        const spotId = spot.id
        const reviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['stars']
        })

        let sum = 0;
        let reviewCount = 0;
        //loop through reviews and sum up star count, increment count
        reviews.forEach((review) => {
            sum += review.stars;
            reviewCount++;
        });
        //calculate average
        let avgStar = null
        if (reviewCount > 0) {
            avgStar = sum / reviewCount
        }
        const spotImages = await SpotImage.findAll({
            where: {
                spotId: spotId
            }
        })

        //THIS ASSUME ONE IMAGE/URL PER SPOT SUBJECT TO CHANGE 
        let previewImage = spotImages[0] !== undefined ? spotImages[0].url : 0
            // let previewImage = spotImages[0].url
            // if (previewImage === undefined) previewImage = null

        //spread in the results and append avgStar/previewImage cols 
        const spotWithAvgStar = {
            ...spot.toJSON(),
            avgStar: avgStar,
            previewImage: previewImage
        };
        //push the result above into the array (fixes not iterable error)
        avgStarSpot.push(spotWithAvgStar);
    }
    res.json(avgStarSpot)
})

//get all reviews from spot Id
router.get('/:spotId/reviews', async(req, res) => {
    const allReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if (!allReviews.length) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.json(allReviews)
})

//get spot by Id + other info + aggregate data (numReviews + avgStar)
router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country',
            'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
        ],
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }, {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }]
    })

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const totalIndvReview = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    });
    let reviewNum = 0
    totalIndvReview.forEach(ele => {
        reviewNum++
    })
    let sum = 0;
    let reviewCount = 0;
    //loop through reviews and sum up star count, increment count
    totalIndvReview.forEach((review) => {
        sum += review.stars;
        reviewCount++;
    });
    //calculate average
    let avgStar = null
    if (reviewCount > 0) {
        avgStar = sum / reviewCount
    }
    const spotIdResponse = {
        ...spot.toJSON(),
        numReviews: reviewNum,
        avgStar: avgStar
    }
    res.json(spotIdResponse)
})

//get all spots + aggregate data (avgStars + numReview)
router.get('', async(req, res) => {
    const allSpots = await Spot.findAll({
        attributes: [
            'id', 'ownerId', 'address', 'city', 'state', 'country',
            'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
        ]
    });
    const allSpotsWithAvgStar = [];
    // for each spot w/in allSpots where id matches store the SpotImage.url
    for (const spot of allSpots) {
        const spotImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['url']
        });
        // same process as above but for stars
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['stars']
        });
        let sum = 0;
        let reviewCount = 0;
        //loop through reviews and sum up star count, increment count
        reviews.forEach((review) => {
            sum += review.stars;
            reviewCount++;
        });
        //calculate average
        let avgStar = null
        if (reviewCount > 0) {
            avgStar = sum / reviewCount
        }
        //THIS ASSUME ONE IMAGE/URL PER SPOT SUBJECT TO CHANGE 
        let previewImage = spotImages[0] !== undefined ? spotImages[0].url : 0
            // let previewImage = spotImages[0].url
            // if (previewImage === undefined) previewImage = null

        //spread in the results and append avgStar/previewImage cols 
        const spotWithAvgStar = {
            ...spot.toJSON(),
            previewImage: previewImage,
            avgStar: avgStar
        };
        //push the result above into the array (fixes not iterable error)
        allSpotsWithAvgStar.push(spotWithAvgStar);
    }
    res.json(allSpotsWithAvgStar);
})

//create a review for a spot based on spotId
router.post('/:spotId/reviews', restoreUser, requireAuth, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    const createdReview = await Review.create({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review: req.body.review,
        stars: req.body.stars,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    const userReviews = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })
    if (userReviews) {
        return res.status(500).json({ message: 'User already has a review for this spot' })
    }
    return res.json({ createdReview })
})

//create an image for a spot
router.post('/:spotId/images', restoreUser, requireAuth, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: ['ownerId']
    })
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (spot.ownerId === req.user.id) {
        const newImage = await SpotImage.create({
            spotId: parseInt(req.params.spotId),
            url: req.body.url,
            preview: req.body.preview
        })
        return res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
    } else {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
})

// Create new spot
router.post(
    '',
    validateSpot, requireAuth,
    async(req, res) => {
        const { ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;
        const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt });
        const newSpot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt
        };
        await setTokenCookie(res, newSpot);
        return res.json({
            spot: newSpot
        });
    }
);

//edit a spot by id
router.put('/:spotId', requireAuth, validateSpot, async(req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    if (req.user.id === spot.ownerId) {

        if (req.body.ownerId) {
            spot.ownerId = req.body.ownerId
        }

        if (req.body.address) {
            spot.address = req.body.address
        }

        if (req.body.city) {
            spot.city = req.body.city
        }

        if (req.body.state) {
            spot.state = req.body.state
        }

        if (req.body.country) {
            spot.country = req.body.country
        }

        if (req.body.lat) {
            spot.lat = req.body.lat
        }

        if (req.body.lng) {
            spot.lng = req.body.lng
        }

        if (req.body.name) {
            spot.name = req.body.name
        }

        if (req.body.description) {
            spot.description = req.body.description
        }

        if (req.body.price) {
            spot.price = req.body.price
        }

        spot.updatedAt = new Date()

        await spot.save()
        res.json(spot)

    } else {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
})


//delete a spot by Id
router.delete('/:spotId', requireAuth, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId === req.user.id) {
        spot.destroy()
        res.json({
            message: 'Successfully deleted'
        })
    } else {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
})


module.exports = router;