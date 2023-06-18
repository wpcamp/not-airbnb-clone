const { setTokenCookie, restoreUser } = require('../utils/auth');
const { requireAuth } = require('../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const validateReview = [
    check('spotId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Must have valid spotId'),
    check('userId')
    .notEmpty()
    .withMessage('Must have valid userId')
    .exists({ checkFalsy: true }),
    check('review')
    .notEmpty()
    .withMessage('Review text is required')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 500 })
    .withMessage('Review must be less than 500 characters')
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

const validateEditReview = [
    check('review')
    .notEmpty()
    .withMessage('Review text is required')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 500 })
    .withMessage('Review must be less than 500 characters')
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
]

const validateReviewImage = [
    check('url')
    .exists({ checkFalsy: true })
    .withMessage("Must provide a valid URL")
    .isURL()
    .withMessage("Must be a valid URL"),
    handleValidationErrors
];

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
        }
        return true;
    })
    .custom((value, { req }) => {
        let startDate = req.body.startDate;
        let dateFormat = startDate.toString().split("-");
        if (dateFormat.length !== 3) {
            throw new Error("Please provide date in YYYY-MM-DD format");
        }
        return true;
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
        }
        return true;
    })
    .custom((value, { req }) => {
        let endDate = req.body.endDate;
        let dateFormat = endDate.toString().split("-");
        if (dateFormat.length !== 3) {
            throw new Error("Please provide date in YYYY-MM-DD format");
        }
        return true;
    }),
    handleValidationErrors
];




module.exports = {
    validateEditReview,
    validateReview,
    validateReviewImage,
    validateBookings
}