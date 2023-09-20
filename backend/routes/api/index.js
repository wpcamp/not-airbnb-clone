// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const reviewsRouter = require('./reviews.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const spotImagesRouter = require('./spot-images.js')
const reviewImagesRouter = require('./review-images.js')
const bookingsRouter = require('./bookings.js')
const { requireAuth } = require('../../utils/auth.js')
const { restoreUser } = require("../../utils/auth.js");
const mapsRouter = require('./maps');



//routers
router.use(restoreUser);
router.use('/spot-images', spotImagesRouter)
router.use('/maps', mapsRouter);
router.use('/bookings', bookingsRouter)
router.use('/review-images', reviewImagesRouter)
router.use('/session', sessionRouter);
router.use('/reviews', reviewsRouter)
router.use('/users', usersRouter);
router.use('/spots', spotsRouter)


//test routes
router.get('/test', requireAuth, (req, res) => {
    res.json({ message: 'success' })
})
// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;