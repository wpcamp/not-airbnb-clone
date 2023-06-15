//backend/routes/api/spots.js

const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { setTokenCookie, restoreUser } = require('../../utils/auth');

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotImage = [
    check('country')
    .notEmpty()
    .withMessage('Country cannot be empty')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Country must be more than 2 characters.'),
    handleValidationErrors
];





router.delete('/:imageId', restoreUser, requireAuth, async(req, res) => {
    const spotImg = await SpotImage.findByPk(req.params.imageId)
    if (!spotImg) {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }
    const spot = await Spot.findByPk(spotImg.spotId, {
        attributes: ['ownerId']
    })
    if (spot.ownerId === req.user.id) {
        spotImg.destroy()
        res.json({ message: 'Successfully deleted' })
    } else {
        return res.status(404).json({ message: "Spot Image couldn't be found" })
    }
})






module.exports = router