const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { validateBookings } = require('../../utils/validators')
const router = express.Router();

// get all bookings of current user
router.get('/current', restoreUser, requireAuth, async(req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        include: [{
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country',
                'lat', 'lng', 'name', 'description', 'price'
            ]
        }]
    })
    const bookingWImg = [];
    for (const booking of bookings) {
        const spotImages = await SpotImage.findAll({
            where: {
                spotId: booking.Spot.id,
            },
        });
        // set previewimage = spotimages url, always in the 1st index  - else false
        const previewImage = spotImages[0] !== undefined ? spotImages[0].url : 0;
        //make date into string, split and take everything before the T to truncate the date -- not working REVIEW
        const startDatStringSplit = booking.startDate.toISOString().split('T')[0]
        const startDate = new Date(startDatStringSplit)
        const endDateStringSplit = booking.endDate.toISOString().split('T')[0]
        const endDate = new Date(endDateStringSplit)
            //spread in individual bookings with associated previewImage, start/endDate
        const bookingObj = {
            ...booking.toJSON(),
            previewImage: previewImage,
            startDate: startDate,
            endDate: endDate
        };
        //push the object into the arr to be sent
        bookingWImg.push(bookingObj);
    }
    res.json(bookingWImg);
})

//edit a booking
router.put('/:bookingId', requireAuth, validateBookings, async(req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: [{
            model: Spot,
            attributes: [
                ['id', 'spotId']
            ]
        }]
    })
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
    const previousBooking = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: {
                [Op.ne]: booking.id
            }
        }
    })
    const currDate = new Date()
    if (booking.endDate < currDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" })
    }
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
    if (booking.userId !== req.user.id) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
    if (req.body.startDate) {
        booking.startDate = req.body.startDate
    }
    if (req.body.endDate) {
        booking.endDate = req.body.endDate
    }
    await booking.save()
    res.json(booking)
})

//delete a booking
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: [{
            model: Spot,
            attributes: ['ownerId']
        }]
    })
    if (!booking) {
        res.status(404).json({ message: "Booking can't be found" })
        return
    }
    const currDate = new Date()
    if (booking.startDate < currDate) {
        res.status(403).json({ message: "Bookings that have been started can't be deleted" })
        return
    }
    if (booking.ownerId === req.user.id || booking.userId === req.user.id) {
        await booking.destroy()
        res.json({ message: "Successfully deleted" })
    } else {
        res.status(404).json({ message: "Booking can't be found" })
        return
    }
})


module.exports = router;