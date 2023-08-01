//backend/routes/api/spots.js
const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//validations -- move to validators file -- beware differences in validators w same name but diff checks (rename to be more specific)
const validStates = [
    'AL', 'Alabama', 'AK', 'Alaska', 'AZ', 'Arizona', 'AR', 'Arkansas',
    'CA', 'California', 'CO', 'Colorado', 'CT', 'Connecticut', 'DE', 'Delaware',
    'FL', 'Florida', 'GA', 'Georgia', 'HI', 'Hawaii', 'ID', 'Idaho', 'IL', 'Illinois',
    'IN', 'Indiana', 'IA', 'Iowa', 'KS', 'Kansas', 'KY', 'Kentucky', 'LA', 'Louisiana',
    'ME', 'Maine', 'MD', 'Maryland', 'MA', 'Massachusetts', 'MI', 'Michigan', 'MN', 'Minnesota',
    'MS', 'Mississippi', 'MO', 'Missouri', 'MT', 'Montana', 'NE', 'Nebraska', 'NV', 'Nevada',
    'NH', 'New Hampshire', 'NJ', 'New Jersey', 'NM', 'New Mexico', 'NY', 'New York',
    'NC', 'North Carolina', 'ND', 'North Dakota', 'OH', 'Ohio', 'OK', 'Oklahoma',
    'OR', 'Oregon', 'PA', 'Pennsylvania', 'RI', 'Rhode Island', 'SC', 'South Carolina',
    'SD', 'South Dakota', 'TN', 'Tennessee', 'TX', 'Texas', 'UT', 'Utah', 'VT', 'Vermont',
    'VA', 'Virginia', 'WA', 'Washington', 'WV', 'West Virginia', 'WI', 'Wisconsin',
    'WY', 'Wyoming'
];

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required')
        .isLength({ min: 6 })
        .withMessage('Address must be longer than 5 characters.')
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .withMessage('City is required')
        .exists({ checkFalsy: true })
        .withMessage('City is required')
        .isLength({ min: 3 })
        .withMessage('City must be at least 3 characters.'),
    check('state')
        .notEmpty()
        .withMessage('State is required')
        .exists({ checkFalsy: true })
        .withMessage('State is required')
        .isLength({ min: 2, max: 20 })
        .withMessage('State must be 2 character abbreviation or first letter capitalized')
        .custom(function (state) {
            return validStates.includes(state)
        })
        .withMessage("State must be 2 character abbreviation or first letter capitalized"),
    check('country')
        .notEmpty()
        .withMessage('Country is required')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Country must be more than 2 characters.'),
    // check('lat')
    // .notEmpty()
    // .withMessage('Latitude is not valid')
    // .isFloat({ min: -90, max: 90 })
    // .withMessage('Latitude must be between -90 and 90.'),
    // check('lng')
    // .notEmpty()
    // .withMessage('Longitude is not valid')
    // .isFloat({ min: -180, max: 180 })
    // .withMessage('Longitude must be between -180 and 180.'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min: 30 })
        .isString()
        .withMessage('Description must be a string'),
    check('price')
        .notEmpty()
        .withMessage('Price per day is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be greater than $0.00.'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .notEmpty()
        .withMessage('Review text is required')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required')
        .isString()
        .withMessage('Review must be a string'),
    check('stars')
        .notEmpty()
        .withMessage('Must give star rating')
        .isInt({ min: 0, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5.")
        .exists({ checkFalsy: true })
        .withMessage("Must give a star rating"),
    handleValidationErrors
];

const validateSpotImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage("Must provide a valid URL")
        .isURL()
        .withMessage("Must provide a valid URL")
        .notEmpty()
        .withMessage("Must provide a valid URL"),
    check("preview")
        // .exists({ checkFalsy: true })
        // .withMessage("Must indicate whether or not preview exists")
        .notEmpty()
        .withMessage("Must indicate whether or not preview exists"),
    handleValidationErrors
]

const validateBookings = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Must provide a valid date')
        .notEmpty()
        .withMessage('Must provide a valid date')
        .custom((value, { req }) => {
            let currDate = new Date();
            let startDate = req.body.startDate;
            if (currDate > startDate) {
                throw new Error("Start date has already passed");
            } else {
                return true;
            }
        })
        .custom((value, { req }) => {
            let startDate = req.body.startDate;
            let dateFormat = startDate.toString().split("-");
            if (dateFormat.length !== 3) {
                throw new Error("Please provide date in YYYY-MM-DD format");
            } else {
                return true;
            }
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('Must provide a valid date')
        .notEmpty()
        .withMessage('Must provide a valid date')
        .custom((value, { req }) => {
            let endDate = req.body.endDate;
            let startDate = req.body.startDate;
            if (startDate > endDate) {
                throw new Error("End date cannot come before start date");
            } else {
                return true;
            }
        })
        .custom((value, { req }) => {
            let endDate = req.body.endDate;
            let dateFormat = endDate.toString().split("-");
            if (dateFormat.length !== 3) {
                throw new Error("Please provide date in YYYY-MM-DD format");
            } else {
                return true;
            }
        }),
    handleValidationErrors
];

//get all spots from current user
router.get('/current', requireAuth, async (req, res) => {
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
        let previewImage = 0
        if (spotImages[0] !== undefined) {
            previewImage = spotImages[0].url
        }
        //spread in the results and append avgStar/previewImage cols 
        const spotWithAvgStar = {
            ...spot.toJSON(),
            avgRating: avgStar,
            previewImage: previewImage
        };
        //push the result above into the array (fixes not iterable error?)
        avgStarSpot.push(spotWithAvgStar);
    }

    res.json(avgStarSpot)
})

//get all reviews from spot Id
router.get('/:spotId/reviews', async (req, res) => {
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
        // return res.status(404).json({ message: "Spot couldn't be found" });
        return
    }
    res.json(allReviews)
})

//get spot by Id + numReviews + avgStar
router.get('/:spotId', async (req, res) => {
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
    //calculate total number of reviews
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
    //spread in results and append numReviews/avgStar
    const spotIdResponse = {
        ...spot.toJSON(),
        numReviews: reviewNum,
        avgRating: avgStar
    }
    res.json(spotIdResponse)
})

//get all spots
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const pagination = {}
    page = parseInt(page)
    size = parseInt(size)
    minLat = parseFloat(minLat)
    maxLat = parseFloat(maxLat)
    minLng = parseFloat(minLng)
    maxLng = parseFloat(maxLng)
    if (isNaN(page)) page = 1
    if (page > 10) {
        return res.status(400).json({ message: 'Page must be less than 10' })
    }
    if (page < 1) {
        return res.status(400).json({ message: 'Page must be greater than or equal to 1' })
    }
    if (isNaN(size)) size = 20
    if (size > 20) {
        return res.status(400).json({ message: 'Size must be less than 20' })
    }
    if (size < 1) {
        return res.status(400).json({ message: 'Size must be greater than or equal to 1' })
    }
    if (isNaN(minLat)) minLat = -90
    if (minLat < -90 || minLat > 90) {
        return res.status(400).json({ message: 'Minimum latitude is invalid' })
    }
    if (isNaN(maxLat)) maxLat = 90
    if (maxLat < -90 || maxLat > 90) {
        return res.status(400).json({ message: 'Maximum latitude is invalid' })
    }
    if (isNaN(minLng)) minLng = -180
    if (minLng < -180 || minLng > 180) {
        return res.status(400).json({ message: 'Minimum longitude is invalid' })
    }
    if (isNaN(maxLng)) maxLng = 180
    if (maxLng < -180 || maxLng > 180) {
        return res.status(400).json({ message: 'Maximum longitude is invalid' })
    }
    if (isNaN(minPrice)) minPrice = 0
    if (minPrice < 0) {
        return res.status(400).json({ message: 'Minimum price must be greater than or equal to 0' })
    }
    if (isNaN(maxPrice)) maxPrice = 10000000000
    if (maxPrice < 0) {
        return res.status(400).json({ message: 'Maximum price must be greater than or equal to 0' })
    }
    pagination.limit = size
    pagination.offset = size * (page - 1)

    const allSpots = await Spot.findAll({
        attributes: [
            'id', 'ownerId', 'address', 'city', 'state', 'country',
            'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
        ],
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice]
            },
            // lat: {
            //     [Op.between]: [minLat, maxLat]
            // },
            // lng: {
            //     [Op.between]: [minLng, maxLng]
            // }
        },
        ...pagination
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
        //ask why this was throwing error as not ternary - declaration? 
        let previewImage = spotImages[0] !== undefined ? spotImages[0].url : 0
        //spread in the results and append avgStar/previewImage cols 
        const spotWithAvgStar = {
            ...spot.toJSON(),
            previewImage: previewImage,
            avgRating: avgStar,
            page,
            size
        };
        //push the result above into the array (fixes not iterable error?)
        allSpotsWithAvgStar.push(spotWithAvgStar);
    }
    const response = {
        Spots: allSpotsWithAvgStar
    }
    return res.json(response);
})

//create a review for a spot based on spotId
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    //check to see if user has already made a review for this spot
    const userReviews = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })
    //if there are any reviews throw error
    if (userReviews.length > 0) {
        return res.status(500).json({ message: 'User already has a review for this spot' })
    }
    //create new review
    const createdReview = await Review.create({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review: req.body.review,
        stars: req.body.stars,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    return res.status(201).json(createdReview)
})

//create an image for a spot
router.post('/:spotId/images', validateSpotImage, requireAuth, async (req, res) => {
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
    async (req, res) => {
        const { ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;
        const spot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            createdAt,
            updatedAt
        });
        return res.json(spot);
    }
);

//edit a spot by id
//idea: user shouldn't be able to leave review for a spot they own 
// router.put('/:spotId', requireAuth, async(req, res) => {
//     let spot = await Spot.findByPk(req.params.spotId)
//     if (!spot) {
//         return res.status(404).json({ message: "Spot couldn't be found" })
//     }
//     if (req.user.id === spot.ownerId) {
//         if (req.body.ownerId) {
//             spot.ownerId = req.body.ownerId
//         }
//         if (req.body.address) {
//             if (req.body.address.length > 6) {
//                 spot.address = req.body.address
//             } else {
//                 res.status(400).json({ message: 'Address must be longer than 5 characters.' })
//             }
//         }
//         if (req.body.city) {
//             if (req.body.city.length > 3) {
//                 spot.city = req.body.city
//             } else {
//                 res.status(400).json({ message: 'City must be at least 3 characters.' })
//             }
//         }
//         if (req.body.state) {
//             if (validStates.includes(req.body.state)) {
//                 spot.state = req.body.state
//             } else {
//                 res.status(400).json({ message: 'State must be 2 character abbreviation or first letter capitalized' })
//             }
//         }
//         if (req.body.country) {
//             if (req.body.country.length > 2) {
//                 spot.country = req.body.country
//             } else {
//                 res.status(400).json({ message: 'Country must be at least 2 characters.' })
//             }
//         }
//         if (req.body.lat) {
//             if (req.body.lat >= -90 && req.body.lat <= 90) {
//                 spot.lat = req.body.lat
//             } else {
//                 res.status(400).json({ message: 'Latitude must be between -90 and 90.' })
//             }
//         }
//         if (req.body.lng) {
//             if (req.body.lng >= -180 && req.body.lng <= 180) {
//                 spot.lng = req.body.lng
//             } else {
//                 res.status(400).json({ message: 'Longitude must be between -90 and 90.' })
//             }
//         }
//         if (req.body.name) {
//             if (req.body.name.length > 0 && req.body.name.length <= 50) {
//                 spot.name = req.body.name
//             } else {
//                 res.status(400).json({ message: 'Name must be between 1 and 50 characters' })
//             }
//         }
//         if (req.body.description) {
//             if (typeof req.body.description === 'string') {
//                 spot.description = req.body.description
//             } else {
//                 res.status(400).json({ message: 'Description must be a string' })
//             }
//         }
//         if (req.body.price) {
//             if (req.body.price > 0) {
//                 spot.price = req.body.price
//             } else {
//                 res.status(400).json({ message: 'Price per day must be greater than $0.00' })
//             }
//         }
//         spot.updatedAt = new Date()

//         await spot.save()
//         res.json(spot)
//     } else {
//         return res.status(404).json({ message: "Spot couldn't be found" })
//     }
// })

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const errors = check(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (req.user.id === spot.ownerId) {
        if (req.body.ownerId) {
            spot.ownerId = req.body.ownerId;
        }
        if (req.body.address) {
            if (req.body.address.length > 6) {
                spot.address = req.body.address;
            } else {
                res.status(400).json({ message: 'Address must be longer than 5 characters.' });
            }
        }
        if (req.body.city) {
            if (req.body.city.length > 3) {
                spot.city = req.body.city
            } else {
                res.status(400).json({ message: 'City must be at least 3 characters.' })
            }
        }
        if (req.body.state) {
            if (validStates.includes(req.body.state)) {
                spot.state = req.body.state
            } else {
                res.status(400).json({ message: 'State must be 2 character abbreviation or first letter capitalized' })
            }
        }
        if (req.body.country) {
            if (req.body.country.length > 2) {
                spot.country = req.body.country
            } else {
                res.status(400).json({ message: 'Country must be at least 2 characters.' })
            }
        }
        if (req.body.lat) {
            if (req.body.lat >= -90 && req.body.lat <= 90) {
                spot.lat = req.body.lat
            } else {
                res.status(400).json({ message: 'Latitude must be between -90 and 90.' })
            }
        }
        if (req.body.lng) {
            if (req.body.lng >= -180 && req.body.lng <= 180) {
                spot.lng = req.body.lng
            } else {
                res.status(400).json({ message: 'Longitude must be between -90 and 90.' })
            }
        }
        if (req.body.name) {
            if (req.body.name.length > 0 && req.body.name.length <= 50) {
                spot.name = req.body.name
            } else {
                res.status(400).json({ message: 'Name must be between 1 and 50 characters' })
            }
        }
        if (req.body.description) {
            if (typeof req.body.description === 'string') {
                spot.description = req.body.description
            } else {
                res.status(400).json({ message: 'Description must be a string' })
            }
        }
        if (req.body.price) {
            if (req.body.price > 0) {
                spot.price = req.body.price
            } else {
                res.status(400).json({ message: 'Price per day must be greater than $0.00' })
            }
        }

        spot.updatedAt = new Date();

        await spot.save();
        res.json(spot);
    } else {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
});



//Get all bookings for a spot
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const bookingNotOwner = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    })
    const bookingOwner = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }]
    })

    const resOwner = {
        Bookings: bookingOwner
    }

    const resNotOwner = {
        Bookings: bookingNotOwner
    }

    if (!bookingNotOwner.length) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    if (req.user.id === spot.ownerId) {
        return res.json(resOwner)
    }
    if (req.user.id !== spot.ownerId) {
        return res.json(resNotOwner)
    }
})

//Create a booking for a spot
router.post('/:spotId/bookings', requireAuth, validateBookings, async (req, res) => {
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
    const previousBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })
    const booking = await Booking.create({
        spotId: parseInt(req.params.spotId),
        userId: req.user.id,
        startDate,
        endDate,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    if (req.user.id === spot.ownerId) {
        return res.status(400).json({ message: "You cannot book a spot you own" })
    }
    //fixes problem franco pointed out -- check timing for EACH booking of prevBooking not just the whole thing
    for (const indBooking of previousBooking) {
        if ((booking.startDate >= indBooking.startDate && booking.startDate <= indBooking.endDate) ||
            (booking.endDate >= indBooking.startDate && booking.endDate <= indBooking.endDate) ||
            (booking.startDate <= indBooking.startDate && booking.endDate >= indBooking.endDate)) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }
    return res.json(booking)
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId === req.user.id) {
        await spot.destroy()
        res.json({
            message: 'Successfully deleted'
        })
    } else {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
})

module.exports = router;